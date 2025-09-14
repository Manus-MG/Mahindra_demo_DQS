// import React, { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import {
//   Box,
//   CssBaseline,
//   Toolbar,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import SidebarDrawer from "../components/SidebarDrawer";
// import Navbar from "../components/Navbar";

// const LayoutComponent = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const [open, setOpen] = useState(!isMobile);

//   useEffect(() => {
//     setOpen(!isMobile);
//   }, [isMobile]);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <Navbar open={open} onDrawerOpen={handleDrawerOpen} isMobile={isMobile} />
//       <SidebarDrawer
//         open={open}
//         onDrawerClose={handleDrawerClose}
//         isMobile={isMobile}
//       />
//       <Box
//         component="main"
//         sx={{
//           backgroundColor: "#F9F9FC",
//           flexGrow: 1,
//           p: { xs: 2, sm: 3 },
//           width: "100%",
//           transition: theme.transitions.create("margin", {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen,
//           }),
//           ...(open && {
//             marginLeft: { xs: 0, sm: 0 },
//           }),
//         }}
//       >
//         <Toolbar />
//         <Outlet />
//       </Box>
//     </Box>
//   );
// };

// export default LayoutComponent;







import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SidebarDrawer from "../components/SidebarDrawer";
import Navbar from "../components/Navbar";

// Theme constants matching sidebar and navbar
const THEME_COLORS = {
  primary: '#FF4444',
  primaryDark: '#E03E3E',
  background: {
    main: '#1A0F0A',        // Main dark background
    secondary: '#2A1F1A',   // Secondary dark background
    content: '#0F0F0F',     // Content area background (slightly different for contrast)
    paper: '#1F1F1F',       // Paper/card backgrounds
    hover: 'rgba(255, 68, 68, 0.1)',
    active: 'rgba(255, 68, 68, 0.15)',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#B8B8B8',
    tertiary: '#888888',
  },
  border: 'rgba(255, 68, 68, 0.2)',
  divider: 'rgba(255, 255, 255, 0.1)',
};

const LayoutComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(!isMobile);

  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box 
      sx={{ 
        display: "flex",
        backgroundColor: THEME_COLORS.background.main,
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      
      {/* Enhanced Global Styles for Dark Theme */}
      <style>
        {`
          body {
            background-color: ${THEME_COLORS.background.main} !important;
            color: ${THEME_COLORS.text.primary} !important;
          }
          
          /* Scrollbar Styling for Dark Theme */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: ${THEME_COLORS.background.secondary};
            border-radius: 4px;
          }
          
          // ::-webkit-scrollbar-thumb {
          //   background: ${THEME_COLORS.primary};
          //   border-radius: 4px;
          //   transition: background 0.2s ease;
          // }
          
          // ::-webkit-scrollbar-thumb:hover {
          //   background: ${THEME_COLORS.primaryDark};
          // }
          
          // /* Selection Color */
          // ::selection {
          //   background-color: ${THEME_COLORS.primary};
          //   color: white;
          // }
          
          ::-moz-selection {
            background-color: ${THEME_COLORS.primary};
            color: white;
          }
        `}
      </style>

      <Navbar 
        open={open} 
        onDrawerOpen={handleDrawerOpen} 
        isMobile={isMobile} 
      />
      
      <SidebarDrawer
        open={open}
        onDrawerClose={handleDrawerClose}
        isMobile={isMobile}
      />
      
      <Box
        component="main"
        sx={{
          backgroundColor: THEME_COLORS.background.content,
          flexGrow: 1,
          minHeight: '100vh',
          transition: theme.transitions.create(["margin", "background-color"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          position: 'relative',
          
          // Content area styling
          '& > *': {
            position: 'relative',
            zIndex: 1,
          },
          
          // Padding adjustments
          p: { 
            xs: 2, 
            sm: 3 
          },
          
          // Responsive margin handling
          ...(open && !isMobile && {
            marginLeft: 0,
          }),
          
          // Enhanced content area
          '& .MuiPaper-root': {
            backgroundColor: THEME_COLORS.background.paper,
            color: THEME_COLORS.text.primary,
            borderColor: THEME_COLORS.divider,
          },
          
          // Form elements styling
          '& .MuiTextField-root': {
            '& .MuiOutlinedInput-root': {
              backgroundColor: THEME_COLORS.background.secondary,
              color: THEME_COLORS.text.primary,
              '& fieldset': {
                borderColor: THEME_COLORS.border,
              },
              '&:hover fieldset': {
                borderColor: THEME_COLORS.primary,
              },
              '&.Mui-focused fieldset': {
                borderColor: THEME_COLORS.primary,
              },
            },
            '& .MuiInputLabel-root': {
              color: THEME_COLORS.text.secondary,
              '&.Mui-focused': {
                color: THEME_COLORS.primary,
              },
            },
          },
          
          // Button styling
          '& .MuiButton-root': {
            '&.MuiButton-contained': {
              backgroundColor: THEME_COLORS.primary,
              color: 'white',
              '&:hover': {
                backgroundColor: THEME_COLORS.primaryDark,
              },
            },
            '&.MuiButton-outlined': {
              borderColor: THEME_COLORS.border,
              color: THEME_COLORS.text.primary,
              '&:hover': {
                borderColor: THEME_COLORS.primary,
                backgroundColor: THEME_COLORS.background.hover,
              },
            },
          },
          
          // Table styling
          '& .MuiTableContainer-root': {
            backgroundColor: THEME_COLORS.background.paper,
            '& .MuiTable-root': {
              '& .MuiTableHead-root': {
                backgroundColor: THEME_COLORS.background.secondary,
                '& .MuiTableCell-head': {
                  color: THEME_COLORS.text.primary,
                  fontWeight: 600,
                  borderBottom: `1px solid ${THEME_COLORS.border}`,
                },
              },
              '& .MuiTableBody-root': {
                '& .MuiTableRow-root': {
                  '&:nth-of-type(odd)': {
                    backgroundColor: THEME_COLORS.background.main,
                  },
                  '&:hover': {
                    backgroundColor: THEME_COLORS.background.hover,
                  },
                  '& .MuiTableCell-body': {
                    color: THEME_COLORS.text.primary,
                    borderBottom: `1px solid ${THEME_COLORS.divider}`,
                  },
                },
              },
            },
          },
          
          // Card styling
          '& .MuiCard-root': {
            backgroundColor: THEME_COLORS.background.paper,
            borderColor: THEME_COLORS.border,
            boxShadow: `0 4px 12px rgba(0, 0, 0, 0.3)`,
          },
          
          // Typography styling
          '& .MuiTypography-root': {
            color: 'inherit',
            '&.MuiTypography-h1, &.MuiTypography-h2, &.MuiTypography-h3, &.MuiTypography-h4, &.MuiTypography-h5, &.MuiTypography-h6': {
              color: THEME_COLORS.text.primary,
            },
            '&.MuiTypography-body1, &.MuiTypography-body2': {
              color: THEME_COLORS.text.secondary,
            },
            '&.MuiTypography-caption': {
              color: THEME_COLORS.text.tertiary,
            },
          },
          
          // Divider styling
          '& .MuiDivider-root': {
            borderColor: THEME_COLORS.divider,
          },
          
          // Chip styling
          '& .MuiChip-root': {
            backgroundColor: THEME_COLORS.background.secondary,
            color: THEME_COLORS.text.primary,
            '&.MuiChip-filled': {
              '&.MuiChip-colorPrimary': {
                backgroundColor: THEME_COLORS.primary,
                color: 'white',
              },
            },
          },
          
          // Dialog styling
          '& .MuiDialog-paper': {
            backgroundColor: THEME_COLORS.background.paper,
            color: THEME_COLORS.text.primary,
          },
          
          // Menu styling
          '& .MuiMenu-paper': {
            backgroundColor: THEME_COLORS.background.secondary,
            border: `1px solid ${THEME_COLORS.border}`,
            '& .MuiMenuItem-root': {
              color: THEME_COLORS.text.primary,
              '&:hover': {
                backgroundColor: THEME_COLORS.background.hover,
              },
            },
          },
        }}
      >
        <Toolbar />
        
        {/* Content Container with Additional Styling */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            
            // Additional content area enhancements
            '& > *:first-of-type': {
              marginTop: 0,
            },
            
            // Ensure proper spacing for content
            '& .content-section': {
              backgroundColor: THEME_COLORS.background.paper,
              borderRadius: '12px',
              padding: theme.spacing(3),
              marginBottom: theme.spacing(3),
              border: `1px solid ${THEME_COLORS.border}`,
              boxShadow: `0 2px 8px rgba(0, 0, 0, 0.2)`,
            },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default LayoutComponent;