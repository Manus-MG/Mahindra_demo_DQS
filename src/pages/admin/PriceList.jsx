// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   Chip,
//   Grid,
//   TextField,
//   InputAdornment,
//   Alert,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Divider,
//   IconButton,
//   Card,
//   CardContent,
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import SearchIcon from '@mui/icons-material/Search';
// import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
// import BuildIcon from '@mui/icons-material/Build';
// import AddIcon from '@mui/icons-material/Add';
// import CloseIcon from '@mui/icons-material/Close';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
// import LocationOnIcon from '@mui/icons-material/LocationOn';

// // Theme constants
// const THEME_COLORS = {
//   primary: '#E56751',
//   primaryHover: '#D65A45',
//   success: '#4CAF50',
//   background: {
//     main: '#090909',
//     paper: '#1A1A1A',
//     secondary: '#2A1F1A',
//   },
//   text: {
//     primary: '#FFFFFF',
//     secondary: '#B8B8B8',
//     tertiary: '#888888',
//   },
//   border: 'rgba(255, 255, 255, 0.1)',
// };

// // Styled Components
// const StyledPaper = styled(Paper)(({ theme }) => ({
//   backgroundColor: THEME_COLORS.background.paper,
//   border: `1px solid ${THEME_COLORS.border}`,
//   borderRadius: '12px',
//   overflow: 'hidden',
// }));

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   borderBottom: `1px solid ${THEME_COLORS.border}`,
//   color: THEME_COLORS.text.primary,
//   padding: theme.spacing(1.5),
//   fontSize: '0.8rem',
// }));

// const StyledTableHead = styled(TableCell)(({ theme }) => ({
//   backgroundColor: THEME_COLORS.background.secondary,
//   borderBottom: `2px solid ${THEME_COLORS.primary}`,
//   color: THEME_COLORS.text.primary,
//   fontWeight: 600,
//   padding: theme.spacing(1.5),
//   fontSize: '0.75rem',
//   textTransform: 'uppercase',
//   letterSpacing: '0.5px',
//   textAlign: 'center',
// }));

// const StyledSelect = styled(Select)(({ theme }) => ({
//   backgroundColor: THEME_COLORS.background.paper,
//   color: THEME_COLORS.text.primary,
//   '& .MuiOutlinedInput-notchedOutline': {
//     borderColor: THEME_COLORS.border,
//   },
//   '&:hover .MuiOutlinedInput-notchedOutline': {
//     borderColor: THEME_COLORS.primary,
//   },
//   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//     borderColor: THEME_COLORS.primary,
//   },
// }));

// const StyledTextField = styled(TextField)(({ theme }) => ({
//   '& .MuiOutlinedInput-root': {
//     backgroundColor: THEME_COLORS.background.paper,
//     color: THEME_COLORS.text.primary,
//     '& fieldset': {
//       borderColor: THEME_COLORS.border,
//     },
//     '&:hover fieldset': {
//       borderColor: THEME_COLORS.primary,
//     },
//     '&.Mui-focused fieldset': {
//       borderColor: THEME_COLORS.primary,
//     },
//   },
//   '& .MuiInputLabel-root': {
//     color: THEME_COLORS.text.secondary,
//     '&.Mui-focused': {
//       color: THEME_COLORS.primary,
//     },
//   },
// }));

// const StyledButton = styled(Button)(({ theme, variant }) => ({
//   textTransform: 'none',
//   fontWeight: 500,
//   borderRadius: '8px',
//   padding: theme.spacing(1.5, 3),
//   ...(variant === 'contained' && {
//     backgroundColor: THEME_COLORS.primary,
//     color: 'white',
//     '&:hover': {
//       backgroundColor: THEME_COLORS.primaryHover,
//     },
//   }),
//   ...(variant === 'outlined' && {
//     borderColor: THEME_COLORS.border,
//     color: THEME_COLORS.text.primary,
//     '&:hover': {
//       borderColor: THEME_COLORS.primary,
//       backgroundColor: 'rgba(229, 103, 81, 0.1)',
//     },
//   }),
// }));

// const StyledDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialog-paper': {
//     backgroundColor: THEME_COLORS.background.paper,
//     color: THEME_COLORS.text.primary,
//     borderRadius: '12px',
//     border: `1px solid ${THEME_COLORS.border}`,
//     maxWidth: '900px',
//     width: '100%',
//   },
// }));

