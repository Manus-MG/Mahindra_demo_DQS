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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BuildIcon from '@mui/icons-material/Build';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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
  padding: theme.spacing(2),
}));

const StyledTableHead = styled(TableCell)(({ theme }) => ({
  backgroundColor: THEME_COLORS.background.secondary,
  borderBottom: `2px solid ${THEME_COLORS.primary}`,
  color: THEME_COLORS.text.primary,
  fontWeight: 600,
  padding: theme.spacing(2),
  fontSize: '0.875rem',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
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
  '& .MuiSelect-icon': {
    color: THEME_COLORS.text.secondary,
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
    maxWidth: '800px',
    width: '100%',
  },
}));

// Accessories Database with date validity
const accessoriesDatabase = {
  'SCORPIO-N': {
    dataMonth: '2025-08',
    accessories: [
      { partNo: 'AZ00129', description: 'Front & Rear Bumper Add On Kit', price: 6640, category: 'Front & Rear Bumper Add On' },
      { partNo: 'AZ00045', description: 'Front Bumper Add On', price: 2774, category: 'Front & Rear Bumper Add On' },
      { partNo: 'AZ00028', description: 'Rear Bumper Add On', price: 4046, category: 'Front & Rear Bumper Add On' },
      { partNo: 'AZ00116', description: 'Intense Chrome Kit', price: 19800, category: 'Intense Chrome Kit' },
      { partNo: 'AZ00080', description: 'OE - Front Upper Grille Bezel Upper', price: 2310, category: 'Chrome Add On' },
      { partNo: 'AZ00081', description: 'OE - Front Signature Grille Element', price: 2312, category: 'Chrome Add On' },
      { partNo: 'AZ00113', description: 'OE Waistline Chrome Set', price: 5824, category: 'Chrome Add On' },
      { partNo: 'AZ00011', description: 'Rear Quarter Applique Set - (2 pc)', price: 3006, category: 'Chrome Add On' },
    ]
  },
  'XUV700': {
    dataMonth: '2025-08',
    accessories: [
      { partNo: 'XUV001', description: 'Front Skid Plate', price: 8500, category: 'Exterior Styling' },
      { partNo: 'XUV002', description: 'Rear Skid Plate', price: 7200, category: 'Exterior Styling' },
      { partNo: 'XUV003', description: 'Side Step (Set of 2)', price: 12400, category: 'Exterior Styling' },
      { partNo: 'XUV010', description: 'Chrome Door Handle Set', price: 4500, category: 'Chrome Accessories' },
      { partNo: 'XUV011', description: 'Chrome Mirror Cover Set', price: 3200, category: 'Chrome Accessories' },
      { partNo: 'XUV012', description: 'Chrome Fog Lamp Bezel Set', price: 2800, category: 'Chrome Accessories' },
      { partNo: 'XUV020', description: 'Premium Floor Mats Set', price: 5500, category: 'Interior Accessories' },
      { partNo: 'XUV021', description: 'Dashboard Cover', price: 3500, category: 'Interior Accessories' },
      { partNo: 'XUV022', description: 'Seat Back Organizer', price: 2200, category: 'Interior Accessories' },
    ]
  },
  'BOLERO': {
    dataMonth: '2025-08',
    accessories: [
      { partNo: 'BOL001', description: 'Bumper Guard Front', price: 3200, category: 'Protection Kit' },
      { partNo: 'BOL002', description: 'Bumper Guard Rear', price: 2800, category: 'Protection Kit' },
      { partNo: 'BOL003', description: 'Door Edge Guard Set', price: 1500, category: 'Protection Kit' },
      { partNo: 'BOL010', description: 'Roof Carrier', price: 8900, category: 'Utility Accessories' },
      { partNo: 'BOL011', description: 'Tailgate Step', price: 4200, category: 'Utility Accessories' },
      { partNo: 'BOL012', description: 'Mud Flaps Set', price: 2400, category: 'Utility Accessories' },
    ]
  },
  'THAR': {
    dataMonth: '2025-08',
    accessories: [
      { partNo: 'THR001', description: 'Hard Top', price: 85000, category: 'Roof Accessories' },
      { partNo: 'THR002', description: 'Soft Top', price: 45000, category: 'Roof Accessories' },
      { partNo: 'THR003', description: 'Roll Bar', price: 25000, category: 'Safety Accessories' },
      { partNo: 'THR010', description: 'Rock Sliders', price: 18500, category: 'Protection Kit' },
      { partNo: 'THR011', description: 'Winch Mount Plate', price: 12000, category: 'Utility Accessories' },
      { partNo: 'THR012', description: 'Adventure Kit', price: 35000, category: 'Adventure Package' },
    ]
  },
};

