import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Container,
  Typography,
} from '@mui/material';
import axios from 'axios';

const AddBookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [pages, setPages] = useState(0);
  const [summary, setSummary] = useState('');
  const [publisher, setPublisher] = useState('');
  const [library, setLibrary] = useState('');
  const [shelf, setShelf] = useState('');
  const [row, setRow] = useState(0);
  const [position, setPosition] = useState(0);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const book = {
      title,
      author,
      isbn,
      publication_date: publicationDate,
      pages,
      summary,
      publisher,
      library,
      shelf,
      row,
      position,
    };

    axios
      .post('http://127.0.0.1:8000/api/book/', book)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    setTitle('');
    setAuthor('');
    setIsbn('');
    setPublicationDate('');
    setPages(0);
    setSummary('');
    setPublisher('');
    setLibrary('');
    setShelf('');
    setRow(0);
    setPosition(0);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Add Book
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="ISBN"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Publication Date"
              type="date"
              value={publicationDate}
              onChange={(e) => setPublicationDate(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Pages"
              type="number"
              value={pages}
              onChange={(e) => setPages(Number(e.target.value))}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Publisher"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Library"
              value={library}
              onChange={(e) => setLibrary(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Shelf"
              value={shelf}
              onChange={(e) => setShelf(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Row"
              type="number"
              value={row}
              onChange={(e) => setRow(Number(e.target.value))}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Position"
              type="number"
              value={position}
              onChange={(e) => setPosition(Number(e.target.value))}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" align='center'>
          Add Book
        </Button>
      </form>
    </Container>
  );
};

export default AddBookForm;