// // Vehicle Database with pricing structure matching your images
// const vehicleDatabase = {
//   'BOLERO': {
//     fuelType: 'DIESEL',
//     variants: [
//       {
//         model: 'B2 BS6.2',
//         exShowroomPrice: 970001,
//         taxCollection: 0,
//         insurance: 35222,
//         extendedWarranty: 16999,
//         accessories: 15000,
//         rsa: 2021,
//         fastag: 500,
//         registrationWithoutHypothecation: 89675,
//         onRoadPriceIndividualWithoutHypothecation: 1129418,
//         registrationWithHypothecation: 91175
//       },
//       {
//         model: 'B4 BS6.2', 
//         exShowroomPrice: 981400,
//         taxCollection: 0,
//         insurance: 37455,
//         extendedWarranty: 16999,
//         accessories: 15000,
//         rsa: 2021,
//         fastag: 500,
//         registrationWithoutHypothecation: 90672,
//         onRoadPriceIndividualWithoutHypothecation: 1144047,
//         registrationWithHypothecation: 92172
//       },
//       {
//         model: 'B6 BS6.2',
//         exShowroomPrice: 999900,
//         taxCollection: 0,
//         insurance: 39841,
//         extendedWarranty: 16999,
//         accessories: 15000,
//         rsa: 2021,
//         fastag: 500,
//         registrationWithoutHypothecation: 92291,
//         onRoadPriceIndividualWithoutHypothecation: 1166552,
//         registrationWithHypothecation: 93791
//       }
//     ]
//   },
//   'BOLERO NEO': {
//     fuelType: 'DIESEL',
//     variants: [
//       {
//         model: 'N4 BS6.2',
//         exShowroomPrice: 1050000,
//         taxCollection: 0,
//         insurance: 42500,
//         extendedWarranty: 16999,
//         accessories: 18000,
//         rsa: 2021,
//         fastag: 500,
//         registrationWithoutHypothecation: 95500,
//         onRoadPriceIndividualWithoutHypothecation: 1225520,
//         registrationWithHypothecation: 97000
//       },
//       {
//         model: 'N8 BS6.2',
//         exShowroomPrice: 1180000,
//         taxCollection: 0,
//         insurance: 47200,
//         extendedWarranty: 16999,
//         accessories: 20000,
//         rsa: 2021,
//         fastag: 500,
//         registrationWithoutHypothecation: 106800,
//         onRoadPriceIndividualWithoutHypothecation: 1373520,
//         registrationWithHypothecation: 108300
//       }
//     ]
//   },
//   'MARAZZO': {
//     fuelType: 'DIESEL',
//     variants: [
//       {
//         model: 'M2 BS6.2',
//         exShowroomPrice: 1249000,
//         taxCollection: 0,
//         insurance: 49960,
//         extendedWarranty: 18999,
//         accessories: 22000,
//         rsa: 2521,
//         fastag: 500,
//         registrationWithoutHypothecation: 113000,
//         onRoadPriceIndividualWithoutHypothecation: 1455980,
//         registrationWithHypothecation: 114500
//       },
//       {
//         model: 'M4+ BS6.2',
//         exShowroomPrice: 1399000,
//         taxCollection: 0,
//         insurance: 55960,
//         extendedWarranty: 18999,
//         accessories: 25000,
//         rsa: 2521,
//         fastag: 500,
//         registrationWithoutHypothecation: 126640,
//         onRoadPriceIndividualWithoutHypothecation: 1628620,
//         registrationWithHypothecation: 128140
//       }
//     ]
//   },
//   'SCORPIO-C': {
//     fuelType: 'DIESEL',
//     variants: [
//       {
//         model: 'S3 BS6.2',
//         exShowroomPrice: 1199000,
//         taxCollection: 0,
//         insurance: 47960,
//         extendedWarranty: 18999,
//         accessories: 20000,
//         rsa: 2521,
//         fastag: 500,
//         registrationWithoutHypothecation: 108540,
//         onRoadPriceIndividualWithoutHypothecation: 1397520,
//         registrationWithHypothecation: 110040
//       },
//       {
//         model: 'S5 BS6.2',
//         exShowroomPrice: 1349000,
//         taxCollection: 0,
//         insurance: 53960,
//         extendedWarranty: 18999,
//         accessories: 22000,
//         rsa: 2521,
//         fastag: 500,
//         registrationWithoutHypothecation: 122140,
//         onRoadPriceIndividualWithoutHypothecation: 1569120,
//         registrationWithHypothecation: 123640
//       }
//     ]
//   },
//   'XUV700-PET': {
//     fuelType: 'PETROL',
//     variants: [
//       {
//         model: 'MX BS6.2',
//         exShowroomPrice: 1399000,
//         taxCollection: 0,
//         insurance: 55960,
//         extendedWarranty: 19999,
//         accessories: 25000,
//         rsa: 2521,
//         fastag: 500,
//         registrationWithoutHypothecation: 126640,
//         onRoadPriceIndividualWithoutHypothecation: 1629620,
//         registrationWithHypothecation: 128140
//       },
//       {
//         model: 'AX3 BS6.2',
//         exShowroomPrice: 1549000,
//         taxCollection: 0,
//         insurance: 61960,
//         extendedWarranty: 19999,
//         accessories: 28000,
//         rsa: 2521,
//         fastag: 500,
//         registrationWithoutHypothecation: 140240,
//         onRoadPriceIndividualWithoutHypothecation: 1802220,
//         registrationWithHypothecation: 141740
//       }
//     ]
//   },
//   'XUV700-DSL': {
//     fuelType: 'DIESEL', 
//     variants: [
//       {
//         model: 'MX BS6.2',
//         exShowroomPrice: 1499000,
//         taxCollection: 0,
//         insurance: 59960,
//         extendedWarranty: 19999,
//         accessories: 25000,
//         rsa: 2521,
//         fastag: 500,
//         registrationWithoutHypothecation: 135740,
//         onRoadPriceIndividualWithoutHypothecation: 1742720,
//         registrationWithHypothecation: 137240
//       },
//       {
//         model: 'AX7 BS6.2',
//         exShowroomPrice: 1799000,
//         taxCollection: 0,
//         insurance: 71960,
//         extendedWarranty: 19999,
//         accessories: 30000,
//         rsa: 2521,
//         fastag: 500,
//         registrationWithoutHypothecation: 162740,
//         onRoadPriceIndividualWithoutHypothecation: 2086720,
//         registrationWithHypothecation: 164240
//       }
//     ]
//   },
//   'THAR-3D-DSL': {
//     fuelType: 'DIESEL',
//     variants: [
//       {
//         model: 'LX BS6.2',
//         exShowroomPrice: 1249000,
//         taxCollection: 0,
//         insurance: 49960,
//         extendedWarranty: 18999,
//         accessories: 22000,
//         rsa: 2521,
//         fastag: 500,
//         registrationWithoutHypothecation: 113000,
//         onRoadPriceIndividualWithoutHypothecation: 1455980,
//         registrationWithHypothecation: 114500
//       },
//       {
//         model: 'LX Hard Top BS6.2',
//         exShowroomPrice: 1399000,
//         taxCollection: 0,
//         insurance: 55960,
//         extendedWarranty: 18999,
//         accessories: 25000,
//         rsa: 2521,
//         fastag: 500,
//         registrationWithoutHypothecation: 126640,
//         onRoadPriceIndividualWithoutHypothecation: 1628620,
//         registrationWithHypothecation: 128140
//       }
//     ]
//   }
// };

// const VehiclePricingTable = () => {
//   const [selectedModel, setSelectedModel] = useState('');
//   const [selectedState, setSelectedState] = useState('NEW DELHI');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false);
  
//   // Form states for the dialog
//   const [formData, setFormData] = useState({
//     customerName: '',
//     customerEmail: '',
//     customerPhone: '',
//     customerAddress: '',
//     selectedVariant: '',
//     registrationType: 'individual_without_hypothecation',
//     financeRequired: 'no',
//     exchangeVehicle: 'no',
//     notes: '',
//   });

//   const carModels = Object.keys(vehicleDatabase);
//   const states = ['NEW DELHI', 'MUMBAI', 'BANGALORE', 'CHENNAI', 'PUNE', 'HYDERABAD', 'KOLKATA'];

//   // Get filtered variants based on search term
//   const getFilteredVariants = () => {
//     if (!selectedModel) return [];
    
//     const modelData = vehicleDatabase[selectedModel];
//     if (!searchTerm) return modelData.variants;
//     return modelData.variants.filter(variant =>
//       variant.model.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   };

//   // Handle model selection
//   const handleModelChange = (event) => {
//     setSelectedModel(event.target.value);
//     setSearchTerm('');
//     setShowSuccess(false);
//   };

//   // Handle add booking dialog
//   const handleAddBooking = () => {
//     setOpenDialog(true);
//   };

//   // Handle dialog close
//   const handleDialogClose = () => {
//     setOpenDialog(false);
//     setFormData({
//       customerName: '',
//       customerEmail: '',
//       customerPhone: '',
//       customerAddress: '',
//       selectedVariant: '',
//       registrationType: 'individual_without_hypothecation',
//       financeRequired: 'no',
//       exchangeVehicle: 'no',
//       notes: '',
//     });
//   };

//   // Handle form input change
//   const handleFormChange = (field) => (event) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: event.target.value
//     }));
//   };

