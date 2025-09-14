// // import React from 'react';
// // import { styled } from '@mui/material/styles';
// // import MuiAppBar from '@mui/material/AppBar';
// // import Toolbar from '@mui/material/Toolbar';
// // import IconButton from '@mui/material/IconButton';
// // import MenuIcon from '@mui/icons-material/Menu';
// // import Box from '@mui/material/Box';

// // const drawerWidth = 240;

// // const AppBar = styled(MuiAppBar, {
// //   shouldForwardProp: (prop) => prop !== 'open',
// // })(({ theme, open, isMobile }) => ({
// //   zIndex: theme.zIndex.drawer + 1,
// //   transition: theme.transitions.create(['width', 'margin'], {
// //     easing: theme.transitions.easing.sharp,
// //     duration: theme.transitions.duration.leavingScreen,
// //   }),
// //   backgroundColor: '#fff',
// //   boxShadow: 'none',
// //   borderBottom: '1px solid #eee',
// //   ...(open && !isMobile && {
// //     marginLeft: drawerWidth,
// //     width: `calc(100% - ${drawerWidth}px)`,
// //     transition: theme.transitions.create(['width', 'margin'], {
// //       easing: theme.transitions.easing.sharp,
// //       duration: theme.transitions.duration.enteringScreen,
// //     }),
// //   }),
// // }));

// // const Navbar = ({ open, onDrawerOpen, isMobile }) => {
// //   return (
// //     <AppBar position="fixed" open={open} isMobile={isMobile}>
// //       <Toolbar>
// //         <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
// //           <IconButton
// //             color="inherit"
// //             aria-label="open drawer"
// //             onClick={onDrawerOpen}
// //             edge="start"
// //             sx={{
// //               marginRight: 5,
// //               ...(!isMobile && open && { display: 'none' }),
// //               color: '#000',
// //             }}
// //           >
// //             <MenuIcon />
// //           </IconButton>
// //           <Box 
// //             component="img"
// //             src="/path-to-your-logo.png"
// //             alt="CRMS"
// //             sx={{ height: 40 }}
// //           />
// //         </Box>
// //       </Toolbar>
// //     </AppBar>
// //   );
// // };

// // export default Navbar;



// import React, { useState } from 'react';
// import { styled } from '@mui/material/styles';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import Box from '@mui/material/Box';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Avatar from '@mui/material/Avatar';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Divider from '@mui/material/Divider';
// import PersonIcon from '@mui/icons-material/Person';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import LogoutIcon from '@mui/icons-material/Logout';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom';
// import logoimage from "../assets/loginpageimage/logo.png"

// const drawerWidth = 260;

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open, isMobile }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   backgroundColor: '#fff',
//   boxShadow: 'none',
//   borderBottom: '1px solid #eee',
//   ...(open && !isMobile && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const ProfileButton = styled(Button)(({ theme }) => ({
//   textTransform: 'none',
//   color: theme.palette.text.primary,
//   '&:hover': {
//     backgroundColor: 'rgba(0, 0, 0, 0.04)',
//   },
// }));

