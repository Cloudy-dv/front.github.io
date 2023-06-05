import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Container,
  Typography,
} from '@mui/material';
import axios from 'axios';

const AddRentalForm = () => {
  const [userId, setUserId] = useState('');
  const [bookId, setBookId] = useState('');
  const [rentedTill, setRentedTill] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const rental = {
      user: userId,
      book: bookId,
      rented_till: rentedTill,
    };

    axios
      .post('http://127.0.0.1:8000/api/rental/', rental)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    setUserId('');
    setBookId('');
    setRentedTill('');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Add Rental
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
              label="Rented Till"
              type="date"
              value={rentedTill}
              onChange={(e) => setRentedTill(e.target.value)}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Add Rental
        </Button>
      </form>
    </Container>
  );
};

export default AddRentalForm;
