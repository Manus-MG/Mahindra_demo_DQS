import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Percent as PercentIcon,
  CalendarToday as CalendarTodayIcon,
} from '@mui/icons-material';

// Theme colors matching the image
const THEME_COLORS = {
  background: {
    main: '#0a0a0a',
    paper: '#1a1a1a',
    secondary: '#2a2a2a',
  },
  text: {
    primary: '#ffffff',
    secondary: '#b0b0b0',
    muted: '#808080',
  },
  accent: {
    primary: '#ff6b47',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
  },
  border: 'rgba(255, 255, 255, 0.1)',
};

// Styled Components
const DiscountContainer = styled(Box)({
  backgroundColor: THEME_COLORS.background.main,
  minHeight: '100vh',
  padding: '24px',
  color: THEME_COLORS.text.primary,
});

const HeaderSection = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '32px',
  gap: '16px',
});

const UploadButton = styled(Button)({
  backgroundColor: THEME_COLORS.accent.primary,
  color: 'white',
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: '8px',
  padding: '12px 24px',
  fontSize: '0.875rem',
  '&:hover': {
    backgroundColor: '#e55a3c',
  },
});

const StyledTableContainer = styled(TableContainer)({
  backgroundColor: THEME_COLORS.background.paper,
  borderRadius: '12px',
  border: `1px solid ${THEME_COLORS.border}`,
  '& .MuiTable-root': {
    '& .MuiTableHead-root': {
      '& .MuiTableCell-head': {
        backgroundColor: THEME_COLORS.background.secondary,
        color: THEME_COLORS.text.primary,
        fontWeight: 600,
        fontSize: '0.875rem',
        borderBottom: `1px solid ${THEME_COLORS.border}`,
        padding: '16px',
      },
    },
    '& .MuiTableBody-root': {
      '& .MuiTableRow-root': {
        '&:hover': {
          backgroundColor: 'rgba(255, 107, 71, 0.05)',
        },
        '& .MuiTableCell-body': {
          color: THEME_COLORS.text.primary,
          borderBottom: `1px solid ${THEME_COLORS.border}`,
          padding: '16px',
          fontSize: '0.875rem',
        },
      },
    },
  },
});

const StatusChip = styled(Chip)(({ status }) => ({
  fontSize: '0.75rem',
  fontWeight: 600,
  borderRadius: '16px',
  minWidth: '80px',
  height: '28px',
  ...(status === 'Active' && {
    backgroundColor: THEME_COLORS.accent.success,
    color: 'white',
  }),
  ...(status === 'Inactive' && {
    backgroundColor: THEME_COLORS.text.muted,
    color: 'white',
  }),
  ...(status === 'Expired' && {
    backgroundColor: THEME_COLORS.accent.error,
    color: 'white',
  }),
}));

const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    backgroundColor: THEME_COLORS.background.paper,
    border: `1px solid ${THEME_COLORS.border}`,
    borderRadius: '12px',
    minWidth: '500px',
  },
  '& .MuiDialogTitle-root': {
    color: THEME_COLORS.text.primary,
    backgroundColor: THEME_COLORS.background.secondary,
    borderBottom: `1px solid ${THEME_COLORS.border}`,
  },
  '& .MuiDialogContent-root': {
    backgroundColor: THEME_COLORS.background.paper,
    color: THEME_COLORS.text.primary,
  },
  '& .MuiDialogActions-root': {
    backgroundColor: THEME_COLORS.background.paper,
    borderTop: `1px solid ${THEME_COLORS.border}`,
  },
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: THEME_COLORS.background.secondary,
    color: THEME_COLORS.text.primary,
    '& fieldset': {
      borderColor: THEME_COLORS.border,
    },
    '&:hover fieldset': {
      borderColor: THEME_COLORS.accent.primary,
    },
    '&.Mui-focused fieldset': {
      borderColor: THEME_COLORS.accent.primary,
    },
  },
  '& .MuiInputLabel-root': {
    color: THEME_COLORS.text.secondary,
    '&.Mui-focused': {
      color: THEME_COLORS.accent.primary,
    },
  },
});

