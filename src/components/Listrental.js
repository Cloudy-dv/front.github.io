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

const ListRental = () => {
  const [rentals, setRentals] = useState([]);
  const [filterModel, setFilterModel] = useState({
    items: [
      {
        columnField: 'user',
        operatorValue: 'contains',
        value: '',
      },
      {
        columnField: 'book',
        operatorValue: 'contains',
        value: '',
      },
      {
        columnField: 'rented_till',
        operatorValue: 'equals',
        value: '',
      },
      {
        columnField: 'rental_active',
        operatorValue: 'equals',
        value: '',
      },
    ],
    logicOperator: 'and',
  });
  const [columns, setColumns] = useState([
    { field: 'user', headerName: 'User', width: 150 },
    { field: 'book', headerName: 'Book', width: 150 },
    { field: 'rented_till', headerName: 'Rented Till', width: 200 },
    { field: 'rental_active', headerName: 'Rental Active', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <React.Fragment>
          <IconButton
            color="primary"
            onClick={() => handleDeleteRental(params.row.id)}
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
    const fetchRentals = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/rental/');
        setRentals(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRentals();
  }, []);

  const handleDeleteRental = async (rentalId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/rental/${rentalId}/`);
      setRentals((prevRentals) => prevRentals.filter((rental) => rental.id !== rentalId));
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

  const rows = rentals.map((rentalItem) => ({
    id: rentalItem.id,
    user: rentalItem.user,
    book: rentalItem.book,
    rented_till: rentalItem.rented_till,
    rental_active: rentalItem.rental_active,
  }));

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Rental List
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

export default ListRental;
