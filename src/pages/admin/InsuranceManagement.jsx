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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Business as BusinessIcon,
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
const InsuranceContainer = styled(Box)({
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

const AddButton = styled(Button)({
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

const InsurancePlansManagement = () => {
  const [insurancePlans, setInsurancePlans] = useState([
    {
      id: 1,
      partner: 'Bajaj Allianz',
      plan: 'Comprehensive Plus',
      coverage: '95.00% IDV',
      premium: 25000,
      premiumType: 'Fixed Premium',
      gst: '18.00%',
      status: 'Active',
    },
    {
      id: 2,
      partner: 'HDFC ERGO',
      plan: 'Motor Secure',
      coverage: '85.00% IDV',
      premium: 20000,
      premiumType: 'Fixed Premium',
      gst: '18.00%',
      status: 'Active',
    },
    {
      id: 3,
      partner: 'ICICI Lombard',
      plan: 'Smart Drive',
      coverage: '90.00% IDV',
      premium: 22000,
      premiumType: 'Fixed Premium',
      gst: '18.00%',
      status: 'Active',
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [formData, setFormData] = useState({
    partner: '',
    plan: '',
    coverage: '',
    premium: '',
    premiumType: 'Fixed Premium',
    gst: '18.00%',
    status: 'Active',
  });
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });

  const handleAddNew = () => {
    setEditMode(false);
    setCurrentPlan(null);
    setFormData({
      partner: '',
      plan: '',
      coverage: '',
      premium: '',
      premiumType: 'Fixed Premium',
      gst: '18.00%',
      status: 'Active',
    });
    setDialogOpen(true);
  };

  const handleEdit = (plan) => {
    setEditMode(true);
    setCurrentPlan(plan);
    setFormData({
      partner: plan.partner,
      plan: plan.plan,
      coverage: plan.coverage,
      premium: plan.premium.toString(),
      premiumType: plan.premiumType,
      gst: plan.gst,
      status: plan.status,
    });
    setDialogOpen(true);
  };

  const handleDelete = (planId) => {
    if (window.confirm('Are you sure you want to delete this insurance plan?')) {
      setInsurancePlans(prev => prev.filter(plan => plan.id !== planId));
      showAlert('Insurance plan deleted successfully!', 'success');
    }
  };

  const handleSubmit = () => {
    if (!formData.partner || !formData.plan || !formData.coverage || !formData.premium) {
      showAlert('Please fill in all required fields', 'error');
      return;
    }

    if (editMode && currentPlan) {
      // Edit existing plan
      setInsurancePlans(prev => prev.map(plan => 
        plan.id === currentPlan.id 
          ? {
              ...plan,
              partner: formData.partner,
              plan: formData.plan,
              coverage: formData.coverage,
              premium: parseFloat(formData.premium),
              premiumType: formData.premiumType,
              gst: formData.gst,
              status: formData.status,
            }
          : plan
      ));
      showAlert('Insurance plan updated successfully!', 'success');
    } else {
      // Add new plan
      const newPlan = {
        id: Date.now(),
        partner: formData.partner,
        plan: formData.plan,
        coverage: formData.coverage,
        premium: parseFloat(formData.premium),
        premiumType: formData.premiumType,
        gst: formData.gst,
        status: formData.status,
      };
      setInsurancePlans(prev => [...prev, newPlan]);
      showAlert('Insurance plan added successfully!', 'success');
    }

    setDialogOpen(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  return (
    <InsuranceContainer>
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
            Insurance Plans
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: THEME_COLORS.text.secondary,
              fontSize: '0.875rem',
            }}
          >
            Manage insurance partners and their coverage plans
          </Typography>
        </Box>
        <AddButton
          startIcon={<AddIcon />}
          onClick={handleAddNew}
        >
          Add Insurance Plan
        </AddButton>
      </HeaderSection>

      {/* Insurance Partners & Plans Section */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <BusinessIcon sx={{ color: THEME_COLORS.text.secondary, fontSize: '20px' }} />
          <Typography 
            variant="h6" 
            sx={{ 
              color: THEME_COLORS.text.primary,
              fontSize: '1.125rem',
              fontWeight: 500,
            }}
          >
            Insurance Partners & Plans
          </Typography>
        </Box>

        {/* Table */}
        <StyledTableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Partner & Plan</TableCell>
                <TableCell>Coverage</TableCell>
                <TableCell>Premium</TableCell>
                <TableCell>GST</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {insurancePlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>
                    <Box>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: THEME_COLORS.text.primary,
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          mb: 0.5,
                        }}
                      >
                        {plan.partner}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: THEME_COLORS.text.secondary,
                          fontSize: '0.75rem',
                        }}
                      >
                        {plan.plan}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: THEME_COLORS.text.secondary,
                        fontSize: '0.875rem',
                      }}
                    >
                      {plan.coverage}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: THEME_COLORS.text.primary,
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          mb: 0.5,
                        }}
                      >
                        ₹{plan.premium.toLocaleString()}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: THEME_COLORS.text.secondary,
                          fontSize: '0.75rem',
                        }}
                      >
                        {plan.premiumType}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: THEME_COLORS.text.secondary,
                        fontSize: '0.875rem',
                      }}
                    >
                      {plan.gst}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <StatusChip 
                      label={plan.status} 
                      status={plan.status}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(plan)}
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
                        onClick={() => handleDelete(plan.id)}
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

      {/* Add/Edit Dialog */}
      <StyledDialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editMode ? 'Edit Insurance Plan' : 'Add New Insurance Plan'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <StyledTextField
              fullWidth
              label="Insurance Partner"
              value={formData.partner}
              onChange={(e) => handleInputChange('partner', e.target.value)}
              required
            />
            
            <StyledTextField
              fullWidth
              label="Plan Name"
              value={formData.plan}
              onChange={(e) => handleInputChange('plan', e.target.value)}
              required
            />
            
            <StyledTextField
              fullWidth
              label="Coverage"
              value={formData.coverage}
              onChange={(e) => handleInputChange('coverage', e.target.value)}
              placeholder="e.g., 95.00% IDV"
              required
            />
            
            <StyledTextField
              fullWidth
              label="Premium Amount"
              type="number"
              value={formData.premium}
              onChange={(e) => handleInputChange('premium', e.target.value)}
              required
            />
            
            <FormControl fullWidth>
              <InputLabel sx={{ color: THEME_COLORS.text.secondary }}>Premium Type</InputLabel>
              <StyledSelect
                value={formData.premiumType}
                label="Premium Type"
                onChange={(e) => handleInputChange('premiumType', e.target.value)}
              >
                <MenuItem value="Fixed Premium">Fixed Premium</MenuItem>
                <MenuItem value="Variable Premium">Variable Premium</MenuItem>
                <MenuItem value="Percentage Based">Percentage Based</MenuItem>
              </StyledSelect>
            </FormControl>
            
            <StyledTextField
              fullWidth
              label="GST Rate"
              value={formData.gst}
              onChange={(e) => handleInputChange('gst', e.target.value)}
              placeholder="18.00%"
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
          <AddButton onClick={handleSubmit}>
            {editMode ? 'Update Plan' : 'Add Plan'}
          </AddButton>
        </DialogActions>
      </StyledDialog>
    </InsuranceContainer>
  );
};

export default InsurancePlansManagement;
