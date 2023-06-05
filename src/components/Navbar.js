import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Drawer,
  List,
  ListItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';
import BookIcon from '@mui/icons-material/Book';
import GroupIcon from '@mui/icons-material/Group';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import RentalIcon from '@mui/icons-material/LocalShipping';
import ReservationIcon from '@mui/icons-material/EventNote';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Link } from 'react-router-dom';




const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [userMenuOpen, setUserMenuOpen] = React.useState(false);
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const [selectedSection, setSelectedSection] = React.useState('');

    const handleUserMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
      setUserMenuOpen(true);
    };
  
    const handleUserMenuClose = () => {
      setUserMenuOpen(false);
    };
  
    const handleSidebarToggle = () => {
      setSidebarOpen(!sidebarOpen);
    };
  
    const handleSectionSelect = (section) => {
        if (selectedSection === section) {
          setSelectedSection('');
        } else {
          setSelectedSection(section);
        }
      };

    const handleLogout = () => {
      // Handle logout logic here
    };
  
    return (
      <AppBar position="static">
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item xs={1}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleSidebarToggle}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="h6">Library</Typography>
            </Grid>
            <Grid item xs={6} container justifyContent="flex-end">
              <Button
                color="inherit"
                startIcon={<AccountCircleIcon />}
                onClick={handleUserMenuOpen}
              >
                User
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={userMenuOpen}
                onClose={handleUserMenuClose}
              >
                <MenuItem onClick={handleUserMenuClose}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </MenuItem>
                <MenuItem onClick={handleUserMenuClose}>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>
  
        <Drawer anchor="left" open={sidebarOpen} onClose={handleSidebarToggle}>
          <List
          sx={{
            width: {
              xs: '200px',
              sm: '250px',
              md: '300px',
            },
          }}      
          >
            <ListItem
              button
              selected={selectedSection === 'Books'}
              onClick={() => handleSectionSelect('Books')}
            >
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primary="Books" />
            </ListItem>
            {selectedSection === 'Books' && (
              <>
                <ListItem button component={Link} to='/book/add'>
                  <ListItemIcon>
                    <BookmarkAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Book" />
                </ListItem>
                <ListItem button component={Link} to='/book/list'>
                  <ListItemIcon>
                    <ManageSearchIcon />
                  </ListItemIcon>
                  <ListItemText primary="Manage Books" />
                </ListItem>
              </>
            )}
            <ListItem
              button
              selected={selectedSection === 'Users'}
              onClick={() => handleSectionSelect('Users')}
            >
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            {selectedSection === 'Users' && (
              <>
                <ListItem button component={Link} to='/user/add'>
                  <ListItemIcon>
                    <PersonAddAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add User" />
                </ListItem>
                <ListItem button component={Link} to='/user/list'>
                  <ListItemIcon>
                    <ManageSearchIcon />
                  </ListItemIcon>
                  <ListItemText primary="Manage Users" />
                </ListItem>
              </>
            )}
            <ListItem
              button
              selected={selectedSection === 'Libraries'}
              onClick={() => handleSectionSelect('Libraries')}
            >
              <ListItemIcon>
                <LocalLibraryIcon />
              </ListItemIcon>
              <ListItemText primary="Libraries" />
            </ListItem>
            {selectedSection === 'Libraries' && (
              <>
                <ListItem button component={Link} to='/library/add'>
                  <ListItemIcon>
                    <LibraryAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Library" />
                </ListItem>
                <ListItem button component={Link} to='/library/list'>
                  <ListItemIcon>
                    <ManageSearchIcon />
                  </ListItemIcon>
                  <ListItemText primary="Manage Libraries" />
                </ListItem>
              </>
            )}
            <ListItem
              button
              selected={selectedSection === 'Rentals'}
              onClick={() => handleSectionSelect('Rentals')}
            >
              <ListItemIcon>
                <RentalIcon />
              </ListItemIcon>
              <ListItemText primary="Rentals" />
            </ListItem>
            {selectedSection === 'Rentals' && (
              <>
                <ListItem button component={Link} to='/rental/add'>
                  <ListItemIcon>
                    <PostAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Rental" />
                </ListItem>
                <ListItem button component={Link} to='/rental/list'>
                  <ListItemIcon>
                    <ManageSearchIcon />
                  </ListItemIcon>
                  <ListItemText primary="Manage Rentals" />
                </ListItem>
              </>
            )}
            <ListItem
              button
              selected={selectedSection === 'Reservations'}
              onClick={() => handleSectionSelect('Reservations')}
            >
              <ListItemIcon>
                <ReservationIcon />
              </ListItemIcon>
              <ListItemText primary="Reservations" />
            </ListItem>
            {selectedSection === 'Reservations' && (
              <>
                <ListItem button component={Link} to='/reservation/add'>
                  <ListItemIcon>
                    <PostAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Reservation" />
                </ListItem>
                <ListItem button component={Link} to='/reservation/list'>
                  <ListItemIcon>
                    <ManageSearchIcon />
                  </ListItemIcon>
                  <ListItemText primary="Manage Reservations" />
                </ListItem>
              </>
            )}
          </List>
        </Drawer>
      </AppBar>
    );
  };
  export default Navbar;  