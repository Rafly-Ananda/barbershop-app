import React, { FC, useState, useEffect } from "react";
import TopNav from "../TopNav";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Booking, Barbers } from "../../interfaces";
import axios from "axios";

const HistoryHome: FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.user);
  const [barbers, setBarbers] = useState<Barbers[] | null>(null);
  const [bookings, setBookings] = useState<Booking[] | null>(null);

  const handleListClick = (invoiceID: string): void => {
    navigate(`/history/${invoiceID}`);
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
      <TopNav title="History" navigateTo="/home" />
      {bookings && barbers && currentUser && (
        <>
          <Box>
            <List sx={{ padding: 0 }}>
              {bookings
                .filter((booking) =>
                  currentUser.booking_history.includes(
                    booking.invoice_id as any
                  )
                )
                .map((e, i) => (
                  <React.Fragment key={i}>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => handleListClick(e.invoice_id)}
                      >
                        <ListItemText
                          primary={
                            <Box
                              p={1}
                              display="flex"
                              justifyContent="space-between"
                            >
                              <Typography>
                                Invoice ID {e.invoice_id.toUpperCase()}
                              </Typography>
                              <Typography>Rp {e.price}</Typography>
                            </Box>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  </React.Fragment>
                ))}
            </List>
          </Box>
        </>
      )}
    </Box>
  );
};

{
}

export default HistoryHome;