//   // Handle form submission
//   const handleFormSubmit = () => {
//     // Validate required fields
//     if (!formData.customerName || !formData.customerPhone || !formData.selectedVariant) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     // Here you can integrate with your API
//     console.log('Submitting booking request:', {
//       ...formData,
//       selectedModel,
//       selectedState,
//       submittedAt: new Date().toISOString()
//     });

//     // Show success message
//     setShowSuccess(true);
//     setTimeout(() => setShowSuccess(false), 3000);

//     // Close dialog
//     handleDialogClose();
//   };

//   const filteredVariants = getFilteredVariants();
//   const selectedVariantDetails = filteredVariants.find(variant => variant.model === formData.selectedVariant);

//   return (
//     <Box sx={{ p: 3, backgroundColor: THEME_COLORS.background.main, minHeight: '100vh' }}>
//       {/* Header */}
//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h4" sx={{ color: THEME_COLORS.text.primary, fontWeight: 600, mb: 1 }}>
//           Vehicle Price List & Booking
//         </Typography>
//         <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>
//           Check on-road prices and book your vehicle
//         </Typography>
//       </Box>

//       {/* Success Alert */}
//       {showSuccess && (
//         <Alert 
//           severity="success" 
//           sx={{ 
//             mb: 3, 
//             backgroundColor: 'rgba(76, 175, 80, 0.1)',
//             color: THEME_COLORS.success,
//             '& .MuiAlert-icon': { color: THEME_COLORS.success }
//           }}
//         >
//           Booking request submitted successfully!
//         </Alert>
//       )}

//       {/* Controls */}
//       <StyledPaper sx={{ p: 3, mb: 3 }}>
//         <Grid container spacing={3} alignItems="end">
//           <Grid item xs={12} md={3}>
//             <FormControl fullWidth size="small">
//               <InputLabel sx={{ color: THEME_COLORS.text.secondary }}>Select Model</InputLabel>
//               <StyledSelect
//                 value={selectedModel}
//                 label="Select Model"
//                 onChange={handleModelChange}
//               >
//                 <MenuItem value="">Select Model</MenuItem>
//                 {carModels.map((model) => (
//                   <MenuItem key={model} value={model}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                       <DirectionsCarIcon sx={{ color: THEME_COLORS.primary, fontSize: '1rem' }} />
//                       {model}
//                     </Box>
//                   </MenuItem>
//                 ))}
//               </StyledSelect>
//             </FormControl>
//           </Grid>

//           <Grid item xs={12} md={3}>
//             <FormControl fullWidth size="small">
//               <InputLabel sx={{ color: THEME_COLORS.text.secondary }}>State</InputLabel>
//               <StyledSelect
//                 value={selectedState}
//                 label="State"
//                 onChange={(e) => setSelectedState(e.target.value)}
//               >
//                 {states.map((state) => (
//                   <MenuItem key={state} value={state}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                       <LocationOnIcon sx={{ color: THEME_COLORS.primary, fontSize: '1rem' }} />
//                       {state}
//                     </Box>
//                   </MenuItem>
//                 ))}
//               </StyledSelect>
//             </FormControl>
//           </Grid>
          
//           <Grid item xs={12} md={3}>
//             <StyledTextField
//               fullWidth
//               size="small"
//               label="Search Variants"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               disabled={!selectedModel}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon sx={{ color: THEME_COLORS.text.secondary }} />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Grid>
          
//           {/* <Grid item xs={12} md={3}>
//             <StyledButton 
//               variant="contained" 
//               onClick={handleAddBooking}
//               disabled={!selectedModel}
//               startIcon={<AddIcon />}
//               fullWidth
//             >
//               Book Vehicle
//             </StyledButton>
//           </Grid> */}
//         </Grid>

//         {/* Model Info Card */}
//         {selectedModel && (
//           <Card sx={{ 
//             mt: 3, 
//             backgroundColor: THEME_COLORS.background.secondary,
//             border: `1px solid ${THEME_COLORS.border}`
//           }}>
//             <CardContent>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
//                 <DirectionsCarIcon sx={{ color: THEME_COLORS.primary, fontSize: '2rem' }} />
//                 <Box>
//                   <Typography variant="h6" sx={{ color: THEME_COLORS.text.primary, fontWeight: 600 }}>
//                     {selectedModel}
//                   </Typography>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                     <Chip 
//                       icon={<LocalGasStationIcon />}
//                       label={vehicleDatabase[selectedModel]?.fuelType}
//                       size="small"
//                       sx={{ 
//                         backgroundColor: 'rgba(229, 103, 81, 0.2)',
//                         color: THEME_COLORS.primary
//                       }}
//                     />
//                     <Chip 
//                       icon={<LocationOnIcon />}
//                       label={selectedState}
//                       size="small"
//                       sx={{ 
//                         backgroundColor: 'rgba(229, 103, 81, 0.2)',
//                         color: THEME_COLORS.primary
//                       }}
//                     />
//                   </Box>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         )}
//       </StyledPaper>

//       {/* Pricing Table */}
//       {selectedModel ? (
//         filteredVariants.length > 0 ? (
//           <StyledPaper>
//             <Box sx={{ p: 2, borderBottom: `1px solid ${THEME_COLORS.border}` }}>
//               <Typography variant="h6" sx={{ color: THEME_COLORS.text.primary, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <BuildIcon sx={{ color: THEME_COLORS.primary }} />
//                 {selectedModel} - Price Breakdown ({selectedState})
//               </Typography>
//             </Box>
//             <TableContainer>
//               <Table stickyHeader size="small">
//                 <TableHead>
//                   <TableRow>
//                     <StyledTableHead sx={{ minWidth: '120px' }}>Model & Variant</StyledTableHead>
//                     <StyledTableHead sx={{ minWidth: '100px' }}>Ex-showroom Price</StyledTableHead>
//                     <StyledTableHead sx={{ minWidth: '80px' }}>Tax Collection</StyledTableHead>
//                     <StyledTableHead sx={{ minWidth: '100px' }}>Insurance (1 year)</StyledTableHead>
//                     <StyledTableHead sx={{ minWidth: '100px' }}>Extended Warranty</StyledTableHead>
//                     {/* <StyledTableHead sx={{ minWidth: '80px' }}>Accessories</StyledTableHead>
//                     <StyledTableHead sx={{ minWidth: '80px' }}>RSA (1 year)</StyledTableHead>
//                     <StyledTableHead sx={{ minWidth: '60px' }}>Fastag</StyledTableHead> */}
//                     <StyledTableHead sx={{ minWidth: '120px' }}>Registration without Hypothecation</StyledTableHead>
//                     <StyledTableHead sx={{ minWidth: '120px' }}>On Road Price without Hypothecation</StyledTableHead>
//                     <StyledTableHead sx={{ minWidth: '120px' }}>Registration with Hypothecation</StyledTableHead>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {filteredVariants.map((variant, index) => (
//                     <TableRow 
//                       key={variant.model}
//                       sx={{ 
//                         '&:hover': { backgroundColor: 'rgba(229, 103, 81, 0.05)' },
//                         backgroundColor: index % 2 === 0 ? THEME_COLORS.background.main : 'transparent'
//                       }}
//                     >
//                       <StyledTableCell sx={{ fontWeight: 600, color: THEME_COLORS.primary }}>
//                         {variant.model}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         ₹{variant.exShowroomPrice.toLocaleString()}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         ₹{variant.taxCollection}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         ₹{variant.insurance.toLocaleString()}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         ₹{variant.extendedWarranty.toLocaleString()}
//                       </StyledTableCell>
//                       {/* <StyledTableCell align="center">
//                         ₹{variant.accessories.toLocaleString()}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         ₹{variant.rsa.toLocaleString()}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         ₹{variant.fastag}
//                       </StyledTableCell> */}
//                       <StyledTableCell align="center">
//                         ₹{variant.registrationWithoutHypothecation.toLocaleString()}
//                       </StyledTableCell>
//                       <StyledTableCell align="center" sx={{ fontWeight: 600, color: THEME_COLORS.primary }}>
//                         ₹{variant.onRoadPriceIndividualWithoutHypothecation.toLocaleString()}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         ₹{variant.registrationWithHypothecation.toLocaleString()}
//                       </StyledTableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </StyledPaper>
//         ) : (
//           <StyledPaper sx={{ p: 4, textAlign: 'center' }}>
//             <SearchIcon sx={{ fontSize: 48, color: THEME_COLORS.text.tertiary, mb: 2 }} />
//             <Typography variant="body1" sx={{ color: THEME_COLORS.text.secondary }}>
//               No variants found for "{searchTerm}"
//             </Typography>
//           </StyledPaper>
//         )
//       ) : (
//         <StyledPaper sx={{ p: 4, textAlign: 'center' }}>
//           <DirectionsCarIcon sx={{ fontSize: 48, color: THEME_COLORS.text.tertiary, mb: 2 }} />
//           <Typography variant="body1" sx={{ color: THEME_COLORS.text.secondary }}>
//             Please select a car model to view pricing details
//           </Typography>
//         </StyledPaper>
//       )}

