import { FC, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import Gopay from "../assets/gopay.png";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import ToggleButton, { ToggleButtonProps } from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  ToggleButtonGroupProps,
} from "@mui/material/ToggleButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TopNav from "../components/TopNav";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setBookingCart, createBooking } from "../redux/slice/userSlice";

interface barberServiceType {
  id: string;
  name: string;
  price: string;
  duration: string;
}

interface Barbers {
  id: string;
  name: string;
  rating: number;
}

const StyledToggleButton = styled(ToggleButton)<ToggleButtonProps>(
  ({ theme }) => ({
    textTransform: "none",
    width: "25vw",
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "white",
      backgroundColor: "#af998a",
    },
  })
);

const StyledToggleButtonGroup = styled(
  ToggleButtonGroup
)<ToggleButtonGroupProps>(({ theme }) => ({
  backgroundColor: "#fff",
  "& .MuiToggleButtonGroup-grouped": {
    height: "4vh",
    margin: theme.spacing(1),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const StyledToggleButtonGroupDate = styled(
  ToggleButtonGroup
)<ToggleButtonGroupProps>(({ theme }) => ({
  backgroundColor: "#fff",
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(1),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

// const PaymentButton = styled(Button)<ButtonProps>(({ theme }) => ({
//   display: "flex",
//   justifyContent: "space-between",
//   paddingRight: theme.spacing(2),
//   paddingLeft: theme.spacing(2),
//   textTransform: "none",
//   padding: theme.spacing(2),
//   fontWeight: 400,
//   borderRadius: theme.spacing(2),
//   border: "none",
//   borderTop: "1px solid #a1a1b2",
//   color: "#202023",
//   backgroundColor: "#fff",
//   boxShadow: "none",
//   "&:hover": {
//     backgroundColor: "#b9afac",
//     boxShadow: "none",
//     border: "none",
//   },
//   "&:active": {
//     boxShadow: "none",
//     backgroundColor: "#b9afac",
//     borderColor: "#b9afac",
//   },
// }));

const time = [
  "10:30 am",
  "11:00 am",
  "11:30 am",
  "12:00 pm",
  "12:30 pm",
  "13:00 pm",
  "13:30 pm",
  "14:00 pm",
  "14:30 pm",
  "15:00 pm",
  "15:30 pm",
  "16:00 pm",
  "16:30 pm",
  "17:00 pm",
  "17:30 pm",
];

const day = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

const Book: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.user);
  const [barberService, setBarberService] = useState<barberServiceType[]>([]);
  const [barberPerson, setbarberPerson] = useState<Barbers[]>([]);
  const [toggleTime, setToggleTime] = useState<string>("");
  const [toggleDate, setToggleDate] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedBarber, setSelectedBarber] = useState<string>("");

  const handleToggleTimeChange = (
    event: React.MouseEvent<HTMLElement>,
    toggleValue: string
  ) => {
    setToggleTime(toggleValue);
    dispatch(setBookingCart({ field: "time", value: toggleValue }));
  };

  const handleToggleDateChange = (
    event: React.MouseEvent<HTMLElement>,
    toggleValue: string
  ) => {
    setToggleDate(toggleValue);
    dispatch(setBookingCart({ field: "date", value: toggleValue }));
  };

  const handleServiceSelectChange = (e: SelectChangeEvent) => {
    const selectedPrice = barberService.find(
      (service) => service.id === e.target.value
    )?.price;
    setSelectedService(e.target.value as string);
    dispatch(setBookingCart({ field: "service_id", value: e.target.value }));
    dispatch(
      setBookingCart({
        field: "price",
        value: selectedPrice as string,
      })
    );
  };

  const handleBarbereSelectChange = (e: SelectChangeEvent) => {
    setSelectedBarber(e.target.value as string);
    dispatch(setBookingCart({ field: "barber_id", value: e.target.value }));
  };

  const handleBookNow = async (): Promise<void> => {
    const invoiceId = nanoid(10);
    currentUser &&
      (await axios.post(`/api/booking/users/${currentUser.id}`, {
        bookingData: {
          ...currentUser?.booking_cart,
          invoice_id: invoiceId,
          user_id: currentUser.id,
          feedback: "",
          rating: "",
        },
      }));
    dispatch(setBookingCart({ field: "invoice_id", value: invoiceId }));
    dispatch(createBooking());
    navigate("/home");
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    (async () => {
      try {
        const [services, barbers] = await Promise.allSettled([
          axios.get("/api/barberService"),
          axios.get("/api/barbers"),
        ]);

        if (isMounted) {
          if (
            services.status === "fulfilled" &&
            barbers.status === "fulfilled"
          ) {
            setBarberService(services.value.data);
            setbarberPerson(barbers.value.data);
          }
        }
      } catch (e) {
        if (e instanceof Error) console.log(e.message);
      }
    })();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      {currentUser && (
        <Box
          sx={{
            backgroundColor: "#f7f8fa",
            height: "100vh",
            overflow: "scroll",
            "&::-webkit-scrollbar": {
              height: "0.3em",
              width: "0",
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
          <TopNav title="Book Now" navigateTo="/home" />
          <Box p={2} mt={1}>
            <Typography variant="h5" letterSpacing={1} color="#474342">
              How can we help you?
            </Typography>
          </Box>
          <Box p={2}>
            <Typography variant="body2">Select Service</Typography>
            <FormControl fullWidth size="small">
              <Select
                value={
                  (currentUser?.booking_cart.service_id &&
                    currentUser?.booking_cart.service_id) ??
                  selectedService
                }
                onChange={handleServiceSelectChange}
                sx={{ backgroundColor: "#fff" }}
              >
                {barberService &&
                  barberService.map((e) => (
                    <MenuItem key={e.id} value={e.id}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        width="100%"
                      >
                        <Box>
                          <Typography variant="subtitle1">{e.name}</Typography>
                          <Typography variant="subtitle2" fontWeight={100}>
                            {e.duration}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                          <Box
                            p={1}
                            boxShadow={1}
                            sx={{ backgroundColor: "#f4f2dc" }}
                          >
                            <Typography
                              variant="subtitle1"
                              color="#474342"
                              fontWeight={500}
                            >
                              Rp.{e.price}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
          <Box p={2}>
            <Typography variant="body2">Select Barber</Typography>
            <FormControl fullWidth size="small">
              <Select
                value={currentUser?.booking_cart.barber_id ?? selectedBarber}
                onChange={handleBarbereSelectChange}
                sx={{ backgroundColor: "#fff" }}
              >
                {barberPerson &&
                  barberPerson.map((e) => (
                    <MenuItem key={e.id} value={e.id}>
                      <Box width="100%" display="flex" alignItems="center">
                        <Avatar
                          alt={e.name}
                          src="#"
                          sx={{ width: 50, height: 50 }}
                        />
                        <Box ml={2}>
                          <Typography
                            variant="body2"
                            letterSpacing={0.5}
                            mt={0.5}
                          >
                            {e.name}
                          </Typography>
                          <Rating value={e.rating} readOnly size="small" />
                        </Box>
                      </Box>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
          <Box p={2} borderRadius={2}>
            <Typography variant="body2">Date & Time</Typography>
            <Box borderRadius={1}>
              <Box
                mb={1}
                pt={1}
                sx={{ backgroundColor: "#fff", overflowX: "hidden" }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={500}
                  letterSpacing={1}
                  ml={2}
                >
                  June
                </Typography>

                <StyledToggleButtonGroupDate
                  value={currentUser?.booking_cart.date ?? toggleDate}
                  exclusive
                  onChange={handleToggleDateChange}
                >
                  {day.map((e, i) => (
                    <StyledToggleButton
                      sx={{
                        width: "11vw",
                        "@media (min-width: 1000px)": {
                          width: "3.25vw",
                        },
                        "@media (min-width: 1600px)": {
                          width: "3.55vw",
                        },
                      }}
                      key={e}
                      value={`${e}${i + 1}`}
                    >
                      <Box>
                        <Typography>{e}</Typography>
                        <Typography>{i + 1}</Typography>
                      </Box>
                    </StyledToggleButton>
                  ))}
                </StyledToggleButtonGroupDate>
              </Box>

              <Box
                pb={2}
                sx={{
                  overflowX: "scroll",
                  "&::-webkit-scrollbar": {
                    width: "0",
                    height: "1vh",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "#7f7a76",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#575451",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    background: "#555",
                  },
                }}
              >
                <StyledToggleButtonGroup
                  value={currentUser?.booking_cart.time ?? toggleTime}
                  exclusive
                  onChange={handleToggleTimeChange}
                >
                  {time.map((e) => (
                    <StyledToggleButton
                      key={e}
                      value={e}
                      sx={{
                        "@media (min-width: 1000px)": {
                          maxWidth: "5vw",
                        },
                        "@media (min-width: 1100px)": {
                          maxWidth: "8vw",
                        },
                      }}
                    >
                      {e}
                    </StyledToggleButton>
                  ))}
                </StyledToggleButtonGroup>
              </Box>
            </Box>
          </Box>
          <Box ml={2} mr={2}>
            <Typography variant="body2">Payment</Typography>
            <Box mt={0.5} mb="15vh">
              {currentUser.booking_cart.payment ? (
                <Button
                  variant="contained"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: 2,
                    textTransform: "none",
                    letterSpacing: 1,
                    fontWeight: 400,
                    color: "#202023",
                    backgroundColor: "#fff",
                    "&:hover": {
                      backgroundColor: "#b9afac",
                      boxShadow: "none",
                    },
                    "&:active": {
                      backgroundColor: "#b9afac",
                      borderColor: "#b9afac",
                    },
                  }}
                  endIcon={<ArrowDropDownIcon />}
                  onClick={() => navigate("/payment")}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    {currentUser.booking_cart.payment === "gopay" && (
                      <Avatar src={Gopay} />
                    )}

                    <Typography variant="body1" fontWeight="400">
                      {currentUser.booking_cart.payment}
                    </Typography>
                  </Box>
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: 2,
                    textTransform: "none",
                    letterSpacing: 1,
                    fontWeight: 400,
                    color: "#202023",
                    backgroundColor: "#fff",
                    "&:hover": {
                      backgroundColor: "#b9afac",
                      boxShadow: "none",
                    },
                    "&:active": {
                      backgroundColor: "#b9afac",
                      borderColor: "#b9afac",
                    },
                  }}
                  endIcon={<ArrowDropDownIcon />}
                  onClick={() => navigate("/payment")}
                >
                  Choose Payment Method
                </Button>
              )}
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              position: "absolute",
              height: "12vh",
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: "#474342",
              zIndex: 99,
            }}
          >
            <Box ml={3}>
              {currentUser &&
              Object.entries(currentUser.booking_cart).length > 0 &&
              currentUser.booking_cart.price ? (
                <Typography color="#fff" variant="h5" fontWeight={100}>
                  Rp {currentUser.booking_cart.price}
                </Typography>
              ) : (
                <Typography color="#fff" variant="h5" fontWeight={100}>
                  Rp -
                </Typography>
              )}
            </Box>

            <Button
              variant="contained"
              sx={{
                width: "35vw",
                "@media (min-width: 1000px)": {
                  width: "10vw",
                },
                textTransform: "none",
                color: "#202023",
                backgroundColor: "#fff",
                borderRadius: 4,
                marginRight: 3,
                padding: 1,
              }}
              onClick={handleBookNow}
              disabled={
                Object.entries(currentUser.booking_cart).length < 6
                  ? true
                  : false
              }
            >
              Book Now
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Book;
