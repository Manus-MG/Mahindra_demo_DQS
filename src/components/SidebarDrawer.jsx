// import React from 'react';
// import { styled } from '@mui/material/styles';
// import MuiDrawer from '@mui/material/Drawer';
// import List from '@mui/material/List';
// import Box from '@mui/material/Box';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import { useTheme } from '@mui/material/styles';
// import { useNavigate, useLocation } from 'react-router-dom';
// import Collapse from '@mui/material/Collapse';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
// import IconButton from '@mui/material/IconButton';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import Avatar from '@mui/material/Avatar';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';

// const drawerWidth = 240;

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: 'hidden',
//   backgroundColor: '#1a0f0a',
//   borderRight: '1px solid rgba(0, 0, 0, 0.08)',
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: 'hidden',
//   backgroundColor: '#FFF5F5',
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up('sm')]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
//   borderRight: '1px solid rgba(0, 0, 0, 0.08)',
// });

// const StyledListItemButton = styled(ListItemButton)(({ theme, active }) => ({
//   margin: '4px 8px',
//   borderRadius: '8px',
//   transition: 'all 0.2s ease-in-out',
//   '&:hover': {
//     backgroundColor: 'rgba(255, 59, 59, 0.08)',
//     transform: 'translateX(4px)',
//   },
//   ...(active && {
//     backgroundColor: 'rgba(255, 59, 59, 0.12)',
//     '&:hover': {
//       backgroundColor: 'rgba(255, 59, 59, 0.16)',
//     },
//   }),
// }));

// const StyledSubItemButton = styled(ListItemButton)(({ theme, active }) => ({
//   margin: '2px 8px 2px 16px',
//   borderRadius: '8px',
//   transition: 'all 0.2s ease-in-out',
//   '&:hover': {
//     backgroundColor: 'rgba(255, 59, 59, 0.08)',
//     transform: 'translateX(4px)',
//   },
//   ...(active && {
//     backgroundColor: 'rgba(255, 59, 59, 0.12)',
//     '&:hover': {
//       backgroundColor: 'rgba(255, 59, 59, 0.16)',
//     },
//   }),
// }));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open, isMobile }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && {
//       ...openedMixin(theme),
//       '& .MuiDrawer-paper': openedMixin(theme),
//     }),
//     ...(!open && !isMobile && {
//       ...closedMixin(theme),
//       '& .MuiDrawer-paper': closedMixin(theme),
//     }),
//   }),
// );

// const UserProfile = styled(Box)(({ theme }) => ({
//   padding: theme.spacing(2),
//   display: 'flex',
//   alignItems: 'center',
//   gap: theme.spacing(2),
//   '& .MuiAvatar-root': {
//     border: '2px solid #FF3B3B',
//     transition: 'transform 0.2s ease-in-out',
//     '&:hover': {
//       transform: 'scale(1.1)',
//     },
//   },
// }));

// const menuItems = [
//   {
//     text: 'Dashboard',
//     icon: <DashboardIcon />,
//     path: '/dashboard',
//     subItems: [
//       { text: 'Admin Dashboard', path: '/dashboard' },
//       { text: 'Agent Dashboard', path: '/dashboard/agent-dashboard' },
//       { text: 'Client Dashboard', path: '/dashboard/client-dashboard' },
//     ],
//   },
//   {
//     text: 'Management',
//     icon: <DashboardIcon />,
//     path: '/management',
//     subItems: [
//       { text: 'Manage Credentials', path: '/dashboard/manage-credential' },
//     ],
//   },
// ];

// const SidebarDrawer = ({ open, onDrawerClose, isMobile }) => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [expandedItem, setExpandedItem] = React.useState('');

//   React.useEffect(() => {
//     // Auto-expand the section containing the current path
//     const currentMenuItem = menuItems.find(item => 
//       item.subItems?.some(subItem => location.pathname === subItem.path)
//     );
//     if (currentMenuItem) {
//       setExpandedItem(currentMenuItem.text);
//     }
//   }, [location.pathname]);

//   const handleNavigation = (path, text) => {
//     navigate(path);
//     if (isMobile) {
//       onDrawerClose();
//     }
//   };

//   const handleExpand = (text) => {
//     setExpandedItem(expandedItem === text ? '' : text);
//   };

