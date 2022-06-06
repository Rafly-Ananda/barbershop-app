import React, { FC, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import mainImg from "../assets/hero.jpg";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Link from "@mui/material/Link";
import axios from "axios";
import Slide from "@mui/material/Slide";
import { useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { Booking, Barbers } from "../interfaces";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TransitionProps } from "@mui/material/transitions";

const Image = styled("img")(() => ({
  display: "block",
  height: "100%",
  maxWidth: "100%",
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Home: FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.user);
  const [barbers, setBarbers] = useState<Barbers[] | null>(null);
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [barberClicked, setBarberClicked] = useState<boolean>(false);
  const [selectedBarber, setSelectedBarber] = useState<Barbers>();

  const handleBook = (): void => {
    navigate("/book");
  };

  const handleQueue = (): void => {
    navigate("/queue");
  };

  const handleBarberRating = async (barberId: string): Promise<void> => {
    barbers &&
      setSelectedBarber(barbers.find((barber) => barber.id === barberId));
    setBarberClicked(true);
  };

  const closeModal = (): void => {
    setBarberClicked(false);
  };

  const setRating = async (e: any): Promise<void> => {
    setSelectedBarber((prev) => ({ ...prev!, rating: e.target.value }));
    if (barbers) {
      const newBarbers = barbers.map((barber) =>
        barber.id === selectedBarber?.id
          ? { ...selectedBarber, rating: Number(e.target.value) }
          : barber
      );
      setBarbers(newBarbers);
    }

    try {
      selectedBarber &&
        (await axios.put(`/api/barbers/${selectedBarber.id}/rating`, {
          rating: e.target.value,
        }));
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
      {barbers && bookings && currentUser && (
        <>
          <Box>
            <Image
              src={mainImg}
              srcSet={mainImg}
              alt="main-img"
              loading="lazy"
            />
          </Box>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="contained"
              size="medium"
              sx={{
                width: "50%",
                padding: 1,
                marginTop: 1,
                borderRadius: 5,
                textTransform: "none",
                lineHeight: 2,
                fontSize: 15,
                fontWeight: "light",
                color: "#fff",
                backgroundColor: "#76716d",
                "&:hover": {
                  backgroundColor: "#b9afac",
                  borderColor: "transparent",
                  boxShadow: "none",
                },
                "&:active": {
                  boxShadow: "none",
                  backgroundColor: "#b9afac",
                  borderColor: "#b9afac",
                },
              }}
              onClick={handleBook}
              disabled={currentUser?.current_booking ? true : false}
            >
              Book Now
            </Button>
          </Box>
          <Box mr={3} ml={3} mt={3}>
            <Typography variant="subtitle2" letterSpacing={0.5}>
              Current Booking(s)
            </Typography>
            {currentUser?.current_booking ? (
              <Box
                boxShadow={2}
                mt={1}
                display="flex"
                borderRadius={2}
                height="8vh"
              >
                {bookings && barbers && (
                  <>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexDirection="column"
                      flex={1}
                      p={2}
                      sx={{ backgroundColor: "#f8f6f7" }}
                    >
                      <Typography color="#474342" variant="h6">
                        {
                          bookings.find(
                            (book) =>
                              book.invoice_id === currentUser.current_booking
                          )?.barber_id
                        }
                      </Typography>
                      <Typography color="#474342" variant="h6">
                        {bookings
                          .find(
                            (book) =>
                              book.invoice_id === currentUser.current_booking
                          )
                          ?.date.slice(0, 3)}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" flex={7} p={1}>
                      <Box
                        width="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        ml={1}
                        mt={0.5}
                      >
                        <Box>
                          <Typography variant="subtitle2">
                            {
                              barbers.find(
                                (barber) =>
                                  barber.id ===
                                  bookings.find(
                                    (book) =>
                                      book.invoice_id ===
                                      currentUser.current_booking
                                  )?.barber_id
                              )?.name
                            }
                          </Typography>
                          <Rating
                            value={
                              barbers.find(
                                (barber) =>
                                  barber.id ===
                                  bookings.find(
                                    (book) =>
                                      book.invoice_id ===
                                      currentUser.current_booking
                                  )?.barber_id
                              )?.rating
                            }
                            readOnly
                            size="small"
                          />
                        </Box>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            borderRadius: 5,
                            textTransform: "none",
                            fontSize: 14,
                            fontWeight: "light",
                            color: "#76716d",
                            border: "1px solid #76716d",
                            backgroundColor: "#fff",
                            "&:hover": {
                              backgroundColor: "#b9afac",
                              borderColor: "transparent",
                              boxShadow: "none",
                            },
                            "&:active": {
                              boxShadow: "none",
                              backgroundColor: "#b9afac",
                              borderColor: "#b9afac",
                            },
                          }}
                          onClick={handleQueue}
                        >
                          Cek Antrian
                        </Button>
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
            ) : (
              <Box
                boxShadow={2}
                mt={1}
                height="8vh"
                display="flex"
                justifyContent="center"
                alignItems="center"
                borderRadius={2}
              >
                <Typography variant="body2">
                  You don't have any booking(s)
                </Typography>
              </Box>
            )}
          </Box>
          <Box mt={2} ml={3}>
            <Typography variant="subtitle2" letterSpacing={0.5}>
              Today's Proffesionals
            </Typography>
            <Box
              mt={1}
              mr={1}
              sx={{
                overflowX: "scroll",
                "&::-webkit-scrollbar": {
                  height: "0.3em",
                },
                "&::-webkit-scrollbar-track": {
                  background: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#c1c1c1",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#a8a8a8",
                },
              }}
            >
              <Stack direction="row" spacing={2} mb={2}>
                {barbers &&
                  barbers.map((e) => (
                    <Box key={e.id}>
                      <Button
                        onClick={() => handleBarberRating(e.id)}
                        sx={{
                          textTransform: "none",
                          color: "#202023",

                          "&:hover": {
                            backgroundColor: "none",
                            boxShadow: "none",
                            border: "none",
                          },
                          "&:active": {
                            boxShadow: "none",
                            backgroundColor: "none",
                            borderColor: "none",
                          },
                        }}
                      >
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                        >
                          <Avatar
                            alt={e.name}
                            src="#"
                            sx={{ width: 70, height: 70 }}
                          />
                          <Typography
                            variant="body2"
                            letterSpacing={0.5}
                            mt={0.5}
                          >
                            {e.name}
                          </Typography>
                          <Rating value={e.rating} readOnly size="small" />
                        </Box>
                      </Button>
                    </Box>
                  ))}
              </Stack>
            </Box>
          </Box>
          <Box mt={2} ml={3} mb={10} mr={1}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle2" letterSpacing={0.5}>
                Latest News
              </Typography>

              <Link
                component="button"
                variant="subtitle2"
                underline="none"
                sx={{
                  color: "#32302e",
                  marginRight: 1.5,
                }}
              >
                See All (5)
              </Link>
            </Box>

            <Box
              mt={1}
              sx={{
                overflowX: "scroll",
                "&::-webkit-scrollbar": {
                  height: "0.3em",
                },
                "&::-webkit-scrollbar-track": {
                  background: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#c1c1c1",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#a8a8a8",
                },
              }}
            >
              <Stack direction="row" spacing={2} mb={2}>
                {[1, 2, 3, 4, 5].map((e, i) => (
                  <Image
                    key={i}
                    src="https://picsum.photos/200"
                    srcSet="https://picsum.photos/200"
                    alt="main-img"
                    loading="lazy"
                  />
                ))}
              </Stack>
            </Box>
          </Box>
        </>
      )}
      {selectedBarber && (
        <Dialog
          open={barberClicked}
          TransitionComponent={Transition}
          keepMounted
          onClose={closeModal}
          PaperProps={{
            sx: {
              "@media (min-width: 1000px)": {
                width: "20%",
              },
            },
          }}
        >
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={1} p={2}>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={1}
                p={2}
              >
                <Avatar
                  alt={selectedBarber.name}
                  src="#"
                  sx={{ width: 55, height: 55 }}
                />
                <Box ml={2} mt={1}>
                  <Typography variant="body2">{selectedBarber.name}</Typography>
                  <Rating
                    value={Number(selectedBarber.rating)}
                    readOnly
                    size="small"
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap={1}
              >
                <Rating
                  value={Number(selectedBarber.rating)}
                  onChange={setRating}
                  sx={{
                    fontSize: "12vw",
                    "@media (min-width: 1000px)": {
                      fontSize: "3vw",
                    },
                  }}
                />
                <Typography variant="body2">
                  How was your hairstylist?
                </Typography>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default Home;

// {
//    <Slide
// direction="right"
// in={barberClicked}
// container={containerRef.current}
// >

// </Slide>
// }