//       {/* Booking Dialog */}
//       <StyledDialog 
//         open={openDialog} 
//         onClose={handleDialogClose}
//         maxWidth="md"
//         fullWidth
//       >
//         <DialogTitle sx={{ 
//           display: 'flex', 
//           justifyContent: 'space-between', 
//           alignItems: 'center',
//           borderBottom: `1px solid ${THEME_COLORS.border}`,
//           pb: 2
//         }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <ShoppingCartIcon sx={{ color: THEME_COLORS.primary }} />
//             <Typography variant="h6" sx={{ color: THEME_COLORS.text.primary, fontWeight: 600 }}>
//               Book Vehicle - {selectedModel}
//             </Typography>
//           </Box>
//           <IconButton 
//             onClick={handleDialogClose}
//             sx={{ color: THEME_COLORS.text.secondary }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
        
//         <DialogContent sx={{ pt: 3 }}>
//           <Grid container spacing={3}>
//             {/* Customer Information */}
//             <Grid item xs={12}>
//               <Typography variant="subtitle1" sx={{ color: THEME_COLORS.primary, fontWeight: 600, mb: 2 }}>
//                 Customer Information
//               </Typography>
//             </Grid>
            
//             <Grid item xs={12} md={6}>
//               <StyledTextField
//                 fullWidth
//                 label="Customer Name *"
//                 value={formData.customerName}
//                 onChange={handleFormChange('customerName')}
//                 size="small"
//               />
//             </Grid>
            
//             <Grid item xs={12} md={6}>
//               <StyledTextField
//                 fullWidth
//                 label="Phone Number *"
//                 value={formData.customerPhone}
//                 onChange={handleFormChange('customerPhone')}
//                 size="small"
//               />
//             </Grid>
            
//             <Grid item xs={12} md={6}>
//               <StyledTextField
//                 fullWidth
//                 label="Email Address"
//                 type="email"
//                 value={formData.customerEmail}
//                 onChange={handleFormChange('customerEmail')}
//                 size="small"
//               />
//             </Grid>
            
//             <Grid item xs={12} md={6}>
//               <StyledTextField
//                 fullWidth
//                 label="Address"
//                 value={formData.customerAddress}
//                 onChange={handleFormChange('customerAddress')}
//                 size="small"
//               />
//             </Grid>

//             {/* Vehicle Selection */}
//             <Grid item xs={12}>
//               <Divider sx={{ borderColor: THEME_COLORS.border, my: 2 }} />
//               <Typography variant="subtitle1" sx={{ color: THEME_COLORS.primary, fontWeight: 600, mb: 2 }}>
//                 Vehicle Details
//               </Typography>
//             </Grid>
            
//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth size="small">
//                 <InputLabel sx={{ color: THEME_COLORS.text.secondary }}>Select Variant *</InputLabel>
//                 <StyledSelect
//                   value={formData.selectedVariant}
//                   label="Select Variant *"
//                   onChange={handleFormChange('selectedVariant')}
//                 >
//                   <MenuItem value="">Choose Variant</MenuItem>
//                   {filteredVariants.map((variant) => (
//                     <MenuItem key={variant.model} value={variant.model}>
//                       <Box>
//                         <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                           {variant.model}
//                         </Typography>
//                         <Typography variant="caption" sx={{ color: THEME_COLORS.text.secondary }}>
//                           ₹{variant.onRoadPriceIndividualWithoutHypothecation.toLocaleString()}
//                         </Typography>
//                       </Box>
//                     </MenuItem>
//                   ))}
//                 </StyledSelect>
//               </FormControl>
//             </Grid>
            
//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth size="small">
//                 <InputLabel sx={{ color: THEME_COLORS.text.secondary }}>Registration Type</InputLabel>
//                 <StyledSelect
//                   value={formData.registrationType}
//                   label="Registration Type"
//                   onChange={handleFormChange('registrationType')}
//                 >
//                   <MenuItem value="individual_without_hypothecation">Individual - Without Hypothecation</MenuItem>
//                   <MenuItem value="individual_with_hypothecation">Individual - With Hypothecation</MenuItem>
//                   <MenuItem value="corporate">Corporate</MenuItem>
//                 </StyledSelect>
//               </FormControl>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth size="small">
//                 <InputLabel sx={{ color: THEME_COLORS.text.secondary }}>Finance Required</InputLabel>
//                 <StyledSelect
//                   value={formData.financeRequired}
//                   label="Finance Required"
//                   onChange={handleFormChange('financeRequired')}
//                 >
//                   <MenuItem value="no">No</MenuItem>
//                   <MenuItem value="yes">Yes</MenuItem>
//                 </StyledSelect>
//               </FormControl>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth size="small">
//                 <InputLabel sx={{ color: THEME_COLORS.text.secondary }}>Exchange Vehicle</InputLabel>
//                 <StyledSelect
//                   value={formData.exchangeVehicle}
//                   label="Exchange Vehicle"
//                   onChange={handleFormChange('exchangeVehicle')}
//                 >
//                   <MenuItem value="no">No</MenuItem>
//                   <MenuItem value="yes">Yes</MenuItem>
//                 </StyledSelect>
//               </FormControl>
//             </Grid>