//   const isMainItemActive = (item) => {
//     return item.subItems
//       ? item.subItems.some(subItem => location.pathname === subItem.path)
//       : location.pathname === item.path;
//   };

//   const drawerContent = (
//     <>
//       <DrawerHeader sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
//         {open && (
//           <UserProfile>
//             <Avatar 
//               sx={{ width: 40, height: 40 }}
//               src="/path-to-profile-image.jpg"
//             />
//             <Box>
//               <Typography variant="subtitle1" sx={{ 
//                 fontWeight: 600,
//                 color: '#2C3E50',
//               }}>
//                 Adrian Davies
//               </Typography>
//               <Typography variant="body2" sx={{ 
//                 color: '#7F8C8D',
//                 fontSize: '0.8rem',
//               }}>
//                 Tech Lead
//               </Typography>
//             </Box>
//           </UserProfile>
//         )}
//         <IconButton 
//           onClick={onDrawerClose}
//           sx={{
//             '&:hover': {
//               backgroundColor: 'rgba(255, 59, 59, 0.08)',
//             },
//           }}
//         >
//           <ChevronLeftIcon />
//         </IconButton>
//       </DrawerHeader>
//       <List sx={{ px: 1, py: 2 }}>
//         {open && (
//           <Typography
//             variant="overline"
//             sx={{
//               pl: 3,
//               mb: 1,
//               color: '#7F8C8D',
//               fontWeight: 600,
//               letterSpacing: '0.1em',
//             }}
//           >
//             MAIN MENU
//           </Typography>
//         )}
//         {menuItems.map((item) => (
//           <React.Fragment key={item.text}>
//             <ListItem disablePadding>
//               <StyledListItemButton
//                 active={isMainItemActive(item)}
//                 onClick={() => {
//                   if (item.subItems) {
//                     handleExpand(item.text);
//                   } else {
//                     handleNavigation(item.path, item.text);
//                   }
//                 }}
//                 sx={{
//                   minHeight: 48,
//                   justifyContent: open ? 'initial' : 'center',
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : 'auto',
//                     justifyContent: 'center',
//                     color: isMainItemActive(item) ? '#FF3B3B' : '#7F8C8D',
//                     transition: 'color 0.2s ease-in-out',
//                   }}
//                 >
//                   {item.icon}
//                 </ListItemIcon>
//                 <ListItemText 
//                   primary={item.text}
//                   sx={{
//                     opacity: open ? 1 : 0,
//                     color: isMainItemActive(item) ? '#FF3B3B' : '#2C3E50',
//                     '& .MuiTypography-root': {
//                       fontWeight: isMainItemActive(item) ? 600 : 400,
//                     },
//                   }}
//                 />
//                 {item.subItems && open && (
//                   <Box
//                     component={expandedItem === item.text ? ExpandLess : ExpandMore}
//                     sx={{
//                       color: isMainItemActive(item) ? '#FF3B3B' : '#7F8C8D',
//                       transition: 'transform 0.2s ease-in-out',
//                       transform: expandedItem === item.text ? 'rotate(0deg)' : 'rotate(0deg)',
//                     }}
//                   />
//                 )}
//               </StyledListItemButton>
//             </ListItem>
//             {item.subItems && (
//               <Collapse in={expandedItem === item.text && open} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   {item.subItems.map((subItem) => (
//                     <StyledSubItemButton
//                       key={subItem.text}
//                       active={location.pathname === subItem.path}
//                       onClick={() => handleNavigation(subItem.path)}
//                     >
//                       <ListItemText 
//                         primary={subItem.text}
//                         sx={{
//                           '& .MuiTypography-root': {
//                             fontSize: '0.9rem',
//                             fontWeight: location.pathname === subItem.path ? 500 : 400,
//                             color: location.pathname === subItem.path ? '#FF3B3B' : '#7F8C8D',
//                           },
//                         }}
//                       />
//                     </StyledSubItemButton>
//                   ))}
//                 </List>
//               </Collapse>
//             )}
//           </React.Fragment>
//         ))}
//       </List>
//     </>
//   );

