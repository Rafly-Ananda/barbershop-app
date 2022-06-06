import { FC, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TopNav from "../components/TopNav";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { Booking, Barbers } from "../interfaces";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import {
  resetCurrentBook,
  refreshBookingHistory,
} from "../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";

const Queue: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.user);
  const [barbers, setBarbers] = useState<Barbers[] | null>(null);
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [hover, setHover] = useState<boolean>(false);

  const finishBook = async (): Promise<void> => {
    dispatch(resetCurrentBook());
    try {
      const { data } = await axios.get(`/api/users/${currentUser?.id}`);

      dispatch(refreshBookingHistory(data.user.booking_history));
      navigate("/home");
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

  return (
    <Box>
      {bookings && barbers && currentUser && (
        <>
          <TopNav title="Queue" navigateTo="/home" />
          <Box boxShadow={1} mt={1} display="flex">
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              p={1}
              justifyContent="space-between"
            >
              <Box
                display="flex"
                alignItems="flex-start"
                justifyContent="space-between"
                flexDirection="row"
                ml={1}
                mt={0.5}
              >
                <Avatar
                  alt={
                    barbers.find(
                      (barber) =>
                        barber.id ===
                        bookings.find(
                          (book) =>
                            book.invoice_id === currentUser.current_booking
                        )?.barber_id
                    )?.name
                  }
                  src="#"
                  sx={{ width: 50, height: 50 }}
                />
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  justifyContent="center"
                  mt={0.5}
                  ml={2}
                >
                  <Typography variant="subtitle2">
                    {
                      barbers.find(
                        (barber) =>
                          barber.id ===
                          bookings.find(
                            (book) =>
                              book.invoice_id === currentUser.current_booking
                          )?.barber_id
                      )?.name
                    }
                  </Typography>
                  <Typography>
                    <Rating
                      value={
                        barbers.find(
                          (barber) =>
                            barber.id ===
                            bookings.find(
                              (book) =>
                                book.invoice_id === currentUser.current_booking
                            )?.barber_id
                        )?.rating ?? 0
                      }
                      readOnly
                      size="small"
                    />
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box
                  p={1}
                  mr={2}
                  boxShadow={1}
                  sx={{ backgroundColor: "#f4f2dc" }}
                >
                  <Typography
                    variant="subtitle1"
                    color="#474342"
                    fontWeight={500}
                  >
                    Rp.
                    {
                      bookings.find(
                        (book) =>
                          book.invoice_id === currentUser.current_booking
                      )?.price
                    }
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            gap={3}
            height="75vh"
          >
            <Box
              width="80%"
              height="50%"
              borderRadius={20}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              sx={{
                background: "linear-gradient(to bottom, #817c78, #21201e)",
              }}
            >
              <Typography
                color="#ece8c5"
                letterSpacing={1}
                variant="subtitle1"
                fontWeight={100}
              >
                You are on queue number
              </Typography>
              <Typography color="#ece8c5" variant="h2" fontWeight={500}>
                {bookings?.length}
              </Typography>
              <Typography
                color="#ece8c5"
                letterSpacing={1}
                variant="subtitle1"
                fontWeight={100}
              >
                Current queue: {bookings?.length - 1}
              </Typography>
            </Box>
            <Typography
              color="#76716e"
              letterSpacing={1}
              variant="subtitle1"
              fontWeight={100}
            >
              Est Time: {(bookings?.length - 1) * 60} minute(s)
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              gap={1}
            >
              <Button
                variant="contained"
                onMouseOver={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => finishBook()}
                sx={{ textTransform: "none", backgroundColor: "#75706c" }}
              >
                Finish Booking
              </Button>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                sx={{ visibility: hover ? "block" : "hidden" }}
              >
                <Typography variant="body2">
                  Button ini akan mensimulasikan
                </Typography>
                <Typography variant="body2">booking selesai</Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              position: "absolute",
              height: "12vh",
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: "#fff",
              zIndex: 99,
            }}
          ></Box>
        </>
      )}
    </Box>
  );
};

export default Queue;
