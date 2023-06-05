import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  IconButton,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const ListBooks = () => {
  const [books, setBooks] = useState([]);
  const [filterModel, setFilterModel] = useState({
    items: [
      {
        columnField: 'title',
        operatorValue: 'contains',
        value: '',
      },
      {
        columnField: 'author',
        operatorValue: 'contains',
        value: '',
      },
      {
        columnField: 'isbn',
        operatorValue: 'contains',
        value: '',
      },
      {
        columnField: 'rented',
        operatorValue: 'equals',
        value: '',
      },
      {
        columnField: 'library',
        operatorValue: 'equals',
        value: '',
      },
      {
        columnField: 'shelf',
        operatorValue: 'contains',
        value: '',
      },
      {
        columnField: 'row',
        operatorValue: 'equals',
        value: '',
      },
      {
        columnField: 'position',
        operatorValue: 'equals',
        value: '',
      },
    ],
    logicOperator: 'and',
  });
  const [columns, setColumns] = useState([
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'author', headerName: 'Author', width: 150 },
    { field: 'isbn', headerName: 'ISBN', width: 200 },
    { field: 'rented', headerName: 'Rented', width: 100 },
    { field: 'library', headerName: 'Library', width: 100 },
    { field: 'shelf', headerName: 'Shelf', width: 100 },
    { field: 'row', headerName: 'Row', width: 100 },
    { field: 'position', headerName: 'Position', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <React.Fragment>
          <IconButton
            color="primary"
            onClick={() => handleDeleteBook(params.row.id)}
          >
            <Delete />
          </IconButton>
          <IconButton color="primary">
            <Edit />
          </IconButton>
        </React.Fragment>
      ),
    },
  ]);

  const [gridWidth, setGridWidth] = useState('100%');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/book/');
        setBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, []);

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/book/${bookId}/`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleOperatorChange = (index, operatorValue) => {
    const updatedFilterModel = { ...filterModel };
    updatedFilterModel.items[index].operatorValue = operatorValue;
    setFilterModel(updatedFilterModel);
  };

  const handleValueChange = (index, value) => {
    const updatedFilterModel = { ...filterModel };
    updatedFilterModel.items[index].value = value;
    setFilterModel(updatedFilterModel);
  };

  const handleColumnToggle = (field) => {
    const updatedColumns = columns.map((col) => {
      if (col.field === field) {
        return { ...col, hide: !col.hide };
      }
      return col;
    });
    setColumns(updatedColumns);

    // Calculate the width of the visible columns
    const visibleColumns = updatedColumns.filter((col) => !col.hide);
    const totalWidth = visibleColumns.reduce((acc, col) => acc + col.width, 0);
    const remainingWidth = 100 - totalWidth;

    setGridWidth(remainingWidth > 0 ? `${remainingWidth}%` : '100%');
  };

  const rows = books.map((book) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    isbn: book.isbn,
    rented: book.rented ? 'Yes' : 'No',
    library: book.library,
    shelf: book.shelf,
    row: book.row,
    position: book.position,
  }));

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Books List
      </Typography>
      <Grid container spacing={2}>
        {filterModel.items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.columnField}>
            <FormControl fullWidth>
              <Typography variant="subtitle2">
                {item.columnField}
              </Typography>
              <Select
                value={item.operatorValue}
                onChange={(e) =>
                  handleOperatorChange(index, e.target.value)
                }
              >
                <MenuItem value="equals">Equals</MenuItem>
                <MenuItem value="contains">Contains</MenuItem>
                <MenuItem value="startsWith">Starts With</MenuItem>
              </Select>
              <TextField
                fullWidth
                value={item.value}
                onChange={(e) => handleValueChange(index, e.target.value)}
              />
            </FormControl>
          </Grid>
        ))}
      </Grid>
      <div style={{ height: 400, width: gridWidth }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableSelectionOnClick
          autoHeight
          components={{
            Toolbar: GridToolbar,
          }}
          filterModel={filterModel}
          onFilterModelChange={(model) => setFilterModel(model)}
          onColumnVisibilityChange={(params) =>
            handleColumnToggle(params.field)
          }
        />
      </div>
    </Container>
  );
};

export default ListBooks;
