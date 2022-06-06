"use strict";
const fs = require("fs");
const express = require("express");
const app = express();
const pino = require("express-pino-logger")();
const cors = require("cors");
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const PORT = 3001;
const placeholderOTP = "319723";

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(pino);

app.post("/api/otp", (req, res) => {
  const user = JSON.parse(fs.readFileSync("server/users.json", "utf8")).find(
    (e) => e.phone_number === req.body.to
  );

  if (!user) {
    res.status(404).json({ status: false, message: "User not found" });
    return;
  }

  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: "+62" + req.body.to,
      body: `The OTP is ${placeholderOTP}`,
    })
    .then(() => {
      res.status(200).json({ success: true, message: "OTP Sent", user: user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, message: "Server Error" });
    });
});

app.post("/api/verifyOtp", (req, res) => {
  return req.body.otp === placeholderOTP
    ? res.status(200).json({ success: true, message: "OTP Verified" })
    : res.status(401).json({ success: false, message: "Wrong OTP" });
});

app.post("/api/register", (req, res) => {
  const users = JSON.parse(fs.readFileSync("server/users.json", "utf8"));
  const payload = {
    ...req.body,
    id: String(users.length),
    current_booking: "",
    booking_history: [],
    booking_cart: {},
  };
  users.push(payload);
  fs.writeFileSync("server/users.json", JSON.stringify(users));

  res.status(200).json({ success: true, message: "Register Success" });
});

app.post("/api/booking/users/:id", (req, res) => {
  const bookings = JSON.parse(
    fs.readFileSync("server/bookHistory.json", "utf8")
  );
  const users = JSON.parse(fs.readFileSync("server/users.json", "utf8"));
  const user = users.find((e) => String(e.id) === req.params.id);

  user.booking_history.push(req.body.bookingData.invoice_id);
  bookings.push(req.body.bookingData);

  fs.writeFileSync("server/bookHistory.json", JSON.stringify(bookings));
  fs.writeFileSync("server/users.json", JSON.stringify(users));

  res.status(200).json({ success: true, message: "Booking Added" });
});

app.put("/api/booking/:id", async (req, res) => {
  const allbookings = JSON.parse(
    fs.readFileSync("server/bookHistory.json", "utf8")
  );
  const newBookings = Object.values(allbookings).map((e) => {
    return e.invoice_id === req.body.invoice_id ? { ...req.body } : e;
  });

  fs.writeFileSync("server/bookHistory.json", JSON.stringify(newBookings));
  res.status(200).json({ success: true, message: "Booking Updated" });
});

app.put("/api/barbers/:id/rating", async (req, res) => {
  const allBarbers = JSON.parse(fs.readFileSync("server/barbers.json", "utf8"));

  const newBarbers = Object.values(allBarbers).map((e) => {
    return String(e.id) === req.params.id
      ? { ...e, rating: Number(req.body.rating) }
      : e;
  });

  fs.writeFileSync("server/barbers.json", JSON.stringify(newBarbers));
  res.status(200).json({ success: true, message: "Barbers Updated" });
});

app.get("/api/barbers", (req, res) => {
  const barberData = JSON.parse(fs.readFileSync("server/barbers.json"));
  res.status(200).json(barberData);
});

app.get("/api/barberService", (req, res) => {
  const serviceData = JSON.parse(fs.readFileSync("server/barberService.json"));
  res.status(200).json(serviceData);
});

app.get("/api/bookings", (req, res) => {
  const bookingsData = JSON.parse(fs.readFileSync("server/bookHistory.json"));
  res.status(200).json(bookingsData);
});

app.get("/api/users/:id", (req, res) => {
  const user = JSON.parse(fs.readFileSync("server/users.json", "utf8")).find(
    (e) => e.id == req.params.id
  );

  res.status(200).json({ success: true, user: user });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