const StyledSelect = styled(Select)({
  backgroundColor: THEME_COLORS.background.secondary,
  color: THEME_COLORS.text.primary,
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: THEME_COLORS.border,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: THEME_COLORS.accent.primary,
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: THEME_COLORS.accent.primary,
  },
  '& .MuiSelect-icon': {
    color: THEME_COLORS.text.secondary,
  },
});

const DiscountSchemesManagement = () => {
  const [selectedDate, setSelectedDate] = useState('2025-09'); // Default to September 2025
  const [showDateWarning, setShowDateWarning] = useState(false);
  
  // September 2025 discount schemes data based on the image
  const [discountSchemes, setDiscountSchemes] = useState([
    {
      id: 1,
      ro: 'Delhi 1',
      group: 'BOLERO',
      model: 'B4',
      grossMM: 73000,
      dealerContribution: 30000,
      totalAmount: 103000,
      cashDiscount: 103000,
      schemeName: 'sep2025',
      region: 'Delhi NCR',
      status: 'Active',
      validityPeriod: '1/9/2025 to 30/9/2025',
      uploadedBy: 'BANKSAE-SEP-4289F-A9D0-990277947f6a',
      created: '1/9/2025',
      discountType: 'Fixed Amount',
      description: 'September special discount for Bolero B4',
    },
    {
      id: 2,
      ro: 'Delhi 1',
      group: 'BOLERO',
      model: 'B6',
      grossMM: 75000,
      dealerContribution: 30000,
      totalAmount: 105000,
      cashDiscount: 105000,
      schemeName: 'sep2025',
      region: 'Delhi NCR',
      status: 'Active',
      validityPeriod: '1/9/2025 to 30/9/2025',
      uploadedBy: 'BANKSAE-SEP-4289F-A9D0-990277947f6a',
      created: '1/9/2025',
      discountType: 'Fixed Amount',
      description: 'September special discount for Bolero B6',
    },
    {
      id: 3,
      ro: 'Delhi 1',
      group: 'BOLERO',
      model: 'B6 (O)',
      grossMM: 93000,
      dealerContribution: 30000,
      totalAmount: 123000,
      cashDiscount: 123000,
      schemeName: 'sep2025',
      region: 'Delhi NCR',
      status: 'Active',
      validityPeriod: '1/9/2025 to 30/9/2025',
      uploadedBy: 'BANKSAE-SEP-4289F-A9D0-990277947f6a',
      created: '1/9/2025',
      discountType: 'Fixed Amount',
      description: 'September special discount for Bolero B6 (O)',
    },
    {
      id: 4,
      ro: 'Delhi 1',
      group: 'BOLERO Neo',
      model: 'N4',
      grossMM: 75000,
      dealerContribution: 30000,
      totalAmount: 105000,
      cashDiscount: 105000,
      schemeName: 'sep2025',
      region: 'Delhi NCR',
      status: 'Active',
      validityPeriod: '1/9/2025 to 30/9/2025',
      uploadedBy: 'BANKSAE-SEP-4289F-A9D0-990277947f6a',
      created: '1/9/2025',
      discountType: 'Fixed Amount',
      description: 'September special discount for Bolero Neo N4',
    },
    {
      id: 5,
      ro: 'Delhi 1',
      group: 'BOLERO Neo',
      model: 'N8',
      grossMM: 82000,
      dealerContribution: 30000,
      totalAmount: 112000,
      cashDiscount: 112000,
      schemeName: 'sep2025',
      region: 'Delhi NCR',
      status: 'Active',
      validityPeriod: '1/9/2025 to 30/9/2025',
      uploadedBy: 'BANKSAE-SEP-4289F-A9D0-990277947f6a',
      created: '1/9/2025',
      discountType: 'Fixed Amount',
      description: 'September special discount for Bolero Neo N8',
    },
    {
      id: 6,
      ro: 'Delhi 1',
      group: 'BOLERO Neo',
      model: 'N10-R & N10 OPT',
      grossMM: 100000,
      dealerContribution: 30000,
      totalAmount: 130000,
      cashDiscount: 130000,
      schemeName: 'sep2025',
      region: 'Delhi NCR',
      status: 'Active',
      validityPeriod: '1/9/2025 to 30/9/2025',
      uploadedBy: 'BANKSAE-SEP-4289F-A9D0-990277947f6a',
      created: '1/9/2025',
      discountType: 'Fixed Amount',
      description: 'September special discount for Bolero Neo N10-R & N10 OPT',
    },
    {
      id: 7,
      ro: 'Delhi 1',
      group: 'BOLERO Neo',
      model: 'P4',
      grossMM: 65000,
      dealerContribution: 20000,
      totalAmount: 85000,
      cashDiscount: 85000,
      schemeName: 'sep2025',
      region: 'Delhi NCR',
      status: 'Active',
      validityPeriod: '1/9/2025 to 30/9/2025',
      uploadedBy: 'BANKSAE-SEP-4289F-A9D0-990277947f6a',
      created: '1/9/2025',
      discountType: 'Fixed Amount',
      description: 'September special discount for Bolero Neo P4',
    },
    {
      id: 8,
      ro: 'Delhi 1',
      group: 'BOLERO Neo',
      model: 'P4 AMBULANCE',
      grossMM: 100000,
      dealerContribution: 20000,
      totalAmount: 120000,
      cashDiscount: 120000,
      schemeName: 'sep2025',
      region: 'Delhi NCR',
      status: 'Active',
      validityPeriod: '1/9/2025 to 30/9/2025',
      uploadedBy: 'BANKSAE-SEP-4289F-A9D0-990277947f6a',
      created: '1/9/2025',
      discountType: 'Fixed Amount',
      description: 'September special discount for Bolero Neo P4 AMBULANCE',
    },
    {
      id: 9,
      ro: 'Delhi 1',
      group: 'BOLERO Neo',
      model: 'P10',
      grossMM: 70000,
      dealerContribution: 20000,
      totalAmount: 90000,
      cashDiscount: 90000,
      schemeName: 'sep2025',
      region: 'Delhi NCR',
      status: 'Active',
      validityPeriod: '1/9/2025 to 30/9/2025',
      uploadedBy: 'BANKSAE-SEP-4289F-A9D0-990277947f6a',
      created: '1/9/2025',
      discountType: 'Fixed Amount',
      description: 'September special discount for Bolero Neo P10',
    },
    {
      id: 10,
      ro: 'Delhi 1',
      group: 'Marazzo',
      model: 'M2, M4+ & M6+',
      grossMM: 300000,
      dealerContribution: 0,
      totalAmount: 300000,
      cashDiscount: 300000,
      schemeName: 'sep2025',
      region: 'Delhi NCR',
      status: 'Active',
      validityPeriod: '1/9/2025 to 30/9/2025',
      uploadedBy: 'BANKSAE-SEP-4289F-A9D0-990277947f6a',
      created: '1/9/2025',
      discountType: 'Fixed Amount',
      description: 'September special discount for Marazzo M2, M4+ & M6+',
    },
    {
      id: 11,
      ro: 'Delhi 1',
      group: 'Scorpio',
      model: 'Classic S - New',
      grossMM: 75000,
      dealerContribution: 30000,
      totalAmount: 105000,
      cashDiscount: 105000,
      schemeName: 'sep2025',
      region: 'Delhi NCR',
      status: 'Active',
      validityPeriod: '1/9/2025 to 30/9/2025',
      uploadedBy: 'BANKSAE-SEP-4289F-A9D0-990277947f6a',
      created: '1/9/2025',
      discountType: 'Fixed Amount',
      description: 'September special discount for Scorpio Classic S - New',
    },
    {
      id: 12,
      ro: 'Delhi 1',
      group: 'Scorpio',
      model: 'Classic S9 - New',
      grossMM: 50000,
      dealerContribution: 50000,
      totalAmount: 100000,
      cashDiscount: 100000,
      schemeName: 'sep2025',
      region: 'Delhi NCR',
      status: 'Active',
      validityPeriod: '1/9/2025 to 30/9/2025',
      uploadedBy: 'BANKSAE-SEP-4289F-A9D0-990277947f6a',
      created: '1/9/2025',
      discountType: 'Fixed Amount',
      description: 'September special discount for Scorpio Classic S9 - New',
    },
    {
      id: 13,
      ro: 'Delhi 1',
      group: 'Scorpio-N',
      model: 'Z2 D MT 2WD 7 STR - E BS6.2 - New',
      grossMM: 42000,
      dealerContribution: 40000,
      totalAmount: 82000,
      cashDiscount: 82000,
      schemeName: 'sep2025',
      region: 'Delhi NCR',
      status: 'Active',
      validityPeriod: '1/9/2025 to 30/9/2025',
      uploadedBy: 'BANKSAE-SEP-4289F-A9D0-990277947f6a',
      created: '1/9/2025',
      discountType: 'Fixed Amount',
      description: 'September special discount for Scorpio-N Z2 D MT 2WD 7 STR',
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentScheme, setCurrentScheme] = useState(null);
  const [formData, setFormData] = useState({
    schemeName: '',
    region: '',
    status: 'Active',
    validityStart: '',
    validityEnd: '',
    discountType: 'Fixed Amount',
    discountValue: '',
    description: '',
  });
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });

  // Check if selected date matches data availability
  const isDataAvailableForDate = (date) => {
    return date === '2025-09'; // Only September 2025 data is available
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

  const dataAvailable = isDataAvailableForDate(selectedDate);

  const handleAddNew = () => {
    setEditMode(false);
    setCurrentScheme(null);
    setFormData({
      schemeName: '',
      region: '',
      status: 'Active',
      validityStart: '',
      validityEnd: '',
      discountType: 'Fixed Amount',
      discountValue: '',
      description: '',
    });
    setDialogOpen(true);
  };

  const handleEdit = (scheme) => {
    setEditMode(true);
    setCurrentScheme(scheme);
    const [startDate, endDate] = scheme.validityPeriod.split(' to ');
    setFormData({
      schemeName: scheme.schemeName,
      region: scheme.region,
      status: scheme.status,
      validityStart: convertDateToInput(startDate),
      validityEnd: convertDateToInput(endDate),
      discountType: scheme.discountType,
      discountValue: scheme.totalAmount.toString(),
      description: scheme.description,
    });
    setDialogOpen(true);
  };

  const handleDelete = (schemeId) => {
    if (window.confirm('Are you sure you want to delete this discount scheme?')) {
      setDiscountSchemes(prev => prev.filter(scheme => scheme.id !== schemeId));
      showAlert('Discount scheme deleted successfully!', 'success');
    }
  };

  const handleDownload = (scheme) => {
    const schemeDetails = `
Discount Scheme Details
======================
RO: ${scheme.ro}
Group: ${scheme.group}
Model: ${scheme.model}
Gross M&M Contribution: ₹${scheme.grossMM.toLocaleString()}
Dealer Contribution: ₹${scheme.dealerContribution.toLocaleString()}
Total Amount: ₹${scheme.totalAmount.toLocaleString()}
Cash Discount: ₹${scheme.cashDiscount.toLocaleString()}
Scheme Name: ${scheme.schemeName}
Region: ${scheme.region}
Status: ${scheme.status}
Validity: ${scheme.validityPeriod}
Description: ${scheme.description}
Created: ${scheme.created}
Uploaded By: ${scheme.uploadedBy}
    `;

    const blob = new Blob([schemeDetails], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${scheme.group}_${scheme.model}_scheme.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showAlert('Scheme details downloaded successfully!', 'success');
  };

  const handleSubmit = () => {
    if (!formData.schemeName || !formData.region || !formData.validityStart || !formData.validityEnd || !formData.discountValue) {
      showAlert('Please fill in all required fields', 'error');
      return;
    }

    const validityPeriod = `${convertInputToDate(formData.validityStart)} to ${convertInputToDate(formData.validityEnd)}`;
    const uploadedBy = `BANKSAE-${formData.schemeName.toUpperCase()}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 12)}`;

    if (editMode && currentScheme) {
      setDiscountSchemes(prev => prev.map(scheme => 
        scheme.id === currentScheme.id 
          ? {
              ...scheme,
              schemeName: formData.schemeName,
              region: formData.region,
              status: formData.status,
              validityPeriod: validityPeriod,
              discountType: formData.discountType,
              totalAmount: parseFloat(formData.discountValue),
              cashDiscount: parseFloat(formData.discountValue),
              description: formData.description,
            }
          : scheme
      ));
      showAlert('Discount scheme updated successfully!', 'success');
    } else {
      const newScheme = {
        id: Date.now(),
        ro: 'Delhi 1',
        group: 'NEW',
        model: 'Custom Model',
        grossMM: parseFloat(formData.discountValue) * 0.7,
        dealerContribution: parseFloat(formData.discountValue) * 0.3,
        totalAmount: parseFloat(formData.discountValue),
        cashDiscount: parseFloat(formData.discountValue),
        schemeName: formData.schemeName,
        region: formData.region,
        status: formData.status,
        validityPeriod: validityPeriod,
        uploadedBy: uploadedBy,
        created: new Date().toLocaleDateString('en-GB'),
        discountType: formData.discountType,
        description: formData.description,
      };
      setDiscountSchemes(prev => [...prev, newScheme]);
      showAlert('Discount scheme uploaded successfully!', 'success');
    }

    setDialogOpen(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const convertDateToInput = (dateStr) => {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const day = parts.padStart(2, '0');
      const month = parts[1].padStart(2, '0');
      const year = parts[22];
      return `${year}-${month}-${day}`;
    }
    return '';
  };

  const convertInputToDate = (inputDate) => {
    const parts = inputDate.split('-');
    if (parts.length === 3) {
      const day = parseInt(parts[2]);
      const month = parseInt(parts[1]);
      const year = parts;
      return `${day}/${month}/${year}`;
    }
    return '';
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  return (
    <DiscountContainer>
      {/* Alert */}
      {alert.show && (
        <Alert 
          severity={alert.type} 
          sx={{ 
            mb: 2,
            backgroundColor: alert.type === 'success' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
            color: alert.type === 'success' ? THEME_COLORS.accent.success : THEME_COLORS.accent.error,
            '& .MuiAlert-icon': {
              color: alert.type === 'success' ? THEME_COLORS.accent.success : THEME_COLORS.accent.error,
            }
          }}
        >
          {alert.message}
        </Alert>
      )}

      {/* Date Warning Alert */}
      {showDateWarning && (
        <Alert 
          severity="warning" 
          sx={{ 
            mb: 3, 
            backgroundColor: 'rgba(255, 152, 0, 0.1)',
            color: THEME_COLORS.accent.warning,
            '& .MuiAlert-icon': { color: THEME_COLORS.accent.warning }
          }}
        >
          No discount schemes data available for the selected month. Data is only available for September 2025.
        </Alert>
      )}

      {/* Header Section */}
      <HeaderSection>
        <Box>
          <Typography 
            variant="h4" 
            sx={{ 
              color: THEME_COLORS.text.primary,
              fontWeight: 600,
              fontSize: '1.75rem',
              mb: 0.5,
            }}
          >
            Discount Schemes
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: THEME_COLORS.text.secondary,
              fontSize: '0.875rem',
            }}
          >
            Manage monthly discount schemes and promotional offers
          </Typography>
        </Box>
        <UploadButton
          startIcon={<AddIcon />}
          onClick={handleAddNew}
          disabled={!dataAvailable}
        >
          Upload Scheme
        </UploadButton>
      </HeaderSection>

      {/* Date Filter Section */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: THEME_COLORS.text.secondary }}>Scheme Month</InputLabel>
              <StyledSelect
                value={selectedDate}
                label="Scheme Month"
                onChange={handleDateChange}
              >
                <MenuItem value="2025-09">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarTodayIcon sx={{ color: THEME_COLORS.accent.primary, fontSize: '1rem' }} />
                    September 2025
                  </Box>
                </MenuItem>
                <MenuItem value="2025-08">August 2025</MenuItem>
                <MenuItem value="2025-10">October 2025</MenuItem>
                <MenuItem value="2025-11">November 2025</MenuItem>
              </StyledSelect>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={9}>
            <Chip 
              icon={<CalendarTodayIcon />}
              label={dataAvailable ? `Data Available: ${selectedDate}` : `No Data: ${selectedDate}`}
              size="small"
              sx={{ 
                backgroundColor: dataAvailable ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 152, 0, 0.2)',
                color: dataAvailable ? THEME_COLORS.accent.success : THEME_COLORS.accent.warning
              }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* All Schemes Section */}
      {!dataAvailable ? (
        <Box sx={{ textAlign: 'center', p: 6 }}>
          <CalendarTodayIcon sx={{ fontSize: 48, color: THEME_COLORS.text.muted, mb: 2 }} />
          <Typography variant="h6" sx={{ color: THEME_COLORS.text.primary, mb: 1 }}>
            No Data Found
          </Typography>
          <Typography variant="body1" sx={{ color: THEME_COLORS.text.secondary, mb: 2 }}>
            Discount schemes data is not available for {selectedDate}
          </Typography>
          <Typography variant="body2" sx={{ color: THEME_COLORS.text.muted }}>
            Please select September 2025 to view available discount schemes
          </Typography>
        </Box>
      ) : (
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <PercentIcon sx={{ color: THEME_COLORS.text.secondary, fontSize: '20px' }} />
            <Typography 
              variant="h6" 
              sx={{ 
                color: THEME_COLORS.text.primary,
                fontSize: '1.125rem',
                fontWeight: 500,
              }}
            >
              All Schemes - {selectedDate}
            </Typography>
          </Box>

          {/* Table */}
          <StyledTableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>RO</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>Model</TableCell>
                  <TableCell align="right">Gross M&M</TableCell>
                  <TableCell align="right">Dealer Contribution</TableCell>
                  <TableCell align="right">Total Amount</TableCell>
                  <TableCell align="right">Cash Discount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {discountSchemes.map((scheme) => (
                  <TableRow key={scheme.id}>
                    <TableCell>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: THEME_COLORS.text.secondary,
                          fontSize: '0.875rem',
                        }}
                      >
                        {scheme.ro}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: THEME_COLORS.text.primary,
                          fontWeight: 600,
                          fontSize: '0.875rem',
                        }}
                      >
                        {scheme.group}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: THEME_COLORS.text.primary,
                          fontSize: '0.875rem',
                        }}
                      >
                        {scheme.model}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: THEME_COLORS.text.primary,
                          fontSize: '0.875rem',
                          fontWeight: 500,
                        }}
                      >
                        ₹{scheme.grossMM.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: THEME_COLORS.text.primary,
                          fontSize: '0.875rem',
                          fontWeight: 500,
                        }}
                      >
                        ₹{scheme.dealerContribution.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: THEME_COLORS.accent.primary,
                          fontSize: '0.875rem',
                          fontWeight: 600,
                        }}
                      >
                        ₹{scheme.totalAmount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: THEME_COLORS.accent.success,
                          fontSize: '0.875rem',
                          fontWeight: 600,
                        }}
                      >
                        ₹{scheme.cashDiscount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <StatusChip 
                        label={scheme.status} 
                        status={scheme.status}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <IconButton
                          size="small"
                          onClick={() => handleDownload(scheme)}
                          sx={{ 
                            color: THEME_COLORS.text.secondary,
                            '&:hover': { 
                              color: THEME_COLORS.accent.primary,
                              backgroundColor: 'rgba(255, 107, 71, 0.1)',
                            },
                          }}
                        >
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(scheme)}
                          sx={{ 
                            color: THEME_COLORS.text.secondary,
                            '&:hover': { 
                              color: THEME_COLORS.accent.primary,
                              backgroundColor: 'rgba(255, 107, 71, 0.1)',
                            },
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(scheme.id)}
                          sx={{ 
                            color: THEME_COLORS.text.secondary,
                            '&:hover': { 
                              color: THEME_COLORS.accent.error,
                              backgroundColor: 'rgba(244, 67, 54, 0.1)',
                            },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </Box>
      )}

      {/* Add/Edit Dialog */}
      <StyledDialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editMode ? 'Edit Discount Scheme' : 'Upload New Discount Scheme'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <StyledTextField
              fullWidth
              label="Scheme Name"
              value={formData.schemeName}
              onChange={(e) => handleInputChange('schemeName', e.target.value)}
              required
              placeholder="e.g., sep2025"
            />
            
            <FormControl fullWidth>
              <InputLabel sx={{ color: THEME_COLORS.text.secondary }}>Region</InputLabel>
              <StyledSelect
                value={formData.region}
                label="Region"
                onChange={(e) => handleInputChange('region', e.target.value)}
              >
                <MenuItem value="Delhi NCR">Delhi NCR</MenuItem>
                <MenuItem value="Mumbai">Mumbai</MenuItem>
                <MenuItem value="Bangalore">Bangalore</MenuItem>
                <MenuItem value="Chennai">Chennai</MenuItem>
                <MenuItem value="Kolkata">Kolkata</MenuItem>
                <MenuItem value="Pune">Pune</MenuItem>
                <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                <MenuItem value="All India">All India</MenuItem>
              </StyledSelect>
            </FormControl>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <StyledTextField
                fullWidth
                label="Validity Start Date"
                type="date"
                value={formData.validityStart}
                onChange={(e) => handleInputChange('validityStart', e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
              
              <StyledTextField
                fullWidth
                label="Validity End Date"
                type="date"
                value={formData.validityEnd}
                onChange={(e) => handleInputChange('validityEnd', e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: THEME_COLORS.text.secondary }}>Discount Type</InputLabel>
                <StyledSelect
                  value={formData.discountType}
                  label="Discount Type"
                  onChange={(e) => handleInputChange('discountType', e.target.value)}
                >
                  <MenuItem value="Fixed Amount">Fixed Amount</MenuItem>
                  <MenuItem value="Percentage">Percentage</MenuItem>
                </StyledSelect>
              </FormControl>
              
              <StyledTextField
                fullWidth
                label={`Discount Value ${formData.discountType === 'Percentage' ? '(%)' : '(₹)'}`}
                type="number"
                value={formData.discountValue}
                onChange={(e) => handleInputChange('discountValue', e.target.value)}
                required
              />
            </Box>
            
            <StyledTextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter scheme description..."
            />
            
            <FormControl fullWidth>
              <InputLabel sx={{ color: THEME_COLORS.text.secondary }}>Status</InputLabel>
              <StyledSelect
                value={formData.status}
                label="Status"
                onChange={(e) => handleInputChange('status', e.target.value)}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
                <MenuItem value="Expired">Expired</MenuItem>
              </StyledSelect>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button 
            onClick={() => setDialogOpen(false)}
            sx={{ 
              color: THEME_COLORS.text.secondary,
              textTransform: 'none',
            }}
          >
            Cancel
          </Button>
          <UploadButton onClick={handleSubmit}>
            {editMode ? 'Update Scheme' : 'Upload Scheme'}
          </UploadButton>
        </DialogActions>
      </StyledDialog>
    </DiscountContainer>
  );
};

export default DiscountSchemesManagement;
