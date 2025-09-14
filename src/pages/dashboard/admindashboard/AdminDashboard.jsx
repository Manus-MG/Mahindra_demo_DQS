// import React from 'react';
// import { 
//   Box,
//   Typography,
//   Paper,
//   Grid,
//   AppBar,
//   Toolbar,
//   Button,
//   Card,
//   CardContent,
//   IconButton
// } from '@mui/material';
// import BusinessIcon from '@mui/icons-material/Business';
// import GroupIcon from '@mui/icons-material/Group';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import DvrIcon from '@mui/icons-material/Dvr';

// const AdminDashboard = () => {
//   const stats = [
//     {
//       icon: <BusinessIcon />,
//       value: 5468,
//       label: 'Total Companies',
//       change: '+19.01%',
//       isPositive: true,
//       subtext: '5,10,7,5,10,7,5'
//     },
//     {
//       icon: <DvrIcon />,
//       value: 4598,
//       label: 'Active Companies',
//       change: '-12%',
//       isPositive: false,
//       subtext: '5,3,7,6,3,10,5'
//     },
//     {
//       icon: <GroupIcon />,
//       value: 3698,
//       label: 'Total Subscribers',
//       change: '+6%',
//       isPositive: true,
//       subtext: '8,10,10,8,8,10,8'
//     },
//     {
//       icon: <AttachMoneyIcon />,
//       value: 89878.58,
//       label: 'Total Earnings',
//       change: '-16%',
//       isPositive: false,
//       subtext: '5,10,7,5,10,7,5'
//     }
//   ];

//   return (
//    <Box>
//     {/* <Typography variant="h4" component="h2" sx={{mb: 2}}>Admin Dashboard</Typography> */}
//      <Box sx={{ flexGrow: 1 }}>
//       {/* Header */}
//       <AppBar position="static" sx={{ bgcolor: '#4527A0', borderRadius: '0 0 8px 8px', mb: 4 }}>
//         <Toolbar sx={{ py: 2 }}>
//           <Box sx={{ flexGrow: 1 }}>
//             <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
//               Welcome Back, Adrian
//             </Typography>
//             <Typography variant="subtitle1" sx={{ mt: 1 }}>
//               14 New Companies Subscribed Today !!!
//             </Typography>
//           </Box>
//           <Button 
//             variant="contained" 
//             sx={{ 
//               bgcolor: '#1A1A1A', 
//               mr: 2,
//               '&:hover': { bgcolor: '#2A2A2A' }
//             }}
//           >
//             Companies
//           </Button>
//           <Button 
//             variant="contained" 
//             sx={{ 
//               bgcolor: 'white', 
//               color: 'black',
//               '&:hover': { bgcolor: '#F5F5F5' }
//             }}
//           >
//             All Packages
//           </Button>
//         </Toolbar>
//       </AppBar>

//       {/* Stats Grid */}
//       <Grid container spacing={3}>
//         {stats.map((stat, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <Card sx={{ height: '100%', bgcolor: '#FFFFFF' }}>
//               <CardContent>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
//                   <IconButton sx={{ bgcolor: '#1A1A1A', color: 'white', '&:hover': { bgcolor: '#2A2A2A' } }}>
//                     {stat.icon}
//                   </IconButton>
//                   <Typography 
//                     variant="caption" 
//                     sx={{ 
//                       bgcolor: stat.isPositive ? '#E8F5E9' : '#FFEBEE',
//                       color: stat.isPositive ? '#2E7D32' : '#C62828',
//                       px: 1,
//                       py: 0.5,
//                       borderRadius: 1
//                     }}
//                   >
//                     {stat.change}
//                   </Typography>
//                 </Box>
//                 <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
//                   {stat.label === 'Total Earnings' ? `$${stat.value.toLocaleString()}` : stat.value.toLocaleString()}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                   {stat.label}
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   {stat.subtext}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//    </Box>
//   );
// };