const AccessoriesTable = () => {
  const [selectedModel, setSelectedModel] = useState('');
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
    vehicleNumber: '',
    selectedAccessory: '',
    quantity: 1,
    notes: '',
  });

  const carModels = Object.keys(accessoriesDatabase);

  // Check if selected date matches data availability
  const isDataAvailableForDate = (date) => {
    return date === '2025-08'; // Only August 2025 data is available
  };

  // Get filtered accessories based on search term and date filter
  const getFilteredAccessories = () => {
    if (!selectedModel) return [];
    if (!isDataAvailableForDate(selectedDate)) return [];
    
    const modelData = accessoriesDatabase[selectedModel];
    if (!searchTerm) return modelData.accessories;
    return modelData.accessories.filter(item =>
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.partNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
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

  // Handle add accessories dialog
  const handleAddAccessories = () => {
    setOpenDialog(true);
  };

  // Handle dialog close
  const handleDialogClose = () => {
    setOpenDialog(false);
    setFormData({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      vehicleNumber: '',
      selectedAccessory: '',
      quantity: 1,
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
    if (!formData.customerName || !formData.customerPhone || !formData.selectedAccessory) {
      alert('Please fill in all required fields');
      return;
    }

    // Here you can integrate with your API
    console.log('Submitting accessory request:', {
      ...formData,
      selectedModel,
      selectedDate,
      submittedAt: new Date().toISOString()
    });

    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // Close dialog
    handleDialogClose();
  };

  const filteredAccessories = getFilteredAccessories();
  const selectedAccessoryDetails = filteredAccessories.find(acc => acc.partNo === formData.selectedAccessory);
  const dataAvailable = isDataAvailableForDate(selectedDate);

  return (
    <Box sx={{ p: 3, backgroundColor: THEME_COLORS.background.main, minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: THEME_COLORS.text.primary, fontWeight: 600, mb: 1 }}>
          Vehicle Accessories Price List
        </Typography>
        <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>
          Select accessories to add to your quotation
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
          Accessory request submitted successfully!
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
          No accessories data available for the selected month. Data is only available for August 2025.
        </Alert>
      )}

      {/* Controls */}
      <StyledPaper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="end">
          {/* Date Filter */}
          <Grid item xs={12} md={3}>
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

          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: THEME_COLORS.text.secondary }}>Select Car Model</InputLabel>
              <StyledSelect
                value={selectedModel}
                label="Select Car Model"
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
          
          <Grid item xs={12} md={3}>
            <StyledTextField
              fullWidth
              size="small"
              label="Search Accessories"
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
      </StyledPaper>

      {/* Accessories Table or No Data State */}
      {!dataAvailable ? (
        <StyledPaper sx={{ p: 4, textAlign: 'center' }}>
          <CalendarTodayIcon sx={{ fontSize: 48, color: THEME_COLORS.text.tertiary, mb: 2 }} />
          <Typography variant="h6" sx={{ color: THEME_COLORS.text.primary, mb: 1 }}>
            No Data Found
          </Typography>
          <Typography variant="body1" sx={{ color: THEME_COLORS.text.secondary, mb: 2 }}>
            Accessories data is not available for {selectedDate}
          </Typography>
          <Typography variant="body2" sx={{ color: THEME_COLORS.text.tertiary }}>
            Please select August 2025 to view available accessories pricing
          </Typography>
        </StyledPaper>
      ) : selectedModel ? (
        filteredAccessories.length > 0 ? (
          <StyledPaper>
            <Box sx={{ p: 3, borderBottom: `1px solid ${THEME_COLORS.border}` }}>
              <Typography variant="h6" sx={{ color: THEME_COLORS.text.primary, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <BuildIcon sx={{ color: THEME_COLORS.primary }} />
                {selectedModel} ACCESSORIES PRICE LIST - {selectedDate}
              </Typography>
              {searchTerm && (
                <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary, mt: 1 }}>
                  Showing {filteredAccessories.length} results for "{searchTerm}"
                </Typography>
              )}
            </Box>
            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <StyledTableHead sx={{ width: '120px' }}>P. NO.</StyledTableHead>
                    <StyledTableHead>PART DESCRIPTION</StyledTableHead>
                    <StyledTableHead sx={{ width: '150px' }}>CATEGORY</StyledTableHead>
                    <StyledTableHead sx={{ width: '120px' }} align="right">PRICE (₹)</StyledTableHead>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAccessories.map((accessory, index) => (
                    <TableRow 
                      key={accessory.partNo}
                      sx={{ 
                        '&:hover': { backgroundColor: 'rgba(229, 103, 81, 0.05)' },
                        backgroundColor: index % 2 === 0 ? THEME_COLORS.background.main : 'transparent'
                      }}
                    >
                      <StyledTableCell>
                        <Typography variant="body2" sx={{ 
                          fontFamily: 'monospace', 
                          color: THEME_COLORS.text.secondary,
                          fontWeight: 500
                        }}>
                          {accessory.partNo}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography variant="body2" sx={{ color: THEME_COLORS.text.primary, fontWeight: 500 }}>
                          {accessory.description}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Chip 
                          label={accessory.category} 
                          size="small" 
                          sx={{ 
                            backgroundColor: 'rgba(229, 103, 81, 0.2)',
                            color: THEME_COLORS.primary,
                            fontSize: '0.7rem',
                            height: '24px'
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Typography variant="body2" sx={{ fontWeight: 600, color: THEME_COLORS.primary, fontSize: '0.95rem' }}>
                          ₹{accessory.price.toLocaleString()}
                        </Typography>
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
              No accessories found for "{searchTerm}"
            </Typography>
          </StyledPaper>
        )
      ) : (
        <StyledPaper sx={{ p: 4, textAlign: 'center' }}>
          <DirectionsCarIcon sx={{ fontSize: 48, color: THEME_COLORS.text.tertiary, mb: 2 }} />
          <Typography variant="body1" sx={{ color: THEME_COLORS.text.secondary }}>
            Please select a car model to view available accessories
          </Typography>
        </StyledPaper>
      )}

      {/* Add Accessory Dialog */}
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
              Add Accessory Request - {selectedModel}
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
                label="Vehicle Number"
                value={formData.vehicleNumber}
                onChange={handleFormChange('vehicleNumber')}
                size="small"
              />
            </Grid>

            {/* Accessory Selection */}
            <Grid item xs={12}>
              <Divider sx={{ borderColor: THEME_COLORS.border, my: 2 }} />
              <Typography variant="subtitle1" sx={{ color: THEME_COLORS.primary, fontWeight: 600, mb: 2 }}>
                Accessory Details
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: THEME_COLORS.text.secondary }}>Select Accessory *</InputLabel>
                <StyledSelect
                  value={formData.selectedAccessory}
                  label="Select Accessory *"
                  onChange={handleFormChange('selectedAccessory')}
                >
                  <MenuItem value="">Choose Accessory</MenuItem>
                  {filteredAccessories.map((accessory) => (
                    <MenuItem key={accessory.partNo} value={accessory.partNo}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {accessory.partNo} - {accessory.description}
                        </Typography>
                        <Typography variant="caption" sx={{ color: THEME_COLORS.text.secondary }}>
                          ₹{accessory.price.toLocaleString()} - {accessory.category}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </StyledSelect>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <StyledTextField
                fullWidth
                label="Quantity"
                type="number"
                value={formData.quantity}
                onChange={handleFormChange('quantity')}
                inputProps={{ min: 1 }}
                size="small"
              />
            </Grid>

            {/* Price Display */}
            {selectedAccessoryDetails && (
              <Grid item xs={12}>
                <StyledPaper sx={{ p: 2, backgroundColor: THEME_COLORS.background.secondary }}>
                  <Typography variant="subtitle2" sx={{ color: THEME_COLORS.text.secondary, mb: 1 }}>
                    Price Summary
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: THEME_COLORS.text.primary }}>
                      {selectedAccessoryDetails.description} × {formData.quantity}
                    </Typography>
                    <Typography variant="h6" sx={{ color: THEME_COLORS.primary, fontWeight: 600 }}>
                      ₹{(selectedAccessoryDetails.price * formData.quantity).toLocaleString()}
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
                placeholder="Any special requirements or installation preferences..."
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
            disabled={!formData.customerName || !formData.customerPhone || !formData.selectedAccessory}
          >
            Submit Request
          </StyledButton>
        </DialogActions>
      </StyledDialog>
    </Box>
  );
};

export default AccessoriesTable;
