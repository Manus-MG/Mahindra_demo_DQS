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
    TextField,
    InputAdornment,
    IconButton,
    Chip,
    Select,
    MenuItem,
    FormControl,
    Menu,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useNavigate } from 'react-router-dom';

// Theme constants matching your design
const THEME_COLORS = {
    primary: '#E56751',
    primaryHover: '#D65A45',
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
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
};

const HeaderContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(3),
    gap: theme.spacing(2),
}));

const SearchContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    alignItems: 'center',
    marginBottom: theme.spacing(3),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        backgroundColor: THEME_COLORS.background.paper,
        color: THEME_COLORS.text.primary,
        fontSize: '0.875rem',
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
        fontSize: '0.875rem',
    },
    '& .MuiInputAdornment-root': {
        color: THEME_COLORS.text.secondary,
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: THEME_COLORS.primary,
    color: 'white',
    textTransform: 'none',
    fontWeight: 500,
    borderRadius: '8px',
    padding: theme.spacing(1, 2),
    '&:hover': {
        backgroundColor: THEME_COLORS.primaryHover,
    },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
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
                padding: theme.spacing(2),
            },
        },
        '& .MuiTableBody-root': {
            '& .MuiTableRow-root': {
                '&:hover': {
                    backgroundColor: 'rgba(229, 103, 81, 0.05)',
                },
                '& .MuiTableCell-body': {
                    color: THEME_COLORS.text.primary,
                    borderBottom: `1px solid ${THEME_COLORS.border}`,
                    padding: theme.spacing(2),
                    fontSize: '0.875rem',
                },
            },
        },
    },
}));

const StatusChip = styled(Chip)(({ status }) => ({
    fontSize: '0.75rem',
    fontWeight: 500,
    borderRadius: '16px',
    minWidth: '80px',
    ...(status === 'Pending' && {
        backgroundColor: THEME_COLORS.warning,
        color: 'white',
    }),
    ...(status === 'Draft' && {
        backgroundColor: THEME_COLORS.text.tertiary,
        color: 'white',
    }),
    ...(status === 'Completed' && {
        backgroundColor: THEME_COLORS.success,
        color: 'white',
    }),
}));

// Static sample data (4 quotes)
const staticQuotesData = [
    {
        id: 'QT-2655-177733634129',
        customer: 'rb chairman',
        email: 'rb@gmail.com',
        vehicle: 'Not selected',
        amount: '',
        status: 'Draft',
        createdAt: '13/9/2025',
        createdBy: 'Created by you',
        isStatic: true,
    },
    {
        id: 'QT-2655-177734683357',
        customer: 'rb chairman',
        email: 'rb@gmail.com',
        vehicle: 'Not selected',
        amount: '₹9,67,500.83',
        status: 'Pending',
        createdAt: '13/9/2025',
        createdBy: 'Created by you',
        isStatic: true,
    },
    {
        id: 'QT-2655-177934662722',
        customer: 'Test Customer',
        email: '',
        vehicle: 'Not selected',
        amount: '₹9,26,900.83',
        status: 'Pending',
        createdAt: '13/9/2025',
        createdBy: 'Created by you',
        isStatic: true,
    },
    {
        id: 'QT-2655-177634884838',
        customer: 'No name',
        email: '',
        vehicle: 'Not selected',
        amount: '',
        status: 'Draft',
        createdAt: '13/9/2025',
        createdBy: 'Created by you',
        isStatic: true,
    },
];