// export default AdminDashboard;


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
    Paper,
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
    SupervisorAccount as SupervisorAccountIcon,
    AttachMoney as AttachMoneyIcon,
    Security as SecurityIcon,
    LocalOffer as LocalOfferIcon,
    Business as BusinessIcon,
    Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Theme colors matching your sales dashboard
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
        primary: '#ff6b47', // Orange accent
        success: '#4caf50',
        warning: '#ff9800',
        info: '#2196f3',
        purple: '#9c27b0',
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

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState({
        totalSalesExecutives: 5,
        totalQuotes: 0,
        todayQuotes: 0,
        totalRevenue: 0,
    });

    const [recentActivity, setRecentActivity] = useState([]);
    const [insuranceCompanies, setInsuranceCompanies] = useState([
        {
            id: 1,
            name: 'Bajaj Allianz',
            coverage: '95.00% IDV Coverage',
            premium: 25000,
            description: 'Comprehensive coverage with theft protection'
        },
        {
            id: 2,
            name: 'HDFC ERGO',
            coverage: '85.00% IDV Coverage',
            premium: 19000,
            description: 'Basic comprehensive coverage'
        },
        {
            id: 3,
            name: 'IFFCO Tokio',
            coverage: '90.00% IDV Coverage',
            premium: 22000,
            description: 'Standard comprehensive plan'
        },
        {
            id: 4,
            name: 'New India Assurance',
            coverage: '80.00% IDV Coverage',
            premium: 18500,
            description: 'Government backed insurance'
        }
    ]);

    const [latestSchemes, setLatestSchemes] = useState([
        {
            id: 1,
            name: 'Festive Season Offer',
            description: 'Special discounts on XUV700 and Bolero',
            discount: '₹50,000',
            validity: 'Valid till Oct 31, 2025',
            type: 'Limited Time'
        },
        {
            id: 2,
            name: 'Company Finance Scheme',
            description: 'Direct financing from Mahindra Finance',
            rate: '7.9% p.a.',
            validity: 'Ongoing',
            type: 'Finance'
        },
        {
            id: 3,
            name: 'Exchange Bonus',
            description: 'Extra benefits on vehicle exchange',
            discount: '₹25,000',
            validity: 'Valid till Dec 2025',
            type: 'Exchange'
        },
        {
            id: 4,
            name: 'Corporate Discount',
            description: 'Special rates for bulk purchases',
            discount: '₹75,000',
            validity: 'Ongoing',
            type: 'Corporate'
        }
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

    // Calculate dashboard metrics
    useEffect(() => {
        const loadAdminData = () => {
            const allQuotes = getAllQuotes();
            const todayDate = getTodayDateString();
            
            // Count today's quotes
            const todayQuotes = allQuotes.filter(quote => {
                return quote.createdAt === todayDate || 
                       quote.quoteDetails?.date === todayDate ||
                       (quote.pdfGenerated && new Date(quote.pdfGenerated).toLocaleDateString('en-IN', {
                           day: '2-digit',
                           month: '2-digit', 
                           year: 'numeric',
                       }) === todayDate);
            });

            // Calculate total revenue
            const totalRevenue = allQuotes.reduce((sum, quote) => {
                if (quote.status === 'Completed') {
                    const amount = typeof quote.amount === 'string' ? 
                        parseFloat(quote.amount.replace(/[₹,]/g, '')) || 0 :
                        quote.pricing?.finalPayableAmount || 0;
                    return sum + amount;
                }
                return sum;
            }, 0);

            // Static quotes revenue (assuming 2 completed out of 4)
            const staticRevenue = 1850000 + 1350000; // From completed static quotes
            
            setDashboardData({
                totalSalesExecutives: 5,
                totalQuotes: allQuotes.length + 4, // localStorage + 4 static
                todayQuotes: todayQuotes.length,
                totalRevenue: totalRevenue + staticRevenue,
            });

            // Recent activity from quotes
            const recentActivities = allQuotes.slice(0, 6).map(quote => ({
                id: quote.id || 'Unknown',
                action: 'Quote Generated',
                customer: quote.customer || 'Unknown Customer',
                amount: typeof quote.amount === 'string' ? 
                    parseFloat(quote.amount.replace(/[₹,]/g, '')) || 0 :
                    quote.pricing?.finalPayableAmount || 0,
                time: quote.createdAt || 'Unknown',
                status: quote.status || 'Draft'
            }));

            setRecentActivity(recentActivities);
        };

        loadAdminData();

        // Listen for localStorage changes
        const handleStorageChange = () => {
            loadAdminData();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('quotesUpdated', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('quotesUpdated', handleStorageChange);
        };
    }, []);

    const getSchemeTypeColor = (type) => {
        switch (type.toLowerCase()) {
            case 'limited time':
                return DASHBOARD_THEME.accent.warning;
            case 'finance':
                return DASHBOARD_THEME.accent.info;
            case 'exchange':
                return DASHBOARD_THEME.accent.success;
            case 'corporate':
                return DASHBOARD_THEME.accent.purple;
            default:
                return DASHBOARD_THEME.text.muted;
        }
    };

    const handleViewAllQuotes = () => {
        navigate('/quotes/all-quotes');
    };

    const handleManageUsers = () => {
        console.log('Navigate to user management');
    };

    const handleViewReports = () => {
        console.log('Navigate to reports');
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
                            Admin Dashboard
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: DASHBOARD_THEME.text.secondary,
                                fontSize: '1rem'
                            }}
                        >
                            Monitor sales performance and manage system operations.
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Admin Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {/* Total Sales Executives */}
                <Grid item xs={12} sm={6} md={4}>
                    <StatsCard>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                                <Box>
                                    <Typography variant="body2" sx={{ color: DASHBOARD_THEME.text.secondary, mb: 1 }}>
                                        Sales Executives
                                    </Typography>
                                    <Typography variant="h3" sx={{ color: DASHBOARD_THEME.text.primary, fontWeight: 600 }}>
                                        {dashboardData.totalSalesExecutives}
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    backgroundColor: 'rgba(156, 39, 176, 0.1)',
                                    borderRadius: '8px',
                                    p: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <SupervisorAccountIcon sx={{ color: DASHBOARD_THEME.accent.purple, fontSize: 24 }} />
                                </Box>
                            </Box>
                            <Typography variant="caption" sx={{ color: DASHBOARD_THEME.text.muted }}>
                                Active team members
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
                                All time generated quotes
                            </Typography>
                        </CardContent>
                    </StatsCard>
                </Grid>

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
                                Generated today
                            </Typography>
                        </CardContent>
                    </StatsCard>
                </Grid>
            </Grid>

            {/* Main Content - Insurance & Schemes */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {/* Insurance Companies */}
                <Grid item xs={12} md={6}>
                    <StatsCard>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6" sx={{ color: DASHBOARD_THEME.text.primary, fontWeight: 600 }}>
                                    Insurance Partners
                                </Typography>
                                <SecurityIcon sx={{ color: DASHBOARD_THEME.accent.info, fontSize: 20 }} />
                            </Box>

                            <List sx={{ p: 0 }}>
                                {insuranceCompanies.map((insurance, index) => (
                                    <React.Fragment key={insurance.id}>
                                        <ListItem sx={{ px: 0, py: 2 }}>
                                            <ListItemAvatar>
                                                <Avatar sx={{
                                                    bgcolor: DASHBOARD_THEME.background.secondary,
                                                    color: DASHBOARD_THEME.text.primary,
                                                    border: `1px solid ${DASHBOARD_THEME.border}`,
                                                    fontSize: '0.875rem'
                                                }}>
                                                    {insurance.name.charAt(0)}
                                                </Avatar>
                                            </ListItemAvatar>

                                            <ListItemText
                                                primary={
                                                    <Typography variant="body1" sx={{ color: DASHBOARD_THEME.text.primary, fontWeight: 500 }}>
                                                        {insurance.name}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Box>
                                                        <Typography variant="body2" sx={{ color: DASHBOARD_THEME.text.secondary }}>
                                                            {insurance.coverage}
                                                        </Typography>
                                                        <Typography variant="caption" sx={{ color: DASHBOARD_THEME.text.muted }}>
                                                            {insurance.description}
                                                        </Typography>
                                                    </Box>
                                                }
                                            />

                                            <Typography variant="h6" sx={{ color: DASHBOARD_THEME.accent.primary, fontWeight: 600 }}>
                                                ₹{(insurance.premium / 1000).toFixed(0)}K
                                            </Typography>
                                        </ListItem>

                                        {index < insuranceCompanies.length - 1 && (
                                            <Divider sx={{ borderColor: DASHBOARD_THEME.border }} />
                                        )}
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </StatsCard>
                </Grid>

                {/* Latest Schemes */}
                <Grid item xs={12} md={6}>
                    <StatsCard>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6" sx={{ color: DASHBOARD_THEME.text.primary, fontWeight: 600 }}>
                                    Latest Schemes
                                </Typography>
                                <LocalOfferIcon sx={{ color: DASHBOARD_THEME.accent.warning, fontSize: 20 }} />
                            </Box>

                            <List sx={{ p: 0 }}>
                                {latestSchemes.map((scheme, index) => (
                                    <React.Fragment key={scheme.id}>
                                        <ListItem sx={{ px: 0, py: 2 }}>
                                            <ListItemText
                                                primary={
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                                        <Typography variant="body1" sx={{ color: DASHBOARD_THEME.text.primary, fontWeight: 500 }}>
                                                            {scheme.name}
                                                        </Typography>
                                                        <Chip 
                                                            label={scheme.type}
                                                            size="small"
                                                            sx={{
                                                                bgcolor: getSchemeTypeColor(scheme.type),
                                                                color: 'white',
                                                                fontSize: '0.7rem',
                                                                height: '20px'
                                                            }}
                                                        />
                                                    </Box>
                                                }
                                                secondary={
                                                    <Box>
                                                        <Typography variant="body2" sx={{ color: DASHBOARD_THEME.text.secondary, mb: 0.5 }}>
                                                            {scheme.description}
                                                        </Typography>
                                                        <Typography variant="caption" sx={{ color: DASHBOARD_THEME.text.muted }}>
                                                            {scheme.validity}
                                                        </Typography>
                                                    </Box>
                                                }
                                            />

                                            <Box sx={{ textAlign: 'right' }}>
                                                {scheme.discount && (
                                                    <Typography variant="h6" sx={{ color: DASHBOARD_THEME.accent.success, fontWeight: 600 }}>
                                                        {scheme.discount}
                                                    </Typography>
                                                )}
                                                {scheme.rate && (
                                                    <Typography variant="body2" sx={{ color: DASHBOARD_THEME.accent.info, fontWeight: 500 }}>
                                                        {scheme.rate}
                                                    </Typography>
                                                )}
                                            </Box>
                                        </ListItem>

                                        {index < latestSchemes.length - 1 && (
                                            <Divider sx={{ borderColor: DASHBOARD_THEME.border }} />
                                        )}
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </StatsCard>
                </Grid>
            </Grid>

            {/* Bottom Section */}
            <Grid container spacing={3}>
                {/* Recent Activity */}
                <Grid item xs={12} md={8}>
                    <StatsCard>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6" sx={{ color: DASHBOARD_THEME.text.primary, fontWeight: 600 }}>
                                    Recent Activity
                                </Typography>
                                {/* <ActionButton variant="outlined" size="small" onClick={handleViewAllQuotes}>
                                    View Details
                                </ActionButton> */}
                            </Box>

                            {recentActivity.length > 0 ? (
                                <List sx={{ p: 0 }}>
                                    {recentActivity.slice(0, 5).map((activity, index) => (
                                        <React.Fragment key={activity.id}>
                                            <ListItem sx={{ px: 0, py: 2 }}>
                                                <ListItemAvatar>
                                                    <Avatar sx={{
                                                        bgcolor: DASHBOARD_THEME.accent.primary,
                                                        color: 'white',
                                                        width: 32,
                                                        height: 32,
                                                        fontSize: '0.875rem'
                                                    }}>
                                                        <AssignmentIcon fontSize="small" />
                                                    </Avatar>
                                                </ListItemAvatar>

                                                <ListItemText
                                                    primary={
                                                        <Typography variant="body1" sx={{ color: DASHBOARD_THEME.text.primary, fontWeight: 500 }}>
                                                            {activity.action} - {activity.id}
                                                        </Typography>
                                                    }
                                                    secondary={
                                                        <Box>
                                                            <Typography variant="body2" sx={{ color: DASHBOARD_THEME.text.secondary }}>
                                                                Customer: {activity.customer}
                                                            </Typography>
                                                            <Typography variant="caption" sx={{ color: DASHBOARD_THEME.text.muted }}>
                                                                {activity.time}
                                                            </Typography>
                                                        </Box>
                                                    }
                                                />

                                                <Box sx={{ textAlign: 'right' }}>
                                                    <Typography variant="h6" sx={{ color: DASHBOARD_THEME.text.primary, fontWeight: 600 }}>
                                                        ₹{(activity.amount / 100000).toFixed(1)}L
                                                    </Typography>
                                                    <Chip 
                                                        label={activity.status}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: activity.status === 'Completed' ? DASHBOARD_THEME.accent.success : DASHBOARD_THEME.accent.warning,
                                                            color: 'white',
                                                            fontSize: '0.7rem',
                                                            height: '20px'
                                                        }}
                                                    />
                                                </Box>
                                            </ListItem>

                                            {index < Math.min(recentActivity.length, 5) - 1 && (
                                                <Divider sx={{ borderColor: DASHBOARD_THEME.border }} />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </List>
                            ) : (
                                <Box sx={{ textAlign: 'center', py: 4 }}>
                                    <Typography variant="body2" sx={{ color: DASHBOARD_THEME.text.muted }}>
                                        No recent activity found
                                    </Typography>
                                </Box>
                            )}
                        </CardContent>
                    </StatsCard>
                </Grid>

                {/* Admin Actions & System Health */}
                <Grid item xs={12} md={4}>
                    <StatsCard>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ color: DASHBOARD_THEME.text.primary, fontWeight: 600, mb: 3 }}>
                                Admin Actions
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                                <ActionButton
                                    variant="contained"
                                    fullWidth
                                    startIcon={<ViewIcon />}
                                    onClick={() => navigate('/quotes/all-quotes')}
                                    sx={{ py: 2 }}
                                >
                                    View All Quotes
                                </ActionButton>

                                
                            </Box>

                            {/* System Health */}
                            <Box sx={{ p: 2, backgroundColor: DASHBOARD_THEME.background.secondary, borderRadius: '8px' }}>
                                <Typography variant="subtitle2" sx={{ color: DASHBOARD_THEME.text.primary, mb: 2 }}>
                                    System Health
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2" sx={{ color: DASHBOARD_THEME.text.secondary }}>
                                        Server Status
                                    </Typography>
                                    <Chip label="Online" size="small" sx={{ bgcolor: DASHBOARD_THEME.accent.success, color: 'white' }} />
                                </Box>
                                <LinearProgress 
                                    variant="determinate" 
                                    value={95} 
                                    sx={{ 
                                        height: 6, 
                                        borderRadius: 3,
                                        backgroundColor: DASHBOARD_THEME.background.main,
                                        '& .MuiLinearProgress-bar': {
                                            backgroundColor: DASHBOARD_THEME.accent.success
                                        }
                                    }} 
                                />
                                <Typography variant="caption" sx={{ color: DASHBOARD_THEME.text.muted }}>
                                    95% Performance
                                </Typography>
                            </Box>
                        </CardContent>
                    </StatsCard>
                </Grid>
            </Grid>
        </DashboardContainer>
    );
};

export default AdminDashboard;