//             {/* Price Display */}
//             {selectedVariantDetails && (
//               <Grid item xs={12}>
//                 <StyledPaper sx={{ p: 2, backgroundColor: THEME_COLORS.background.secondary }}>
//                   <Typography variant="subtitle2" sx={{ color: THEME_COLORS.text.secondary, mb: 1 }}>
//                     Price Summary - {selectedVariantDetails.model}
//                   </Typography>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <Typography variant="body2" sx={{ color: THEME_COLORS.text.primary }}>
//                       On-Road Price ({selectedState})
//                     </Typography>
//                     <Typography variant="h6" sx={{ color: THEME_COLORS.primary, fontWeight: 600 }}>
//                       ₹{selectedVariantDetails.onRoadPriceIndividualWithoutHypothecation.toLocaleString()}
//                     </Typography>
//                   </Box>
//                 </StyledPaper>
//               </Grid>
//             )}
            
//             <Grid item xs={12}>
//               <StyledTextField
//                 fullWidth
//                 label="Additional Notes"
//                 multiline
//                 rows={3}
//                 value={formData.notes}
//                 onChange={handleFormChange('notes')}
//                 placeholder="Any special requirements or preferences..."
//               />
//             </Grid>
//           </Grid>
//         </DialogContent>
        
//         <DialogActions sx={{ p: 3, borderTop: `1px solid ${THEME_COLORS.border}` }}>
//           <StyledButton 
//             variant="outlined" 
//             onClick={handleDialogClose}
//           >
//             Cancel
//           </StyledButton>
//           <StyledButton 
//             variant="contained" 
//             onClick={handleFormSubmit}
//             disabled={!formData.customerName || !formData.customerPhone || !formData.selectedVariant}
//           >
//             Submit Booking
//           </StyledButton>
//         </DialogActions>
//       </StyledDialog>
//     </Box>
//   );
// };

// export default VehiclePricingTable;





















import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Grid,
  TextField,
  InputAdornment,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  IconButton,
  Card,
  CardContent,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BuildIcon from '@mui/icons-material/Build';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// Theme constants