const AllQuotes = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [quotesData, setQuotesData] = useState([]);
    const navigate = useNavigate();

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

    // Load quotes on component mount and combine with static data
    useEffect(() => {
        const loadQuotes = () => {
            const localStorageQuotes = getAllQuotes();

            // Format localStorage quotes to match expected structure
            const formattedLSQuotes = localStorageQuotes.map(quote => ({
                id: quote.id || quote.quoteDetails?.quoteNumber || 'Unknown',
                customer: quote.customer || quote.customerInfo?.name || 'Unknown Customer',
                email: quote.email || quote.customerInfo?.email || '',
                vehicle: quote.vehicle || `${quote.vehicleDetails?.selectedVehicle?.name || 'Not selected'}`,
                amount: quote.amount || (quote.pricing?.finalPayableAmount ? `₹${quote.pricing.finalPayableAmount.toLocaleString()}` : ''),
                status: quote.status || 'Draft',
                createdAt: quote.createdAt || quote.quoteDetails?.date || 'Unknown',
                createdBy: quote.createdBy || 'Created by you',
                isStatic: false,
            }));

            // Combine: localStorage quotes FIRST (top), then static quotes (bottom)
            const combinedQuotes = [...formattedLSQuotes, ...staticQuotesData];

            setQuotesData(combinedQuotes);
            console.log('Loaded quotes:', {
                fromLocalStorage: localStorageQuotes.length,
                static: staticQuotesData.length,
                total: combinedQuotes.length
            });
        };

        loadQuotes();

        // Listen for localStorage changes
        const handleStorageChange = (e) => {
            if (e.key === 'allQuotes') {
                loadQuotes();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Also listen for custom events from same tab
        const handleCustomStorageEvent = () => {
            loadQuotes();
        };

        window.addEventListener('quotesUpdated', handleCustomStorageEvent);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('quotesUpdated', handleCustomStorageEvent);
        };
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleNewQuote = () => {
        navigate('/quotes/add-quote');
    };

    const handleEdit = (quote) => {
        console.log('Edit quote:', quote);
        // Navigate to edit quote page
        // navigate(`/quotes/edit/${quote.id}`);
    };

    // Apply filters and sorting
    const filteredQuotes = quotesData.filter(quote => {
        const matchesSearch = quote.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quote.id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    // Apply sorting - localStorage quotes stay on top, static quotes at bottom
    const sortedQuotes = [...filteredQuotes].sort((a, b) => {
        // First, separate by type: localStorage quotes first, then static
        if (a.isStatic !== b.isStatic) {
            return a.isStatic ? 1 : -1; // localStorage (false) comes first
        }
        // Within the same type, sort by creation date (newest first)
        return new Date(b.createdAt) - new Date(a.createdAt) || b.id.localeCompare(a.id);
    });

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <HeaderContainer>
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            color: THEME_COLORS.text.primary,
                            fontWeight: 600,
                            fontSize: '1.5rem',
                            mb: 0.5,
                        }}
                    >
                        Quotes
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: THEME_COLORS.text.secondary,
                            fontSize: '0.875rem',
                        }}
                    >
                        Manage all types of vehicle quotations
                    </Typography>
                </Box>
                {localStorage.getItem('role')?.toLowerCase() === 'salesexecutive' && (
                    <StyledButton
                        startIcon={<AddIcon />}
                        onClick={handleNewQuote}
                    >
                        New Quote
                    </StyledButton>
                )}
            </HeaderContainer>

            {/* Search and Filters */}
            <SearchContainer>
                <StyledTextField
                    placeholder="Search by quote number, customer name or email..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ flex: 1, maxWidth: '400px' }}
                    size="small"
                />
            </SearchContainer>

            {/* Table Header with count */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
            }}>
                <Typography
                    variant="h6"
                    sx={{
                        color: THEME_COLORS.text.primary,
                        fontSize: '1rem',
                        fontWeight: 500,
                    }}
                >
                    All Quotes ({sortedQuotes.length})
                </Typography>
                <IconButton
                    sx={{
                        color: THEME_COLORS.text.secondary,
                        '&:hover': { color: THEME_COLORS.primary },
                    }}
                >
                    <FilterListIcon />
                </IconButton>
            </Box>

            {/* Table */}
            <StyledTableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Quote #</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>Vehicle</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedQuotes.map((quote, index) => (
                            <TableRow key={quote.id || index}>
                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: THEME_COLORS.text.primary,
                                            fontWeight: 500,
                                            fontSize: '0.8rem',
                                        }}
                                    >
                                        {quote.id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: THEME_COLORS.text.primary,
                                                fontWeight: 500,
                                                fontSize: '0.875rem',
                                            }}
                                        >
                                            {quote.customer}
                                        </Typography>
                                        {quote.email && (
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: THEME_COLORS.text.secondary,
                                                    fontSize: '0.75rem',
                                                }}
                                            >
                                                {quote.email}
                                            </Typography>
                                        )}
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
                                        {quote.vehicle}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: quote.amount ? THEME_COLORS.text.primary : THEME_COLORS.text.secondary,
                                            fontWeight: quote.amount ? 500 : 400,
                                            fontSize: '0.875rem',
                                        }}
                                    >
                                        {quote.amount || 'Not calculated'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <CalendarTodayIcon
                                            sx={{
                                                fontSize: '14px',
                                                color: THEME_COLORS.text.tertiary
                                            }}
                                        />
                                        <Box>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: THEME_COLORS.text.primary,
                                                    fontSize: '0.875rem',
                                                }}
                                            >
                                                {quote.createdAt}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: THEME_COLORS.text.secondary,
                                                    fontSize: '0.75rem',
                                                }}
                                            >
                                                {quote.createdBy}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        onClick={() => handleEdit(quote)}
                                        sx={{
                                            color: THEME_COLORS.text.secondary,
                                            '&:hover': { 
                                                color: THEME_COLORS.primary,
                                                backgroundColor: 'rgba(229, 103, 81, 0.1)',
                                            },
                                        }}
                                        title="Edit Quote"
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>
        </Box>
    );
};

export default AllQuotes;
