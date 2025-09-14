import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Button,
    IconButton,
    Avatar,
    Chip,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Divider,
    LinearProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    Add as AddIcon,
    Visibility as ViewIcon,
    TrendingUp as TrendingUpIcon,
    Assignment as AssignmentIcon,
    Person as PersonIcon,
    CalendarToday as CalendarIcon,
    DirectionsCar as CarIcon,
    Edit as EditIcon,
    MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Theme colors matching your image
const DASHBOARD_THEME = {
    background: {
        main: '#0f0f0f',
        card: '#1a1a1a',
        secondary: '#2a2a2a',
    },
    text: {
        primary: '#ffffff',
        secondary: '#b0b0b0',
        muted: '#808080',
    },
    accent: {
        primary: '#ff6b47', // Orange accent from your image
        success: '#4caf50',
        warning: '#ff9800',
        info: '#2196f3',
    },
    border: 'rgba(255, 255, 255, 0.1)',
};

// Styled Components
const DashboardContainer = styled(Box)(({ theme }) => ({
    backgroundColor: DASHBOARD_THEME.background.main,
    minHeight: '100vh',
    padding: theme.spacing(3),
}));

const StatsCard = styled(Card)(({ theme }) => ({
    backgroundColor: DASHBOARD_THEME.background.card,
    border: `1px solid ${DASHBOARD_THEME.border}`,
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    '&:hover': {
        borderColor: DASHBOARD_THEME.accent.primary,
        transform: 'translateY(-2px)',
        boxShadow: `0 8px 25px rgba(255, 107, 71, 0.15)`,
    },
}));

const ActionButton = styled(Button)(({ theme, variant }) => ({
    textTransform: 'none',
    fontWeight: 500,
    borderRadius: '8px',
    padding: theme.spacing(1.5, 3),
    ...(variant === 'contained' && {
        backgroundColor: DASHBOARD_THEME.accent.primary,
        color: 'white',
        '&:hover': {
            backgroundColor: '#e55a3c',
        },
    }),
    ...(variant === 'outlined' && {
        borderColor: DASHBOARD_THEME.border,
        color: DASHBOARD_THEME.text.primary,
        '&:hover': {
            borderColor: DASHBOARD_THEME.accent.primary,
            backgroundColor: 'rgba(255, 107, 71, 0.1)',
        },
    }),
}));