const THEME_COLORS = {
  primary: '#E56751',
  primaryHover: '#D65A45',
  success: '#4CAF50',
  background: {
    main: '#090909',
    paper: '#1A1A1A',
    secondary: '#2A1F1A',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#B8B8B8',
    tertiary: '#888888',
  },
  border: 'rgba(255, 255, 255, 0.1)',
  warning: '#FF9800',
};

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: THEME_COLORS.background.paper,
  border: `1px solid ${THEME_COLORS.border}`,
  borderRadius: '12px',
  overflow: 'hidden',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${THEME_COLORS.border}`,
  color: THEME_COLORS.text.primary,
  padding: theme.spacing(1.5),
  fontSize: '0.8rem',
}));

const StyledTableHead = styled(TableCell)(({ theme }) => ({
  backgroundColor: THEME_COLORS.background.secondary,
  borderBottom: `2px solid ${THEME_COLORS.primary}`,
  color: THEME_COLORS.text.primary,
  fontWeight: 600,
  padding: theme.spacing(1.5),
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  textAlign: 'center',
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: THEME_COLORS.background.paper,
  color: THEME_COLORS.text.primary,
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: THEME_COLORS.border,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: THEME_COLORS.primary,
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: THEME_COLORS.primary,
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: THEME_COLORS.background.paper,
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
}));

const StyledButton = styled(Button)(({ theme, variant }) => ({
  textTransform: 'none',
  fontWeight: 500,
  borderRadius: '8px',
  padding: theme.spacing(1.5, 3),
  ...(variant === 'contained' && {
    backgroundColor: THEME_COLORS.primary,
    color: 'white',
    '&:hover': {
      backgroundColor: THEME_COLORS.primaryHover,
    },
  }),
  ...(variant === 'outlined' && {
    borderColor: THEME_COLORS.border,
    color: THEME_COLORS.text.primary,
    '&:hover': {
      borderColor: THEME_COLORS.primary,
      backgroundColor: 'rgba(229, 103, 81, 0.1)',
    },
  }),
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: THEME_COLORS.background.paper,
    color: THEME_COLORS.text.primary,
    borderRadius: '12px',
    border: `1px solid ${THEME_COLORS.border}`,
    maxWidth: '900px',
    width: '100%',
  },
}));

// Vehicle Database with pricing structure and date validity
const vehicleDatabase = {
  'BOLERO': {
    fuelType: 'DIESEL',
    dataMonth: '2025-08',
    variants: [
      {
        model: 'B2 BS6.2',
        exShowroomPrice: 970001,
        taxCollection: 0,
        insurance: 35222,
        extendedWarranty: 16999,
        accessories: 15000,
        rsa: 2021,
        fastag: 500,
        registrationWithoutHypothecation: 89675,
        onRoadPriceIndividualWithoutHypothecation: 1129418,
        registrationWithHypothecation: 91175
      },
      {
        model: 'B4 BS6.2', 
        exShowroomPrice: 981400,
        taxCollection: 0,
        insurance: 37455,
        extendedWarranty: 16999,
        accessories: 15000,
        rsa: 2021,
        fastag: 500,
        registrationWithoutHypothecation: 90672,
        onRoadPriceIndividualWithoutHypothecation: 1144047,
        registrationWithHypothecation: 92172
      },
      {
        model: 'B6 BS6.2',
        exShowroomPrice: 999900,
        taxCollection: 0,
        insurance: 39841,
        extendedWarranty: 16999,
        accessories: 15000,
        rsa: 2021,
        fastag: 500,
        registrationWithoutHypothecation: 92291,
        onRoadPriceIndividualWithoutHypothecation: 1166552,
        registrationWithHypothecation: 93791
      }
    ]
  },
  'BOLERO NEO': {
    fuelType: 'DIESEL',
    dataMonth: '2025-08',
    variants: [
      {
        model: 'N4 BS6.2',
        exShowroomPrice: 1050000,
        taxCollection: 0,
        insurance: 42500,
        extendedWarranty: 16999,
        accessories: 18000,
        rsa: 2021,
        fastag: 500,
        registrationWithoutHypothecation: 95500,
        onRoadPriceIndividualWithoutHypothecation: 1225520,
        registrationWithHypothecation: 97000
      },
      {
        model: 'N8 BS6.2',
        exShowroomPrice: 1180000,
        taxCollection: 0,
        insurance: 47200,
        extendedWarranty: 16999,
        accessories: 20000,
        rsa: 2021,
        fastag: 500,
        registrationWithoutHypothecation: 106800,
        onRoadPriceIndividualWithoutHypothecation: 1373520,
        registrationWithHypothecation: 108300
      }
    ]
  },
  'MARAZZO': {
    fuelType: 'DIESEL',
    dataMonth: '2025-08',
    variants: [
      {
        model: 'M2 BS6.2',
        exShowroomPrice: 1249000,
        taxCollection: 0,
        insurance: 49960,
        extendedWarranty: 18999,
        accessories: 22000,
        rsa: 2521,
        fastag: 500,
        registrationWithoutHypothecation: 113000,
        onRoadPriceIndividualWithoutHypothecation: 1455980,
        registrationWithHypothecation: 114500
      },
      {
        model: 'M4+ BS6.2',
        exShowroomPrice: 1399000,
        taxCollection: 0,
        insurance: 55960,
        extendedWarranty: 18999,
        accessories: 25000,
        rsa: 2521,
        fastag: 500,
        registrationWithoutHypothecation: 126640,
        onRoadPriceIndividualWithoutHypothecation: 1628620,
        registrationWithHypothecation: 128140
      }
    ]
  },
  'SCORPIO-C': {
    fuelType: 'DIESEL',
    dataMonth: '2025-08',
    variants: [
      {
        model: 'S3 BS6.2',
        exShowroomPrice: 1199000,
        taxCollection: 0,
        insurance: 47960,
        extendedWarranty: 18999,
        accessories: 20000,
        rsa: 2521,
        fastag: 500,
        registrationWithoutHypothecation: 108540,
        onRoadPriceIndividualWithoutHypothecation: 1397520,
        registrationWithHypothecation: 110040
      },
      {
        model: 'S5 BS6.2',
        exShowroomPrice: 1349000,
        taxCollection: 0,
        insurance: 53960,
        extendedWarranty: 18999,
        accessories: 22000,
        rsa: 2521,
        fastag: 500,
        registrationWithoutHypothecation: 122140,
        onRoadPriceIndividualWithoutHypothecation: 1569120,
        registrationWithHypothecation: 123640
      }
    ]
  },
  'XUV700-PET': {
    fuelType: 'PETROL',
    dataMonth: '2025-08',
    variants: [
      {
        model: 'MX BS6.2',
        exShowroomPrice: 1399000,
        taxCollection: 0,
        insurance: 55960,
        extendedWarranty: 19999,
        accessories: 25000,
        rsa: 2521,
        fastag: 500,
        registrationWithoutHypothecation: 126640,
        onRoadPriceIndividualWithoutHypothecation: 1629620,
        registrationWithHypothecation: 128140
      },
      {
        model: 'AX3 BS6.2',
        exShowroomPrice: 1549000,
        taxCollection: 0,
        insurance: 61960,
        extendedWarranty: 19999,
        accessories: 28000,
        rsa: 2521,
        fastag: 500,
        registrationWithoutHypothecation: 140240,
        onRoadPriceIndividualWithoutHypothecation: 1802220,
        registrationWithHypothecation: 141740
      }
    ]
  },
  'XUV700-DSL': {
    fuelType: 'DIESEL',
    dataMonth: '2025-08',
    variants: [
      {
        model: 'MX BS6.2',
        exShowroomPrice: 1499000,
        taxCollection: 0,
        insurance: 59960,
        extendedWarranty: 19999,
        accessories: 25000,
        rsa: 2521,
        fastag: 500,
        registrationWithoutHypothecation: 135740,
        onRoadPriceIndividualWithoutHypothecation: 1742720,
        registrationWithHypothecation: 137240
      },
      {
        model: 'AX7 BS6.2',
        exShowroomPrice: 1799000,
        taxCollection: 0,
        insurance: 71960,
        extendedWarranty: 19999,
        accessories: 30000,
        rsa: 2521,
        fastag: 500,
        registrationWithoutHypothecation: 162740,
        onRoadPriceIndividualWithoutHypothecation: 2086720,
        registrationWithHypothecation: 164240
      }
    ]
  },
  'THAR-3D-DSL': {
    fuelType: 'DIESEL',
    dataMonth: '2025-08',
    variants: [
      {
        model: 'LX BS6.2',
        exShowroomPrice: 1249000,
        taxCollection: 0,
        insurance: 49960,
        extendedWarranty: 18999,
        accessories: 22000,
        rsa: 2521,
        fastag: 500,
        registrationWithoutHypothecation: 113000,
        onRoadPriceIndividualWithoutHypothecation: 1455980,
        registrationWithHypothecation: 114500
      },
      {
        model: 'LX Hard Top BS6.2',
        exShowroomPrice: 1399000,
        taxCollection: 0,
        insurance: 55960,
        extendedWarranty: 18999,
        accessories: 25000,
        rsa: 2521,
        fastag: 500,
        registrationWithoutHypothecation: 126640,
        onRoadPriceIndividualWithoutHypothecation: 1628620,
        registrationWithHypothecation: 128140
      }
    ]
  }
};

const VehiclePricingTable = () => {
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedState, setSelectedState] = useState('NEW DELHI');
  const [selectedDate, setSelectedDate] = useState('2025-08'); // Default to August 2025
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDateWarning, setShowDateWarning] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  
  // Form states for the dialog
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    selectedVariant: '',
    registrationType: 'individual_without_hypothecation',
    financeRequired: 'no',
    exchangeVehicle: 'no',
    notes: '',
  });

  const carModels = Object.keys(vehicleDatabase);
  const states = ['NEW DELHI', 'MUMBAI', 'BANGALORE', 'CHENNAI', 'PUNE', 'HYDERABAD', 'KOLKATA'];

  // Check if selected date matches data availability
  const isDataAvailableForDate = (date) => {
    return date === '2025-08'; // Only August 2025 data is available
  };

  // Get filtered variants based on search term and date filter
  const getFilteredVariants = () => {
    if (!selectedModel) return [];
    if (!isDataAvailableForDate(selectedDate)) return [];
    
    const modelData = vehicleDatabase[selectedModel];
    if (!searchTerm) return modelData.variants;
    return modelData.variants.filter(variant =>
      variant.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Handle date change
  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    
    if (!isDataAvailableForDate(newDate)) {
      setShowDateWarning(true);
      setTimeout(() => setShowDateWarning(false), 4000);
    } else {
      setShowDateWarning(false);
    }
  };

  // Handle model selection
  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
    setSearchTerm('');
    setShowSuccess(false);
  };

  // Handle add booking dialog
  const handleAddBooking = () => {
    setOpenDialog(true);
  };

  // Handle dialog close
  const handleDialogClose = () => {
    setOpenDialog(false);
    setFormData({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      customerAddress: '',
      selectedVariant: '',
      registrationType: 'individual_without_hypothecation',
      financeRequired: 'no',
      exchangeVehicle: 'no',
      notes: '',
    });
  };

  // Handle form input change
  const handleFormChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  // Handle form submission
  const handleFormSubmit = () => {
    // Validate required fields
    if (!formData.customerName || !formData.customerPhone || !formData.selectedVariant) {
      alert('Please fill in all required fields');
      return;
    }

    // Here you can integrate with your API
    console.log('Submitting booking request:', {
      ...formData,
      selectedModel,
      selectedState,
      selectedDate,
      submittedAt: new Date().toISOString()
    });

    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // Close dialog
    handleDialogClose();
  };

  const filteredVariants = getFilteredVariants();
  const selectedVariantDetails = filteredVariants.find(variant => variant.model === formData.selectedVariant);
  const dataAvailable = isDataAvailableForDate(selectedDate);

  return (
    <Box sx={{ p: 3, backgroundColor: THEME_COLORS.background.main, minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: THEME_COLORS.text.primary, fontWeight: 600, mb: 1 }}>
          Vehicle Price List & Booking
        </Typography>
        <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>
          Check on-road prices and book your vehicle
        </Typography>
      </Box>

      {/* Success Alert */}
      {showSuccess && (
        <Alert 
          severity="success" 
          sx={{ 
            mb: 3, 
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            color: THEME_COLORS.success,
            '& .MuiAlert-icon': { color: THEME_COLORS.success }
          }}
        >
          Booking request submitted successfully!
        </Alert>
      )}

      {/* Date Warning Alert */}
      {showDateWarning && (
        <Alert 
          severity="warning" 
          sx={{ 
            mb: 3, 
            backgroundColor: 'rgba(255, 152, 0, 0.1)',
            color: THEME_COLORS.warning,
            '& .MuiAlert-icon': { color: THEME_COLORS.warning }
          }}
        >
          No data available for the selected month. Pricing data is only available for August 2025.
        </Alert>
      )}

      {/* Controls */}
      <StyledPaper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="end">
          {/* Date Filter */}
          <Grid item xs={12} md={2.4}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: THEME_COLORS.text.secondary }}>Price Month</InputLabel>
              <StyledSelect
                value={selectedDate}
                label="Price Month"
                onChange={handleDateChange}
              >
                <MenuItem value="2025-08">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarTodayIcon sx={{ color: THEME_COLORS.primary, fontSize: '1rem' }} />
                    August 2025
                  </Box>
                </MenuItem>
                <MenuItem value="2025-07">July 2025</MenuItem>
                <MenuItem value="2025-09">September 2025</MenuItem>
                <MenuItem value="2025-10">October 2025</MenuItem>
              </StyledSelect>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2.4}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: THEME_COLORS.text.secondary }}>Select Model</InputLabel>
              <StyledSelect
                value={selectedModel}
                label="Select Model"
                onChange={handleModelChange}
                disabled={!dataAvailable}
              >
                <MenuItem value="">Select Model</MenuItem>
                {carModels.map((model) => (
                  <MenuItem key={model} value={model}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <DirectionsCarIcon sx={{ color: THEME_COLORS.primary, fontSize: '1rem' }} />
                      {model}
                    </Box>
                  </MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2.4}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: THEME_COLORS.text.secondary }}>State</InputLabel>
              <StyledSelect
                value={selectedState}
                label="State"
                onChange={(e) => setSelectedState(e.target.value)}
                disabled={!dataAvailable}
              >
                {states.map((state) => (
                  <MenuItem key={state} value={state}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOnIcon sx={{ color: THEME_COLORS.primary, fontSize: '1rem' }} />
                      {state}
                    </Box>
                  </MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={2.4}>
            <StyledTextField
              fullWidth
              size="small"
              label="Search Variants"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={!selectedModel || !dataAvailable}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: THEME_COLORS.text.secondary }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        {/* Data Status Indicator */}
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip 
            icon={<CalendarTodayIcon />}
            label={dataAvailable ? `Data Available: ${selectedDate}` : `No Data: ${selectedDate}`}
            size="small"
            sx={{ 
              backgroundColor: dataAvailable ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 152, 0, 0.2)',
              color: dataAvailable ? THEME_COLORS.success : THEME_COLORS.warning
            }}
          />
        </Box>

        {/* Model Info Card */}
        {selectedModel && dataAvailable && (
          <Card sx={{ 
            mt: 3, 
            backgroundColor: THEME_COLORS.background.secondary,
            border: `1px solid ${THEME_COLORS.border}`
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <DirectionsCarIcon sx={{ color: THEME_COLORS.primary, fontSize: '2rem' }} />
                <Box>
                  <Typography variant="h6" sx={{ color: THEME_COLORS.text.primary, fontWeight: 600 }}>
                    {selectedModel}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Chip 
                      icon={<LocalGasStationIcon />}
                      label={vehicleDatabase[selectedModel]?.fuelType}
                      size="small"
                      sx={{ 
                        backgroundColor: 'rgba(229, 103, 81, 0.2)',
                        color: THEME_COLORS.primary
                      }}
                    />
                    <Chip 
                      icon={<LocationOnIcon />}
                      label={selectedState}
                      size="small"
                      sx={{ 
                        backgroundColor: 'rgba(229, 103, 81, 0.2)',
                        color: THEME_COLORS.primary
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}
      </StyledPaper>

      {/* Pricing Table or No Data State */}
      {!dataAvailable ? (
        <StyledPaper sx={{ p: 4, textAlign: 'center' }}>
          <CalendarTodayIcon sx={{ fontSize: 48, color: THEME_COLORS.text.tertiary, mb: 2 }} />
          <Typography variant="h6" sx={{ color: THEME_COLORS.text.primary, mb: 1 }}>
            No Data Found
          </Typography>
          <Typography variant="body1" sx={{ color: THEME_COLORS.text.secondary, mb: 2 }}>
            Pricing data is not available for {selectedDate}
          </Typography>
          <Typography variant="body2" sx={{ color: THEME_COLORS.text.tertiary }}>
            Please select August 2025 to view available vehicle pricing
          </Typography>
        </StyledPaper>
      ) : selectedModel ? (
        filteredVariants.length > 0 ? (
          <StyledPaper>
            <Box sx={{ p: 2, borderBottom: `1px solid ${THEME_COLORS.border}` }}>
              <Typography variant="h6" sx={{ color: THEME_COLORS.text.primary, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <BuildIcon sx={{ color: THEME_COLORS.primary }} />
                {selectedModel} - Price Breakdown ({selectedState}) - {selectedDate}
              </Typography>
            </Box>
            <TableContainer>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <StyledTableHead sx={{ minWidth: '120px' }}>Model & Variant</StyledTableHead>
                    <StyledTableHead sx={{ minWidth: '100px' }}>Ex-showroom Price</StyledTableHead>
                    <StyledTableHead sx={{ minWidth: '80px' }}>Tax Collection</StyledTableHead>
                    <StyledTableHead sx={{ minWidth: '100px' }}>Insurance (1 year)</StyledTableHead>
                    <StyledTableHead sx={{ minWidth: '100px' }}>Extended Warranty</StyledTableHead>
                    <StyledTableHead sx={{ minWidth: '120px' }}>Registration without Hypothecation</StyledTableHead>
                    <StyledTableHead sx={{ minWidth: '120px' }}>On Road Price without Hypothecation</StyledTableHead>
                    <StyledTableHead sx={{ minWidth: '120px' }}>Registration with Hypothecation</StyledTableHead>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredVariants.map((variant, index) => (
                    <TableRow 
                      key={variant.model}
                      sx={{ 
                        '&:hover': { backgroundColor: 'rgba(229, 103, 81, 0.05)' },
                        backgroundColor: index % 2 === 0 ? THEME_COLORS.background.main : 'transparent'
                      }}
                    >
                      <StyledTableCell sx={{ fontWeight: 600, color: THEME_COLORS.primary }}>
                        {variant.model}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        ₹{variant.exShowroomPrice.toLocaleString()}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        ₹{variant.taxCollection}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        ₹{variant.insurance.toLocaleString()}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        ₹{variant.extendedWarranty.toLocaleString()}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        ₹{variant.registrationWithoutHypothecation.toLocaleString()}
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ fontWeight: 600, color: THEME_COLORS.primary }}>
                        ₹{variant.onRoadPriceIndividualWithoutHypothecation.toLocaleString()}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        ₹{variant.registrationWithHypothecation.toLocaleString()}
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </StyledPaper>
        ) : (
          <StyledPaper sx={{ p: 4, textAlign: 'center' }}>
            <SearchIcon sx={{ fontSize: 48, color: THEME_COLORS.text.tertiary, mb: 2 }} />
            <Typography variant="body1" sx={{ color: THEME_COLORS.text.secondary }}>
              No variants found for "{searchTerm}"
            </Typography>
          </StyledPaper>
        )
      ) : (
        <StyledPaper sx={{ p: 4, textAlign: 'center' }}>
          <DirectionsCarIcon sx={{ fontSize: 48, color: THEME_COLORS.text.tertiary, mb: 2 }} />
          <Typography variant="body1" sx={{ color: THEME_COLORS.text.secondary }}>
            Please select a car model to view pricing details
          </Typography>
        </StyledPaper>
      )}

      {/* Booking Dialog */}
      <StyledDialog 
        open={openDialog} 
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: `1px solid ${THEME_COLORS.border}`,
          pb: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ShoppingCartIcon sx={{ color: THEME_COLORS.primary }} />
            <Typography variant="h6" sx={{ color: THEME_COLORS.text.primary, fontWeight: 600 }}>
              Book Vehicle - {selectedModel}
            </Typography>
          </Box>
          <IconButton 
            onClick={handleDialogClose}
            sx={{ color: THEME_COLORS.text.secondary }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            {/* Customer Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ color: THEME_COLORS.primary, fontWeight: 600, mb: 2 }}>
                Customer Information
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Customer Name *"
                value={formData.customerName}
                onChange={handleFormChange('customerName')}
                size="small"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Phone Number *"
                value={formData.customerPhone}
                onChange={handleFormChange('customerPhone')}
                size="small"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.customerEmail}
                onChange={handleFormChange('customerEmail')}
                size="small"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Address"
                value={formData.customerAddress}
                onChange={handleFormChange('customerAddress')}
                size="small"
              />
            </Grid>

            {/* Vehicle Selection */}
            <Grid item xs={12}>
              <Divider sx={{ borderColor: THEME_COLORS.border, my: 2 }} />
              <Typography variant="subtitle1" sx={{ color: THEME_COLORS.primary, fontWeight: 600, mb: 2 }}>
                Vehicle Details
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: THEME_COLORS.text.secondary }}>Select Variant *</InputLabel>
                <StyledSelect
                  value={formData.selectedVariant}
                  label="Select Variant *"
                  onChange={handleFormChange('selectedVariant')}
                >
                  <MenuItem value="">Choose Variant</MenuItem>
                  {filteredVariants.map((variant) => (
                    <MenuItem key={variant.model} value={variant.model}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {variant.model}
                        </Typography>
                        <Typography variant="caption" sx={{ color: THEME_COLORS.text.secondary }}>
                          ₹{variant.onRoadPriceIndividualWithoutHypothecation.toLocaleString()}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </StyledSelect>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: THEME_COLORS.text.secondary }}>Registration Type</InputLabel>
                <StyledSelect
                  value={formData.registrationType}
                  label="Registration Type"
                  onChange={handleFormChange('registrationType')}
                >
                  <MenuItem value="individual_without_hypothecation">Individual - Without Hypothecation</MenuItem>
                  <MenuItem value="individual_with_hypothecation">Individual - With Hypothecation</MenuItem>
                  <MenuItem value="corporate">Corporate</MenuItem>
                </StyledSelect>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: THEME_COLORS.text.secondary }}>Finance Required</InputLabel>
                <StyledSelect
                  value={formData.financeRequired}
                  label="Finance Required"
                  onChange={handleFormChange('financeRequired')}
                >
                  <MenuItem value="no">No</MenuItem>
                  <MenuItem value="yes">Yes</MenuItem>
                </StyledSelect>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: THEME_COLORS.text.secondary }}>Exchange Vehicle</InputLabel>
                <StyledSelect
                  value={formData.exchangeVehicle}
                  label="Exchange Vehicle"
                  onChange={handleFormChange('exchangeVehicle')}
                >
                  <MenuItem value="no">No</MenuItem>
                  <MenuItem value="yes">Yes</MenuItem>
                </StyledSelect>
              </FormControl>
            </Grid>

            {/* Price Display */}
            {selectedVariantDetails && (
              <Grid item xs={12}>
                <StyledPaper sx={{ p: 2, backgroundColor: THEME_COLORS.background.secondary }}>
                  <Typography variant="subtitle2" sx={{ color: THEME_COLORS.text.secondary, mb: 1 }}>
                    Price Summary - {selectedVariantDetails.model}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: THEME_COLORS.text.primary }}>
                      On-Road Price ({selectedState})
                    </Typography>
                    <Typography variant="h6" sx={{ color: THEME_COLORS.primary, fontWeight: 600 }}>
                      ₹{selectedVariantDetails.onRoadPriceIndividualWithoutHypothecation.toLocaleString()}
                    </Typography>
                  </Box>
                </StyledPaper>
              </Grid>
            )}
            
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Additional Notes"
                multiline
                rows={3}
                value={formData.notes}
                onChange={handleFormChange('notes')}
                placeholder="Any special requirements or preferences..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, borderTop: `1px solid ${THEME_COLORS.border}` }}>
          <StyledButton 
            variant="outlined" 
            onClick={handleDialogClose}
          >
            Cancel
          </StyledButton>
          <StyledButton 
            variant="contained" 
            onClick={handleFormSubmit}
            disabled={!formData.customerName || !formData.customerPhone || !formData.selectedVariant}
          >
            Submit Booking
          </StyledButton>
        </DialogActions>
      </StyledDialog>
    </Box>
  );
};

export default VehiclePricingTable;