//   if (isMobile) {
//     return (
//       <MuiDrawer
//         variant="temporary"
//         open={open}
//         onClose={onDrawerClose}
//         ModalProps={{
//           keepMounted: true,
//         }}
//         sx={{
//           '& .MuiDrawer-paper': { 
//             boxSizing: 'border-box',
//             width: drawerWidth,
//             backgroundColor: '#FFF5F5',
//             mt: 7,
//             borderRight: '1px solid rgba(0, 0, 0, 0.08)',
//           },
//         }}
//       >
//         {drawerContent}
//       </MuiDrawer>
//     );
//   }

//   return (
//     <Drawer variant="permanent" open={open} isMobile={isMobile}>
//       {drawerContent}
//     </Drawer>
//   );
// };

// export default SidebarDrawer;


import React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import SchemaIcon from '@mui/icons-material/Schema';
import SecurityIcon from '@mui/icons-material/Security';
import BuildIcon from '@mui/icons-material/Build';

// Theme constants
const THEME_COLORS = {
  primary: '#FF4444', // Bright red/orange
  primaryDark: '#E03E3E',
  background: {
    main: '#1A0F0A', // Dark brown/black
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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 2),
  minHeight: '64px',
  borderBottom: `1px solid ${THEME_COLORS.border}`,
  backgroundColor: THEME_COLORS.background.secondary,
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#171312',
  borderRight: `1px solid ${THEME_COLORS.border}`,
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: THEME_COLORS.background.main,
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  borderRight: `1px solid ${THEME_COLORS.border}`,
});

const StyledListItemButton = styled(ListItemButton)(({ theme, active }) => ({
  margin: '4px 12px',
  borderRadius: '8px',
  minHeight: '48px',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '3px',
    backgroundColor: THEME_COLORS.primary,
    transform: active ? 'scaleY(1)' : 'scaleY(0)',
    transformOrigin: 'center',
    transition: 'transform 0.2s ease-in-out',
  },
  
  '&:hover': {
    backgroundColor: THEME_COLORS.background.hover,
    transform: 'translateX(2px)',
    '&::before': {
      transform: 'scaleY(1)',
    },
  },
  
  ...(active && {
    backgroundColor: '#E56751',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'rgba(255, 68, 68, 0.2)',
    },
  }),
}));

const StyledSubItemButton = styled(ListItemButton)(({ theme, active }) => ({
  margin: '2px 12px 2px 24px',
  borderRadius: '6px',
  minHeight: '40px',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '-12px',
    top: '50%',
    transform: 'translateY(-50%)',
    height: '2px',
    width: '8px',
    backgroundColor: active ? THEME_COLORS.primary : THEME_COLORS.text.tertiary,
    transition: 'all 0.2s ease-in-out',
  },
  
  '&:hover': {
    backgroundColor: THEME_COLORS.background.hover,
    transform: 'translateX(2px)',
    '&::before': {
      backgroundColor: THEME_COLORS.primary,
      width: '12px',
    },
  },
  
  ...(active && {
    backgroundColor: '#E56751',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'rgba(255, 68, 68, 0.2)',
    },
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open, isMobile }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && !isMobile && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const UserProfile = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  flex: 1,
  
  '& .MuiAvatar-root': {
    border: `2px solid ${THEME_COLORS.primary}`,
    transition: 'all 0.2s ease-in-out',
    boxShadow: `0 0 0 2px rgba(255, 68, 68, 0.2)`,
    
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: `0 0 0 3px rgba(255, 68, 68, 0.3)`,
    },
  },
}));