// const Navbar = ({ open, onDrawerOpen, isMobile }) => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const menuOpen = Boolean(anchorEl);
//   const navigate = useNavigate();

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const goMyProfile =()=>{
//     navigate('/dashboard/my-profile');
//   }

//   const goToDashboard =()=>{
//     navigate("/dashboard");
//   }

//   const handleLogout =()=>{
//     navigate("/");
//   }

//   return (
//     <AppBar position="fixed" open={open} isMobile={isMobile}>
//       <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
//         {/* Left side - Menu and Logo */}
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={onDrawerOpen}
//             edge="start"
//             sx={{
//               marginRight: 2,
//               ...(!isMobile && open && { display: 'none' }),
//               color: '#000',
//             }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Box
//             component="img"
//             src={logoimage}
//             alt="CRMS"
//             sx={{ height: 40 }}
//           />
//         </Box>

//         {/* Right side - Profile Menu */}
//         <Box>
//           <ProfileButton
//             onClick={handleClick}
//             endIcon={<KeyboardArrowDownIcon />}
//             startIcon={
//               <Avatar sx={{ width: 32, height: 32, bgcolor: '#f5f5f5' }}>
//                 <PersonIcon sx={{ color: '#757575', fontSize: 20 }} />
//               </Avatar>
//             }
//           >
//             My Profile
//           </ProfileButton>
//           <Menu
//             anchorEl={anchorEl}
//             open={menuOpen}
//             onClose={handleClose}
//             onClick={handleClose}
//             PaperProps={{
//               elevation: 2,
//               sx: {
//                 width: 200,
//                 maxWidth: '100%',
//                 mt: 1.5,
//               },
//             }}
//             transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//             anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//           >
//             <MenuItem onClick={goMyProfile}>
//               <ListItemIcon>
//                 <PersonIcon fontSize="small" />
//               </ListItemIcon>
//               My Profile
//             </MenuItem>
//             <MenuItem onClick={goToDashboard}>
//               <ListItemIcon>
//                 <DashboardIcon fontSize="small" />
//               </ListItemIcon>
//               Dashboard
//             </MenuItem>
//             <Divider />
//             <MenuItem sx={{ color: 'error.main' }} onClick={handleLogout}>
//               <ListItemIcon>
//                 <LogoutIcon fontSize="small" color="error" />
//               </ListItemIcon>
//               Logout
//             </MenuItem>
//           </Menu>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;






import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import { useNavigate } from 'react-router-dom';
// import logoimage from "../assets/loginpageimage/logo.png";

// Theme constants matching sidebar
const THEME_COLORS = {
  primary: '#1A0F0A',
  primaryDark: '#E03E3E',
  background: {
    main: '#1A0F0A',
    secondary: '#2A1F1A',
    hover: 'rgba(255, 68, 68, 0.1)',
    active: 'rgba(255, 68, 68, 0.15)',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#B8B8B8',
    tertiary: '#888888',
  },
  border: 'rgba(255, 68, 68, 0.2)',
};

const drawerWidth = 260;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open, isMobile }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: THEME_COLORS.background.main,
  boxShadow: `0 2px 8px rgba(0, 0, 0, 0.15)`,
  borderBottom: `1px solid ${THEME_COLORS.border}`,
  ...(open && !isMobile && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '12px',
  backgroundColor: alpha(THEME_COLORS.background.secondary, 0.8),
  border: `1px solid ${alpha(THEME_COLORS.border, 0.3)}`,
  '&:hover': {
    backgroundColor: alpha(THEME_COLORS.background.secondary, 1),
    borderColor: alpha(THEME_COLORS.primary, 0.5),
  },
  '&:focus-within': {
    backgroundColor: alpha(THEME_COLORS.background.secondary, 1),
    borderColor: THEME_COLORS.primary,
    boxShadow: `0 0 0 2px ${alpha(THEME_COLORS.primary, 0.2)}`,
  },
  marginLeft: 0,
  width: '100%',
  maxWidth: '400px',
  transition: 'all 0.2s ease-in-out',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
    minWidth: '300px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: THEME_COLORS.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: THEME_COLORS.text.primary,
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: theme.spacing(4),
    transition: theme.transitions.create('width'),
    fontSize: '0.875rem',
    '&::placeholder': {
      color: THEME_COLORS.text.tertiary,
      opacity: 1,
    },
  },
}));

const ProfileButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: THEME_COLORS.text.primary,
  borderRadius: '12px',
  padding: theme.spacing(0.5, 1.5),
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: THEME_COLORS.background.hover,
    transform: 'translateY(-1px)',
  },
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(1),
  },
  '& .MuiButton-endIcon': {
    marginLeft: theme.spacing(1),
    transition: 'transform 0.2s ease-in-out',
  },
  '&:hover .MuiButton-endIcon': {
    transform: 'rotate(180deg)',
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: THEME_COLORS.text.secondary,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: THEME_COLORS.background.hover,
    color: THEME_COLORS.primary,
    transform: 'scale(1.05)',
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: THEME_COLORS.background.secondary,
    border: `1px solid ${THEME_COLORS.border}`,
    borderRadius: '12px',
    boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3)`,
    minWidth: '220px',
    marginTop: theme.spacing(1),
  },
  '& .MuiMenuItem-root': {
    color: THEME_COLORS.text.primary,
    padding: theme.spacing(1.5, 2),
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: THEME_COLORS.background.hover,
      color: THEME_COLORS.primary,
    },
    '& .MuiListItemIcon-root': {
      color: 'inherit',
      minWidth: '36px',
    },
  },
  '& .MuiDivider-root': {
    borderColor: THEME_COLORS.border,
    margin: theme.spacing(0.5, 0),
  },
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.1rem',
  color: THEME_COLORS.text.primary,
  marginLeft: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const NotificationButton = styled(IconButton)(({ theme }) => ({
  color: THEME_COLORS.text.secondary,
  transition: 'all 0.2s ease-in-out',
  position: 'relative',
  '&:hover': {
    backgroundColor: THEME_COLORS.background.hover,
    color: THEME_COLORS.primary,
    transform: 'scale(1.05)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: THEME_COLORS.primary,
    opacity: 0,
    transform: 'scale(0)',
    transition: 'all 0.2s ease-in-out',
  },
  '&.has-notifications::after': {
    opacity: 1,
    transform: 'scale(1)',
  },
}));

const Navbar = ({ open, onDrawerOpen, isMobile }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [notificationCount] = useState(3); // Example notification count
  const menuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchValue.trim()) {
      // Implement search logic
      console.log('Searching for:', searchValue);
      // navigate(`/search?q=${encodeURIComponent(searchValue)}`);
    }
  };

  const goMyProfile = () => {
    navigate('/dashboard/my-profile');
    handleClose();
  };

  const goToDashboard = () => {
    navigate("/dashboard");
    handleClose();
  };

  const handleLogout = () => {
    // Add confirmation dialog if needed
    if (window.confirm('Are you sure you want to logout?')) {
      // Clear any stored tokens/data
      localStorage.removeItem('authToken');
      navigate("/");
    }
    handleClose();
  };

  const handleNotificationClick = () => {
    // Handle notification click
    console.log('Notifications clicked');
    // navigate('/notifications');
  };

  return (
    <AppBar position="fixed" open={open} isMobile={isMobile}>
      <Toolbar sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        minHeight: '64px !important',
        px: { xs: 1, sm: 2 },
      }}>
        {/* Left side - Menu, Logo, and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <StyledIconButton
            aria-label="open drawer"
            onClick={onDrawerOpen}
            edge="start"
            sx={{
              mr: 1,
              ...(!isMobile && open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </StyledIconButton>
          
          {/* <Box
            component="img"
            src={logoimage}
            alt="CRMS"
            sx={{ 
              height: 36,
              mr: 2,
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          /> */}
          
          <PageTitle variant="h6" component="div">
            Dealership Quoting Portal
          </PageTitle>
        </Box>

        {/* Center - Search Bar */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          flex: { xs: 0, md: 2 },
          mx: { xs: 1, md: 0 },
        }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon fontSize="small" />
            </SearchIconWrapper>
            <form onSubmit={handleSearchSubmit}>
              <StyledInputBase
                placeholder="Search ..."
                value={searchValue}
                onChange={handleSearchChange}
                inputProps={{ 'aria-label': 'search quotes' }}
              />
            </form>
          </Search>
        </Box>

        {/* Right side - Notifications and Profile Menu */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          flex: { xs: 0, md: 1 },
          justifyContent: 'flex-end',
        }}>
          {/* <NotificationButton
            className={notificationCount > 0 ? 'has-notifications' : ''}
            onClick={handleNotificationClick}
            aria-label={`${notificationCount} notifications`}
          >
            <Badge 
              badgeContent={notificationCount} 
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: THEME_COLORS.primary,
                  color: 'white',
                  fontSize: '0.75rem',
                  minWidth: '18px',
                  height: '18px',
                },
              }}
            >
              <NotificationsIcon fontSize="small" />
            </Badge>
          </NotificationButton> */}

          <ProfileButton
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
            startIcon={
              <Avatar sx={{ 
                width: 32, 
                height: 32, 
                bgcolor: THEME_COLORS.background.secondary,
                border: `2px solid ${THEME_COLORS.primary}`,
                transition: 'all 0.2s ease-in-out',
              }}>
                <PersonIcon sx={{ 
                  color: THEME_COLORS.primary, 
                  fontSize: 18 
                }} />
              </Avatar>
            }
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            Profile
          </ProfileButton>

          {/* Mobile Profile Button */}
          <StyledIconButton
            onClick={handleClick}
            sx={{ display: { xs: 'flex', sm: 'none' } }}
          >
            <Avatar sx={{ 
              width: 32, 
              height: 32, 
              bgcolor: THEME_COLORS.background.secondary,
              border: `2px solid ${THEME_COLORS.primary}`,
            }}>
              <PersonIcon sx={{ 
                color: THEME_COLORS.primary, 
                fontSize: 18 
              }} />
            </Avatar>
          </StyledIconButton>

          <StyledMenu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {/* <MenuItem onClick={goMyProfile}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              My Profile
            </MenuItem> */}
            {/* <MenuItem onClick={goToDashboard}>
              <ListItemIcon>
                <DashboardIcon fontSize="small" />
              </ListItemIcon>
              Dashboard
            </MenuItem> */}
            {/* <Divider /> */}
            <MenuItem 
              onClick={handleLogout}
              sx={{ 
                color: `${THEME_COLORS.primary} !important`,
                '&:hover': {
                  backgroundColor: `${alpha(THEME_COLORS.primary, 0.1)} !important`,
                },
              }}
            >
              <ListItemIcon>
                <LogoutIcon fontSize="small" sx={{ color: 'white' }} />
              </ListItemIcon>
              <Typography sx={{color:'white'}}>Logout</Typography>
            </MenuItem>
          </StyledMenu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;