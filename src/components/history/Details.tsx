import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TopNav from "../TopNav";
import { Booking, Barbers } from "../../interfaces";
import { useAppSelector } from "../../redux/hooks";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import axios from "axios";

const Details: FC = () => {
  const { id } = useParams();
  const { currentUser } = useAppSelector((state) => state.user);
  const [barbers, setBarbers] = useState<Barbers[] | null>(null);
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [bookingRating, setBookingRating] = useState<number | null>(0);
  const [bookingFeedback, setBookingFeedback] = useState<string | null>("");

  const setRating = async (e: any): Promise<void> => {
    setBookingRating(+e.target.value);
    try {
      const booking = bookings?.find((book) => book.invoice_id === id);
      const payload = { ...booking, rating: String(e.target.value) };
      await axios.put(`/api/booking/${id}`, payload);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };

  const setFeedback = async (): Promise<void> => {
    try {
      const booking = bookings?.find((book) => book.invoice_id === id);
      const payload = { ...booking, feedback: bookingFeedback };
      await axios.put(`/api/booking/${id}`, payload);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    (async (): Promise<void> => {
      try {
        const { data: barbersData } = await axios.get("/api/barbers");
        const { data: bookingData } = await axios.get("/api/bookings");
        if (isMounted) {
          setBarbers(barbersData);
          setBookings(bookingData);
          setBookingRating(
            Number(
              bookingData.find((book: Booking) => book.invoice_id === id).rating
            )
          );
          setBookingFeedback(
            bookingData.find((book: Booking) => book.invoice_id === id).feedback
          );
        }
      } catch (e) {
        if (e instanceof Error) console.log(e);
      }
    })();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  let rating: Barbers | undefined = undefined;

  return (
    <Box>
      <TopNav title={`Invoice ID ${id?.toUpperCase()}`} navigateTo="/history" />
      {bookings && barbers && currentUser && (
        <Box display="flex" flexDirection="column" gap={2}>
          <Box
            height="10vh"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={3}
            boxShadow={1}
          >
            <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
              <Avatar
                alt={
                  barbers.find(
                    (barber) =>
                      barber.id ===
                      bookings.find((booking) => booking.invoice_id === id)
                        ?.barber_id
                  )?.name
                }
                src="#"
                sx={{ width: 55, height: 55 }}
              />
              <Box ml={2} mt={1}>
                <Typography variant="body2">
                  {
                    barbers.find(
                      (barber) =>
                        barber.id ===
                        bookings.find((booking) => booking.invoice_id === id)
                          ?.barber_id
                    )?.name
                  }
                </Typography>
                <Rating
                  value={
                    barbers.find(
                      (barber) =>
                        barber.id ===
                        bookings.find((booking) => booking.invoice_id === id)
                          ?.barber_id
                    )?.rating
                  }
                  readOnly
                  size="small"
                />
              </Box>
            </Box>
          </Box>
          <Box
            mt={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h4" fontWeight={800}>
              RP
              {bookings.find((booking) => booking.invoice_id === id)?.price}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Rating
              sx={{
                fontSize: "10vw",
                "@media (min-width: 1000px)": {
                  fontSize: "3vw",
                },
              }}
              value={bookingRating}
              onChange={setRating}
            />
          </Box>
          <Box
            mt={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box width="80%">
              <TextField
                multiline
                rows={5}
                variant="outlined"
                fullWidth
                value={bookingFeedback}
                onBlur={setFeedback}
                onChange={(e) => setBookingFeedback(e.target.value)}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Details;
