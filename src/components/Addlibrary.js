import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Container,
  Typography,
} from '@mui/material';
import axios from 'axios';

const AddLibraryForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [openingHour, setOpeningHour] = useState(0);
  const [closingHour, setClosingHour] = useState(0);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const library = {
      name,
      address,
      city,
      opening_hour: openingHour,
      closing_hour: closingHour,
    };

    axios
      .post('http://127.0.0.1:8000/api/library/', library)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    setName('');
    setAddress('');
    setCity('');
    setOpeningHour(0);
    setClosingHour(0);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Add Library
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Opening Hour"
              type="number"
              value={openingHour}
              onChange={(e) => setOpeningHour(Number(e.target.value))}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Closing Hour"
              type="number"
              value={closingHour}
              onChange={(e) => setClosingHour(Number(e.target.value))}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Add Library
        </Button>
      </form>
    </Container>
  );
};

export default AddLibraryForm;