const LogoutButton = styled(IconButton)(({ theme }) => ({
  color: THEME_COLORS.text.secondary,
  transition: 'all 0.2s ease-in-out',
  
  '&:hover': {
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    color: THEME_COLORS.primary,
    transform: 'scale(1.1)',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: THEME_COLORS.text.tertiary,
  fontWeight: 700,
  letterSpacing: '0.1em',
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(2),
  paddingLeft: theme.spacing(2),
}));

// Role-based menu configuration
const getAllMenuItems = () => {
  const userRole = localStorage.getItem('role') || 'SALESEXECUTIVE';
  
  const baseMenuItems = {
    ADMIN: [
      {
        text: 'Dashboard',
        icon: <DashboardIcon />,
        path: '/dashboard',
       
      },
      {
        text: 'Quotes',
        icon: <AssignmentIcon />,
        path: '/quotes',
        subItems: [
          { text: 'All Quotes', path: '/quotes/all-quotes', icon: <AssignmentIcon /> },
        ],
      },
      {
        text: 'Price Listing',
        icon: <AssignmentIcon />,
        path: '/price',
        subItems: [
          { text: 'All Price Listing', path: '/prices/all-prices', icon: <AssignmentIcon /> },
        ],
      },
      {
        text: 'Accessories',
        icon: <BuildIcon />,
        path: '/accessories',
        subItems: [
          { text: 'All Accessories', path: '/accessories/all-accessories', icon: <BuildIcon /> },
        ],
      },
      {
        text: 'Insurance',
        icon: <SecurityIcon />,
        path: '/insurance',
        subItems: [
          { text: 'All Policies', path: '/insurance/all-policies', icon: <SecurityIcon /> },
          // { text: 'Policy Management', path: '/insurance/management', icon: <SettingsIcon /> },
        ],
      },
      {
        text: 'Scheme',
        icon: <SchemaIcon />,
        path: '/scheme',
        subItems: [
          { text: 'All Schemes', path: '/scheme/all-schemes', icon: <SchemaIcon /> },
          // { text: 'Manage Schemes', path: '/scheme/manage', icon: <SettingsIcon /> },
        ],
      },
      
      
      
      
    ],
    SALESEXECUTIVE: [
      {
        text: 'Dashboard',
        icon: <DashboardIcon />,
        path: '/dashboard',
      },
      {
        text: 'Quotes',
        icon: <AssignmentIcon />,
        path: '/quotes',
        subItems: [
          { text: 'All Quotes', path: '/quotes/all-quotes', icon: <AssignmentIcon /> },
        ],
      },
    ],
  };

  return baseMenuItems[userRole] || baseMenuItems.SALESEXECUTIVE;
};

const SidebarDrawer = ({ open, onDrawerClose, isMobile }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItem, setExpandedItem] = React.useState('');
  const [userRole, setUserRole] = React.useState('');
  const [menuItems, setMenuItems] = React.useState([]);

  // Get user role and set menu items
  React.useEffect(() => {
    const role = localStorage.getItem('role') || 'SALESEXECUTIVE';
    setUserRole(role);
    setMenuItems(getAllMenuItems());
  }, []);

  // Auto-expand logic with improved path matching
  React.useEffect(() => {
    const currentMenuItem = menuItems.find(item => 
      item.subItems?.some(subItem => location.pathname.startsWith(subItem.path)) ||
      location.pathname.startsWith(item.path)
    );
    
    if (currentMenuItem && currentMenuItem.subItems) {
      setExpandedItem(currentMenuItem.text);
    }
  }, [location.pathname, menuItems]);

  const handleNavigation = (path, text) => {
    navigate(path);
    if (isMobile) {
      onDrawerClose();
    }
  };

  const handleExpand = (text) => {
    setExpandedItem(expandedItem === text ? '' : text);
  };

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    console.log('Logout clicked');
    navigate('/');
  };

  const isMainItemActive = (item) => {
    return item.subItems
      ? item.subItems.some(subItem => location.pathname.startsWith(subItem.path))
      : location.pathname.startsWith(item.path);
  };

  const isSubItemActive = (subItem) => {
    return location.pathname === subItem.path || location.pathname.startsWith(subItem.path + '/');
  };

  // Get user display name based on role
  const getUserDisplayName = () => {
    return userRole === 'ADMIN' ? 'Administrator' : 'Sales Executive';
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <DrawerHeader>
        {open && (
          <UserProfile>
            <Avatar 
              sx={{ width: 40, height: 40 }}
              src="/path-to-profile-image.jpg"
            >
              {userRole === 'ADMIN' ? 'AD' : 'SE'}
            </Avatar>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  fontWeight: 600,
                  color: THEME_COLORS.text.primary,
                  fontSize: '0.875rem',
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Indraprastha
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: THEME_COLORS.text.secondary,
                  fontSize: '0.75rem',
                  lineHeight: 1,
                  display: 'block',
                }}
              >
                Auto
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: THEME_COLORS.primary,
                  fontSize: '0.7rem',
                  fontWeight: 500,
                }}
              >
                {getUserDisplayName()}
              </Typography>
            </Box>
          </UserProfile>
        )}
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {open && (
            <LogoutButton size="small" onClick={handleLogout} title="Logout">
              <LogoutIcon fontSize="small" />
            </LogoutButton>
          )}
          <IconButton 
            onClick={onDrawerClose}
            size="small"
            sx={{
              color: THEME_COLORS.text.secondary,
              '&:hover': {
                backgroundColor: THEME_COLORS.background.hover,
                color: THEME_COLORS.primary,
              },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Box>
      </DrawerHeader>

      <Box sx={{ flex: 1, overflowY: 'auto', py: 1 }}>
        <List sx={{ px: 0 }}>
          {open && (
            <SectionTitle variant="overline">
              {userRole === 'ADMIN' ? 'Admin Navigation' : 'Sales Navigation'}
            </SectionTitle>
          )}
          
          {menuItems.map((item) => (
            <React.Fragment key={item.text}>
              <ListItem disablePadding>
                <StyledListItemButton
                  active={isMainItemActive(item)}
                  onClick={() => {
                    if (item.subItems) {
                      handleExpand(item.text);
                    } else {
                      handleNavigation(item.path, item.text);
                    }
                  }}
                  sx={{
                    justifyContent: open ? 'initial' : 'center',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: isMainItemActive(item) ? '#FFFFFF' : '#FFFFFF',
                      transition: 'color 0.2s ease-in-out',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    sx={{
                      opacity: open ? 1 : 0,
                      '& .MuiTypography-root': {
                        color: isMainItemActive(item) ? '#FFFFFF' : '#FFFFFF',
                        fontWeight: isMainItemActive(item) ? 600 : 500,
                        fontSize: '0.9rem',
                      },
                    }}
                  />
                  {item.subItems && open && (
                    <Box
                      component={expandedItem === item.text ? ExpandLess : ExpandMore}
                      sx={{
                        color: isMainItemActive(item) ? '#FFFFFF' : '#FFFFFF',
                        transition: 'all 0.2s ease-in-out',
                        transform: expandedItem === item.text ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  )}
                </StyledListItemButton>
              </ListItem>
              
              {item.subItems && (
                <Collapse 
                  in={expandedItem === item.text && open} 
                  timeout={300} 
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem) => (
                      <StyledSubItemButton
                        key={subItem.text}
                        active={isSubItemActive(subItem)}
                        onClick={() => handleNavigation(subItem.path)}
                      >
                        {subItem.icon && (
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: 2,
                              justifyContent: 'center',
                              color: isSubItemActive(subItem) ? '#FFFFFF' : '#FFFFFF',
                              '& svg': { fontSize: '1.1rem' },
                            }}
                          >
                            {subItem.icon}
                          </ListItemIcon>
                        )}
                        <ListItemText 
                          primary={subItem.text}
                          sx={{
                            '& .MuiTypography-root': {
                              fontSize: '0.8rem',
                              fontWeight: isSubItemActive(subItem) ? 600 : 400,
                              color: isSubItemActive(subItem) ? '#FFFFFF' : '#FFFFFF',
                            },
                          }}
                        />
                      </StyledSubItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Footer section */}
      {open && (
        <Box sx={{ 
          p: 2, 
          borderTop: `1px solid ${THEME_COLORS.border}`,
          backgroundColor: THEME_COLORS.background.secondary,
        }}>
          <Typography 
            variant="caption" 
            sx={{ 
              color: THEME_COLORS.text.tertiary,
              display: 'block',
              textAlign: 'center',
            }}
          >
            © 2024 Indraprastha Auto
          </Typography>
        </Box>
      )}
    </Box>
  );

  if (isMobile) {
    return (
      <MuiDrawer
        variant="temporary"
        open={open}
        onClose={onDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: THEME_COLORS.background.main,
            borderRight: `1px solid ${THEME_COLORS.border}`,
          },
        }}
      >
        {drawerContent}
      </MuiDrawer>
    );
  }

  return (
    <Drawer variant="permanent" open={open} isMobile={isMobile}>
      {drawerContent}
    </Drawer>
  );
};

export default SidebarDrawer;
