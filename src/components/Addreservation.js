// AddReservationForm.js
import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Container,
  Typography,
} from '@mui/material';
import axios from 'axios';

const AddReservationForm = () => {
  const [userId, setUserId] = useState('');
  const [bookId, setBookId] = useState('');
  const [reservationDate, setReservationDate] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const reservation = {
      user: userId,
      book: bookId,
      reservation_date: reservationDate,
    };

    axios
      .post('http://127.0.0.1:8000/api/reservation/', reservation)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    setUserId('');
    setBookId('');
    setReservationDate('');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Add Reservation
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Book ID"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Reservation Date"
              type="date"
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Add Reservation
        </Button>
      </form>
    </Container>
  );
};

export default AddReservationForm;