const SalesQuoteDashboard = () => {
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState({
        todayQuotes: 0,
        totalQuotes: 4, // Default 4 static quotes
        pendingQuotes: 1,
        completedQuotes: 1,
        conversionRate: 65,
    });

    // Sample quotes data (will be merged with localStorage quotes)
    const [recentQuotes, setRecentQuotes] = useState([
        
        {
            id: 'QT-2025-VS7638401234',
            customer: 'Priya Sharma',
            vehicle: 'XUV700 - MX BS6',
            amount: 1850000,
            status: 'Completed',
            date: '11/09/2025',
            priority: 'Low',
        },
        {
            id: 'QT-2025-VS7638405678',
            customer: 'Rajesh Patel',
            vehicle: 'BOLERO - B4 BS6.2',
            amount: 1350000,
            status: 'Under Review',
            date: '10/09/2025',
            priority: 'High',
        },
    ]);

    // Helper function to get all quotes from localStorage
    const getAllQuotes = () => {
        try {
            const quotes = localStorage.getItem('allQuotes');
            return quotes ? JSON.parse(quotes) : [];
        } catch (error) {
            console.error('Error reading quotes from localStorage:', error);
            return [];
        }
    };

    // Helper function to get today's date in DD/MM/YYYY format
    const getTodayDateString = () => {
        const today = new Date();
        return today.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    // Helper function to count today's quotes from localStorage
    const getTodayQuotesCount = () => {
        const allQuotes = getAllQuotes();
        const todayDate = getTodayDateString();
        
        const todayQuotes = allQuotes.filter(quote => {
            // Check if quote was created today
            return quote.createdAt === todayDate || 
                   quote.quoteDetails?.date === todayDate ||
                   (quote.pdfGenerated && new Date(quote.pdfGenerated).toLocaleDateString('en-IN', {
                       day: '2-digit',
                       month: '2-digit', 
                       year: 'numeric',
                   }) === todayDate);
        });

        return todayQuotes.length;
    };

    // Update dashboard data with localStorage quotes
    useEffect(() => {
        const loadDashboardData = () => {
            const localStorageQuotes = getAllQuotes();
            const todayCount = getTodayQuotesCount();
            
            // Static quotes count (4) + localStorage quotes count
            const totalQuotesCount = 4 + localStorageQuotes.length;
            
            // Count status-wise quotes from localStorage
            const pendingFromLS = localStorageQuotes.filter(q => q.status === 'Pending').length;
            const completedFromLS = localStorageQuotes.filter(q => q.status === 'Completed').length;

            setDashboardData(prevData => ({
                ...prevData,
                todayQuotes: todayCount,
                totalQuotes: totalQuotesCount,
                pendingQuotes: 1 + pendingFromLS, // 1 static + localStorage pending
                completedQuotes: 1 + completedFromLS, // 1 static + localStorage completed
            }));

            // Update recent quotes with localStorage data
            const formattedLSQuotes = localStorageQuotes.slice(0, 6).map(quote => ({
                id: quote.id || quote.quoteDetails?.quoteNumber || 'Unknown',
                customer: quote.customer || quote.customerInfo?.name || 'Unknown Customer',
                vehicle: quote.vehicle || `${quote.vehicleDetails?.selectedVehicle?.name || 'Not selected'}`,
                amount: typeof quote.amount === 'string' ? 
                    parseFloat(quote.amount.replace(/[₹,]/g, '')) || 0 :
                    quote.pricing?.finalPayableAmount || 0,
                status: quote.status || 'Draft',
                date: quote.createdAt || quote.quoteDetails?.date || 'Unknown',
                priority: quote.priority || 'Medium',
            }));

            // Merge localStorage quotes with static quotes (LS quotes first)
            setRecentQuotes(prevQuotes => [...formattedLSQuotes, ...prevQuotes]);

            console.log('Dashboard Data Updated:', {
                todayQuotes: todayCount,
                totalQuotes: totalQuotesCount,
                fromLocalStorage: localStorageQuotes.length,
                static: 4
            });
        };

        loadDashboardData();

        // Listen for localStorage changes
        const handleStorageChange = () => {
            loadDashboardData();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('quotesUpdated', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('quotesUpdated', handleStorageChange);
        };
    }, []);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return DASHBOARD_THEME.accent.success;
            case 'pending':
                return DASHBOARD_THEME.accent.warning;
            case 'draft':
                return DASHBOARD_THEME.text.muted;
            case 'under review':
                return DASHBOARD_THEME.accent.info;
            default:
                return DASHBOARD_THEME.text.secondary;
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case 'high':
                return '#f44336';
            case 'medium':
                return '#ff9800';
            case 'low':
                return '#4caf50';
            default:
                return DASHBOARD_THEME.text.muted;
        }
    };

    const handleCreateNewQuote = () => {
        navigate('/quotes/add-quote');
    };

    const handleViewAllQuotes = () => {
        navigate('/quotes/all-quotes');
    };

    const handleViewQuote = (quoteId) => {
        console.log('Viewing quote:', quoteId);
    };

    const handleEditQuote = (quoteId) => {
        console.log('Editing quote:', quoteId);
    };

    return (
        <DashboardContainer>
            {/* Header Section */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                        <Typography
                            variant="h4"
                            sx={{
                                color: DASHBOARD_THEME.text.primary,
                                fontWeight: 600,
                                fontSize: '2rem',
                                mb: 1
                            }}
                        >
                            Welcome back, Sales
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: DASHBOARD_THEME.text.secondary,
                                fontSize: '1rem'
                            }}
                        >
                            Here's what's happening with your quotations today.
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {/* Today's Quotes */}
                <Grid item xs={12} sm={6} md={4}>
                    <StatsCard>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                                <Box>
                                    <Typography variant="body2" sx={{ color: DASHBOARD_THEME.text.secondary, mb: 1 }}>
                                        Today's Quotes
                                    </Typography>
                                    <Typography variant="h3" sx={{ color: DASHBOARD_THEME.text.primary, fontWeight: 600 }}>
                                        {dashboardData.todayQuotes}
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    backgroundColor: 'rgba(255, 107, 71, 0.1)',
                                    borderRadius: '8px',
                                    p: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <CalendarIcon sx={{ color: DASHBOARD_THEME.accent.primary, fontSize: 24 }} />
                                </Box>
                            </Box>
                            <Typography variant="caption" sx={{ color: DASHBOARD_THEME.text.muted }}>
                                {dashboardData.todayQuotes === 0 ? 'No quotes created today' : `${dashboardData.todayQuotes} quotes created today`}
                            </Typography>
                        </CardContent>
                    </StatsCard>
                </Grid>

                {/* Total Quotes */}
                <Grid item xs={12} sm={6} md={4}>
                    <StatsCard>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                                <Box>
                                    <Typography variant="body2" sx={{ color: DASHBOARD_THEME.text.secondary, mb: 1 }}>
                                        Total Quotes
                                    </Typography>
                                    <Typography variant="h3" sx={{ color: DASHBOARD_THEME.text.primary, fontWeight: 600 }}>
                                        {dashboardData.totalQuotes}
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                                    borderRadius: '8px',
                                    p: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <AssignmentIcon sx={{ color: DASHBOARD_THEME.accent.success, fontSize: 24 }} />
                                </Box>
                            </Box>
                            <Typography variant="caption" sx={{ color: DASHBOARD_THEME.text.muted }}>
                                {getAllQuotes().length} from system + 4 samples
                            </Typography>
                        </CardContent>
                    </StatsCard>
                </Grid>

                {/* User Role */}
                <Grid item xs={12} sm={6} md={4}>
                    <StatsCard>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                                <Box>
                                    <Typography variant="body2" sx={{ color: DASHBOARD_THEME.text.secondary, mb: 1 }}>
                                        User Role
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: DASHBOARD_THEME.text.primary, fontWeight: 600 }}>
                                        Sales
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: DASHBOARD_THEME.text.primary, fontWeight: 600 }}>
                                        Executive
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                                    borderRadius: '8px',
                                    p: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <PersonIcon sx={{ color: DASHBOARD_THEME.accent.info, fontSize: 24 }} />
                                </Box>
                            </Box>
                            <Typography variant="caption" sx={{ color: DASHBOARD_THEME.text.muted }}>
                                Current access level
                            </Typography>
                        </CardContent>
                    </StatsCard>
                </Grid>
            </Grid>

            {/* Main Content */}
            <Grid container spacing={3}>
                {/* Recent Quotes */}
                <Grid item xs={12} md={8}>
                    <StatsCard>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6" sx={{ color: DASHBOARD_THEME.text.primary, fontWeight: 600 }}>
                                    Recent Quotes
                                </Typography>
                                <ActionButton variant="outlined" size="small" onClick={handleViewAllQuotes}>
                                    View All
                                </ActionButton>
                            </Box>

                            <List sx={{ p: 0 }}>
                                {recentQuotes.slice(0, 8).map((quote, index) => (
                                    <React.Fragment key={quote.id}>
                                        <ListItem
                                            sx={{
                                                px: 0,
                                                py: 2,
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255, 107, 71, 0.05)',
                                                    borderRadius: '8px',
                                                }
                                            }}
                                        >
                                            <ListItemAvatar>
                                                <Avatar sx={{
                                                    bgcolor: DASHBOARD_THEME.background.secondary,
                                                    color: DASHBOARD_THEME.text.primary,
                                                    border: `1px solid ${DASHBOARD_THEME.border}`
                                                }}>
                                                    <CarIcon />
                                                </Avatar>
                                            </ListItemAvatar>

                                            <ListItemText
                                                primary={
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                                        <Typography
                                                            variant="body1"
                                                            sx={{
                                                                color: DASHBOARD_THEME.text.primary,
                                                                fontWeight: 500,
                                                                cursor: 'pointer',
                                                                '&:hover': { color: DASHBOARD_THEME.accent.primary }
                                                            }}
                                                            onClick={() => handleViewQuote(quote.id)}
                                                        >
                                                            {quote.id}
                                                        </Typography>
                                                        
                                                    </Box>
                                                }
                                                secondary={
                                                    <Box>
                                                        <Typography variant="body2" sx={{ color: DASHBOARD_THEME.text.secondary }}>
                                                            {quote.customer} • {quote.vehicle}
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ color: DASHBOARD_THEME.text.muted, fontSize: '0.75rem' }}>
                                                            {quote.date}
                                                        </Typography>
                                                    </Box>
                                                }
                                            />

                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Typography variant="h6" sx={{ color: DASHBOARD_THEME.text.primary, fontWeight: 600 }}>
                                                    ₹{(quote.amount / 100000).toFixed(1)}L
                                                </Typography>
                                                {/* <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleViewQuote(quote.id)}
                                                        sx={{ color: DASHBOARD_THEME.text.secondary }}
                                                    >
                                                        <ViewIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleEditQuote(quote.id)}
                                                        sx={{ color: DASHBOARD_THEME.text.secondary }}
                                                    >
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        sx={{ color: DASHBOARD_THEME.text.secondary }}
                                                    >
                                                        <MoreVertIcon fontSize="small" />
                                                    </IconButton>
                                                </Box> */}
                                            </Box>
                                        </ListItem>

                                        {index < Math.min(recentQuotes.length, 8) - 1 && (
                                            <Divider sx={{ borderColor: DASHBOARD_THEME.border }} />
                                        )}
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </StatsCard>
                </Grid>

                {/* Quick Actions */}
                <Grid item xs={12} md={4}>
                    <StatsCard>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ color: DASHBOARD_THEME.text.primary, fontWeight: 600, mb: 3 }}>
                                Quick Actions
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <ActionButton
                                    variant="contained"
                                    fullWidth
                                    startIcon={<AddIcon />}
                                    onClick={handleCreateNewQuote}
                                    sx={{ py: 2 }}
                                >
                                    Create New Quote
                                </ActionButton>

                                <ActionButton
                                    variant="outlined"
                                    fullWidth
                                    startIcon={<ViewIcon />}
                                    onClick={handleViewAllQuotes}
                                    sx={{ py: 2 }}
                                >
                                    View My Quotes
                                </ActionButton>
                            </Box>

                            {/* Performance Metrics */}
                            
                        </CardContent>
                    </StatsCard>
                </Grid>
            </Grid>
        </DashboardContainer>
    );
};

export default SalesQuoteDashboard;
