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

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [filterModel, setFilterModel] = useState({
    items: [
      {
        columnField: 'name',
        operatorValue: 'contains',
        value: '',
      },
      {
        columnField: 'surname',
        operatorValue: 'contains',
        value: '',
      },
      {
        columnField: 'city',
        operatorValue: 'contains',
        value: '',
      },
      {
        columnField: 'email_address',
        operatorValue: 'contains',
        value: '',
      },
      {
        columnField: 'pesel',
        operatorValue: 'equals',
        value: '',
      },
    ],
    logicOperator: 'and',
  });
  const [columns, setColumns] = useState([
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'surname', headerName: 'Surname', width: 150 },
    { field: 'birth_date', headerName: 'Birth Date', width: 150 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'address', headerName: 'Address', width: 150 },
    { field: 'email_address', headerName: 'Email Address', width: 200 },
    { field: 'pesel', headerName: 'PESEL', width: 120 },
    { field: 'phone_number', headerName: 'Phone Number', width: 150 },
    { field: 'rental_history', headerName: 'Rental History', width: 200 },
    { field: 'active_rentals', headerName: 'Active Rentals', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <React.Fragment>
          <IconButton
            color="primary"
            onClick={() => handleDeleteUser(params.row.id)}
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
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user/');
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/user/${userId}/`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
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

  const rows = users.map((userItem) => ({
    id: userItem.id,
    name: userItem.name,
    surname: userItem.surname,
    birth_date: userItem.birth_date,
    city: userItem.city,
    address: userItem.address,
    email_address: userItem.email_address,
    pesel: userItem.pesel,
    phone_number: userItem.phone_number,
    rental_history: userItem.rental_history,
    active_rentals: userItem.active_rentals,
  }));

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        User List
      </Typography>
      <Grid container spacing={2}>
        {filterModel.items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.columnField}>
            <FormControl fullWidth>
              <Typography variant="subtitle2">{item.columnField}</Typography>
              <Select
                value={item.operatorValue}
                onChange={(e) => handleOperatorChange(index, e.target.value)}
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
          onColumnVisibilityChange={(params) => handleColumnToggle(params.field)}
        />
      </div>
    </Container>
  );
};

export default ListUser;
