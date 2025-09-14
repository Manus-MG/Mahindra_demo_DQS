import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Paper,
    Grid,
    Stepper,
    Step,
    StepLabel,
    Card,
    CardContent,
    Divider,
    IconButton,
    Chip,
    List,
    ListItem,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SaveIcon from '@mui/icons-material/Save';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CarIcon from '@mui/icons-material/DirectionsCar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';

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
};

const steps = [
    { label: 'Vehicle', icon: '1' },
    { label: 'Color', icon: '2' },
    { label: 'Insurance', icon: '3' },
    { label: 'Accessories', icon: '4' },
    { label: 'Scheme', icon: '5' },
    { label: 'Review', icon: '6' },
];

// Styled Components
const HeaderContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2, 0),
}));

const StyledButton = styled(Button)(({ theme, variant }) => ({
    textTransform: 'none',
    fontWeight: 500,
    borderRadius: '8px',
    padding: theme.spacing(1, 2),
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

const CustomStepper = styled(Stepper)(({ theme }) => ({
    backgroundColor: 'transparent',
    padding: theme.spacing(2, 0),
    '& .MuiStepConnector-root': {
        top: 14,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
        '& .MuiStepConnector-line': {
            borderColor: THEME_COLORS.border,
            borderTopWidth: 2,
        },
        '&.Mui-active .MuiStepConnector-line': {
            borderColor: THEME_COLORS.success,
        },
        '&.Mui-completed .MuiStepConnector-line': {
            borderColor: THEME_COLORS.success,
        },
    },
}));

const StepIconContainer = styled('div')(({ active, completed }) => ({
    backgroundColor: completed ? THEME_COLORS.success : active ? THEME_COLORS.primary : THEME_COLORS.background.secondary,
    color: 'white',
    width: 32,
    height: 32,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.875rem',
    fontWeight: 600,
    border: `2px solid ${completed ? THEME_COLORS.success : active ? THEME_COLORS.primary : THEME_COLORS.border}`,
    transition: 'all 0.3s ease',
}));

const CustomStepIcon = ({ icon, active, completed }) => {
    return (
        <StepIconContainer active={active} completed={completed}>
            {icon}
        </StepIconContainer>
    );
};


const PriceSummaryCard = styled(Card)(({ theme }) => ({
    backgroundColor: THEME_COLORS.background.paper,
    border: `1px solid ${THEME_COLORS.border}`,
    borderRadius: '12px',
    height: 'fit-content',
    position: 'sticky',
    top: theme.spacing(2),
}));

const VehicleCard = styled(Card)(({ theme, selected }) => ({
    backgroundColor: selected ? 'rgba(229, 103, 81, 0.1)' : THEME_COLORS.background.paper,
    border: `2px solid ${selected ? THEME_COLORS.primary : THEME_COLORS.border}`,
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
        borderColor: THEME_COLORS.primary,
        backgroundColor: 'rgba(229, 103, 81, 0.05)',
    },
}));


const PDFContent = styled('div')(({ theme }) => ({
    backgroundColor: '#FFFFFF',
    color: '#000000',
    padding: theme.spacing(4),
    fontFamily: 'Arial, sans-serif',
    minHeight: '297mm', // A4 height
    width: '210mm', // A4 width
    margin: '0 auto',
    '& *': {
        color: '#000000 !important',
    },
    '& .pdf-header': {
        textAlign: 'center',
        borderBottom: '2px solid #E56751',
        paddingBottom: theme.spacing(2),
        marginBottom: theme.spacing(3),
    },
    '& .pdf-section': {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1.5),
        border: '1px solid #ddd',
        borderRadius: '8px',
    },
    '& .pdf-section-title': {
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: theme.spacing(1),
        color: '#E56751 !important',
        borderBottom: '1px solid #E56751',
        paddingBottom: '4px',
    },
    '& .pdf-table': {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: theme.spacing(1),
        '& th, & td': {
            border: '1px solid #ddd',
            padding: '8px',
            textAlign: 'left',
            fontSize: '12px',
        },
        '& th': {
            backgroundColor: '#f5f5f5',
            fontWeight: 'bold',
        },
    },
    '& .pdf-total': {
        backgroundColor: '#E56751',
        color: '#FFFFFF !important',
        '& *': {
            color: '#FFFFFF !important',
        },
    },
    '@media print': {
        margin: 0,
        boxShadow: 'none',
    },
}));


const NewQuoteForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate()

    // Comprehensive Form Data Structure
    const [formData, setFormData] = useState({
        customerInfo: {
            name: '',
            email: '',
            phone: '',
        },
        vehicleDetails: {
            transmission: '',
            fuelType: '',
            selectedVehicle: null,
            registrationState: 'Delhi',
            registrationType: 'individual',
            vehicleFinanced: false,
        },
        colorSelection: {
            selectedColor: '',
            specialNotes: '',
        },
        insurance: {
            type: '',
            premium: 0,
            coverage: '',
            provider: '',
        },
        accessories: {
            individualItems: [],
            accessoryPacks: [],
            totalCost: 0,
        },
        financing: {
            scheme: '',
            downPayment: 0,
            emi: 0,
            processingFee: 0,
            interestRate: 0,
            tenure: 0,
        },
        pricing: {
            vehiclePrice: 0,
            insuranceCost: 0,
            accessoriesCost: 0,
            registrationCost: 5000,
            totalCost: 0,
        }
    });

    // Vehicle Options Database
    const vehicleDatabase = [
        // BOLERO Models
        {
            id: 1, name: 'BOLERO', variant: 'B2 BS6.2', fuel: 'DIESEL',
            transmission: 'Manual', price: 970001, engine: '1.5L Turbo', seating: '7-Seater', model: 'BOLERO'
        },
        {
            id: 2, name: 'BOLERO', variant: 'B4 BS6.2', fuel: 'DIESEL',
            transmission: 'Manual', price: 981400, engine: '1.5L Turbo', seating: '7-Seater', model: 'BOLERO'
        },
        {
            id: 3, name: 'BOLERO', variant: 'B6 BS6.2', fuel: 'DIESEL',
            transmission: 'Manual', price: 999900, engine: '1.5L Turbo', seating: '7-Seater', model: 'BOLERO'
        },
        {
            id: 4, name: 'BOLERO', variant: 'B6 OPT BS6.2', fuel: 'DIESEL',
            transmission: 'Manual', price: 1092600, engine: '1.5L Turbo', seating: '7-Seater', model: 'BOLERO'
        },

        // XUV700 Models
        {
            id: 5, name: 'XUV700', variant: 'MX PET MT 5 STR BS6.2', fuel: 'PETROL',
            transmission: 'Manual', price: 1399001, engine: '2.0L Turbo', seating: '5-Seater', model: 'XUV700'
        },
        {
            id: 6, name: 'XUV700', variant: 'MX PET MT 7 STR-E BS6.2', fuel: 'PETROL',
            transmission: 'Manual', price: 1834000, engine: '2.0L Turbo', seating: '7-Seater', model: 'XUV700'
        },
        {
            id: 7, name: 'XUV700', variant: 'AX5 PET MT 7 STR-E BS6.2', fuel: 'PETROL',
            transmission: 'Manual', price: 1883999, engine: '2.0L Turbo', seating: '7-Seater', model: 'XUV700'
        },
        {
            id: 8, name: 'XUV700', variant: 'AX7 PET MT 7 STR BS6.2', fuel: 'PETROL',
            transmission: 'Manual', price: 1949001, engine: '2.0L Turbo', seating: '7-Seater', model: 'XUV700'
        },
        {
            id: 9, name: 'XUV700', variant: 'AX7 PET MT 6 STR Dual Tone - New', fuel: 'PETROL',
            transmission: 'Manual', price: 2134000, engine: '2.0L Turbo', seating: '6-Seater', model: 'XUV700'
        },
        {
            id: 10, name: 'XUV700', variant: 'AX7 L PET AT 7 STR BS6.2 Dual Tone - New', fuel: 'PETROL',
            transmission: 'Automatic', price: 2333999, engine: '2.0L Turbo', seating: '7-Seater', model: 'XUV700'
        },
    ];
    // Accessory Data
    const individualAccessories = [
        { id: 1, name: 'Floor Mats (Premium)', description: 'Weather-resistant rubber mats', price: 2500 },
        { id: 2, name: 'Seat Covers', description: 'Leather-finish seat protection', price: 4500 },
        { id: 3, name: 'Steering Cover', description: 'Premium leather steering wrap', price: 1200 },
        { id: 4, name: 'Car Perfume', description: 'Long-lasting fragrance dispenser', price: 800 },
        { id: 5, name: 'Mobile Holder', description: 'Adjustable dashboard mount', price: 1500 },
        { id: 6, name: 'Sunshade', description: 'Windshield UV protection', price: 900 },
        { id: 7, name: 'Mudflaps', description: 'Splash guard protection', price: 2200 },
        { id: 8, name: 'Chrome Kit', description: 'Exterior chrome accents', price: 5500 },
        { id: 9, name: 'Door Visors', description: 'Rain and wind deflectors', price: 3200 },
        { id: 10, name: 'Alloy Wheels', description: '16-inch premium alloys', price: 18000 },
    ];

    const accessoryPacks = [
        {
            id: 1,
            name: 'Comfort Pack',
            description: 'Essential comfort accessories',
            items: ['Floor Mats', 'Seat Covers', 'Steering Cover'],
            price: 7200,
            originalPrice: 8200
        },
        {
            id: 2,
            name: 'Style Pack',
            description: 'Enhance your vehicle appearance',
            items: ['Chrome Kit', 'Door Visors', 'Mudflaps'],
            price: 9800,
            originalPrice: 10900
        },
        {
            id: 3,
            name: 'Tech Pack',
            description: 'Modern convenience features',
            items: ['Mobile Holder', 'Car Perfume', 'Sunshade'],
            price: 2800,
            originalPrice: 3200
        },
        {
            id: 4,
            name: 'Premium Pack',
            description: 'Complete luxury experience',
            items: ['Alloy Wheels', 'Seat Covers', 'Chrome Kit'],
            price: 26500,
            originalPrice: 28000
        },
    ];

    // Model-specific accessories data
    const modelAccessories = {
        'BOLERO': [
            { id: 1, name: 'Bolero Floor Mats', description: 'Weather-resistant rubber mats', price: 2000 },
            { id: 2, name: 'Bolero Seat Covers', description: 'Durable fabric seat protection', price: 3500 },
            { id: 3, name: 'Bolero Chrome Kit', description: 'Chrome styling accessories', price: 8500 },
            { id: 4, name: 'Bolero Mud Flaps', description: 'Splash guard protection', price: 1800 },
            { id: 5, name: 'Bolero Body Cover', description: 'Weather protection cover', price: 2200 },
        ],
        'XUV700': [
            { id: 1, name: 'XUV700 Premium Floor Mats', description: '3D design rubber mats', price: 4500 },
            { id: 2, name: 'XUV700 Leather Seat Covers', description: 'Premium leather seat protection', price: 14500 },
            { id: 3, name: 'XUV700 Chrome Kit', description: 'Satin chrome styling kit', price: 19800 },
            { id: 4, name: 'XUV700 Side Steps', description: 'Premium side foot steps', price: 25500 },
            { id: 5, name: 'XUV700 Alloy Wheels', description: '18-inch premium alloys', price: 78000 },
            { id: 6, name: 'XUV700 Roof Rails', description: 'Aerodynamic roof rail system', price: 15000 },
        ],
        'SCORPIO': [
            { id: 1, name: 'Scorpio Floor Mats', description: 'Heavy-duty floor protection', price: 2800 },
            { id: 2, name: 'Scorpio Seat Covers', description: 'Rugged seat protection', price: 4200 },
            { id: 3, name: 'Scorpio Chrome Kit', description: 'Bold chrome styling', price: 12500 },
        ],
        'THAR': [
            { id: 1, name: 'Thar Off-road Kit', description: 'Adventure ready accessories', price: 15000 },
            { id: 2, name: 'Thar Rock Sliders', description: 'Underbody protection', price: 8500 },
        ]
    };

    const modelAccessoryPacks = {
        'BOLERO': [
            {
                id: 1,
                name: 'Bolero Essential Pack',
                description: 'Basic accessories package',
                items: ['Floor Mats', 'Seat Covers', 'Mud Flaps'],
                price: 6500,
                originalPrice: 7300
            },
        ],
        'XUV700': [
            {
                id: 1,
                name: 'XUV700 Luxury Pack',
                description: 'Premium luxury accessories',
                items: ['Leather Seats', 'Chrome Kit', 'Premium Mats'],
                price: 35000,
                originalPrice: 38800
            },
            {
                id: 2,
                name: 'XUV700 Adventure Pack',
                description: 'Ready for any terrain',
                items: ['Side Steps', 'Roof Rails', 'Alloy Wheels'],
                price: 85000,
                originalPrice: 92000
            },
        ],
        // Add other models...
    };


    // Insurance Options
    const insuranceOptions = [
        {
            id: 'own',
            type: 'own',
            provider: 'Customer\'s Own',
            premium: 0,
            coverage: 'Customer arranged',
            description: 'Customer will arrange their own insurance separately'
        },
        {
            id: 'comprehensive',
            type: 'comprehensive',
            provider: 'Bajaj Allianz',
            premium: 25000,
            coverage: '95.00% IDV Coverage',
            description: 'Covers theft, accidents, and natural disasters'
        },
        {
            id: 'motor_secure',
            type: 'motor_secure',
            provider: 'HDFC ERGO',
            premium: 19000,
            coverage: '85.00% IDV Coverage',
            description: 'Basic comprehensive coverage'
        }
    ];

    // Financing Schemes
    const financingSchemes = [
        {
            id: 'cash',
            name: 'Cash Payment',
            downPayment: 100,
            emi: 0,
            processingFee: 0,
            interestRate: 0,
            tenure: 0,
            description: 'Pay full amount upfront - No interest charges'
        },
        {
            id: 'bank_7_years',
            name: 'Bank Loan - 7 Years',
            downPayment: 20,
            emi: 12450,
            processingFee: 5000,
            interestRate: 8.5,
            tenure: 84,
            description: 'Standard bank financing with competitive rates'
        },
        {
            id: 'bank_5_years',
            name: 'Bank Loan - 5 Years',
            downPayment: 25,
            emi: 16250,
            processingFee: 4500,
            interestRate: 8.2,
            tenure: 60,
            description: 'Faster repayment with lower total interest'
        },
        {
            id: 'company_finance',
            name: 'Company Finance Scheme',
            downPayment: 15,
            emi: 11850,
            processingFee: 2000,
            interestRate: 7.9,
            tenure: 84,
            description: 'Direct financing from Mahindra Finance'
        },
        {
            id: 'lease',
            name: 'Lease Option',
            downPayment: 0,
            emi: 9500,
            processingFee: 25000,
            interestRate: 0,
            tenure: 48,
            description: 'Lease with option to buy at end of term'
        }
    ];

    const [accessoryTab, setAccessoryTab] = useState('individual');
    // Get current selected model
const getCurrentModel = () => {
    return formData.vehicleDetails.selectedVehicle?.model || '';
};

// Get accessories for current model
const getCurrentModelAccessories = () => {
    const currentModel = getCurrentModel();
    return modelAccessories[currentModel] || [];
};

// Get accessory packs for current model
const getCurrentModelAccessoryPacks = () => {
    const currentModel = getCurrentModel();
    return modelAccessoryPacks[currentModel] || [];
};


    // Get filtered vehicles based on transmission and fuel selection
    const getFilteredVehicles = () => {
        if (!formData.vehicleDetails.transmission || !formData.vehicleDetails.fuelType) {
            return [];
        }
        return vehicleDatabase.filter(vehicle =>
            vehicle.transmission === formData.vehicleDetails.transmission &&
            vehicle.fuel === formData.vehicleDetails.fuelType
        );
    };

    // Update form data function
    const updateFormData = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    // Update pricing calculation
    useEffect(() => {
        const vehiclePrice = formData.vehicleDetails.selectedVehicle?.price || 0;
        const insuranceCost = formData.insurance.premium || 0;
        const accessoriesCost = formData.accessories.totalCost || 0;
        const registrationCost = formData.pricing.registrationCost || 5000;

        const totalCost = vehiclePrice + insuranceCost + accessoriesCost + registrationCost;

        setFormData(prev => ({
            ...prev,
            pricing: {
                ...prev.pricing,
                vehiclePrice,
                insuranceCost,
                accessoriesCost,
                totalCost
            }
        }));
    }, [
        formData.vehicleDetails.selectedVehicle,
        formData.insurance.premium,
        formData.accessories.totalCost
    ]);

    // Update accessories total cost
    useEffect(() => {
        const individualTotal = formData.accessories.individualItems.reduce((sum, item) => sum + item.price, 0);
        const packTotal = formData.accessories.accessoryPacks.reduce((sum, item) => sum + item.price, 0);
        const totalCost = individualTotal + packTotal;

        setFormData(prev => ({
            ...prev,
            accessories: {
                ...prev.accessories,
                totalCost
            }
        }));
    }, [formData.accessories.individualItems, formData.accessories.accessoryPacks]);

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    const handleVehicleSelect = (vehicle) => {
        updateFormData('vehicleDetails', 'selectedVehicle', vehicle);
        
        // Clear accessories when vehicle changes
        setFormData(prev => ({
            ...prev,
            accessories: {
                individualItems: [],
                accessoryPacks: [],
                totalCost: 0
            }
        }));
    };
    

    const handleAccessoryToggle = (accessory) => {
        const currentItems = formData.accessories.individualItems;
        const exists = currentItems.find(item => item.id === accessory.id);

        if (exists) {
            const newItems = currentItems.filter(item => item.id !== accessory.id);
            setFormData(prev => ({
                ...prev,
                accessories: {
                    ...prev.accessories,
                    individualItems: newItems
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                accessories: {
                    ...prev.accessories,
                    individualItems: [...currentItems, accessory]
                }
            }));
        }
    };

    const handlePackToggle = (pack) => {
        const currentPacks = formData.accessories.accessoryPacks;
        const exists = currentPacks.find(item => item.id === pack.id);

        if (exists) {
            const newPacks = currentPacks.filter(item => item.id !== pack.id);
            setFormData(prev => ({
                ...prev,
                accessories: {
                    ...prev.accessories,
                    accessoryPacks: newPacks
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                accessories: {
                    ...prev.accessories,
                    accessoryPacks: [...currentPacks, pack]
                }
            }));
        }
    };

    const handleInsuranceSelect = (insurance) => {
        setFormData(prev => ({
            ...prev,
            insurance: {
                type: insurance.type,
                premium: insurance.premium,
                coverage: insurance.coverage,
                provider: insurance.provider
            }
        }));
    };

    const handleSchemeSelect = (scheme) => {
        const vehiclePrice = formData.vehicleDetails.selectedVehicle?.price || 0;
        const downPaymentAmount = (vehiclePrice * scheme.downPayment) / 100;

        setFormData(prev => ({
            ...prev,
            financing: {
                scheme: scheme.id,
                schemeName: scheme.name,
                downPayment: downPaymentAmount,
                emi: scheme.emi,
                processingFee: scheme.processingFee,
                interestRate: scheme.interestRate,
                tenure: scheme.tenure,
                description: scheme.description
            }
        }));
    };

    // Update your existing handleGeneratePDF function
    //     const handleGeneratePDF = async () => {
    //         try {
    //             // Create a temporary div for PDF content
    //             const pdfElement = document.createElement('div');
    //             pdfElement.style.position = 'fixed';
    //             pdfElement.style.top = '-9999px';
    //             pdfElement.style.left = '-9999px';
    //             pdfElement.style.width = '794px'; // A4 width in pixels at 96 DPI
    //             pdfElement.style.backgroundColor = 'white';
    //             pdfElement.style.padding = '40px';
    //             pdfElement.style.fontFamily = 'Arial, sans-serif';

    //             const currentDate = new Date().toLocaleDateString('en-IN', {
    //                 day: '2-digit',
    //                 month: '2-digit',
    //                 year: 'numeric',
    //             });

    //             const validUntilDate = new Date();
    //             validUntilDate.setDate(validUntilDate.getDate() + 30);
    //             const validUntil = validUntilDate.toLocaleDateString('en-IN', {
    //                 day: '2-digit',
    //                 month: '2-digit',
    //                 year: 'numeric',
    //             });

    //             const quoteNumber = `QT-2025-${Date.now()}`;

    //             // Calculate TCS (1% of gross on-road price)
    //             const tcsAmount = Math.round(formData.pricing.totalCost * 0.01);
    //             const finalPayableAmount = formData.pricing.totalCost + tcsAmount;

    //             // Generate PDF content HTML matching the sample format exactly
    //             pdfElement.innerHTML = `
    //         <div style="color: #000; font-family: Arial, sans-serif; line-height: 1.4;">
    //           <!-- Header -->
    //           <div style="margin-bottom: 30px;">
    //             <h1 style="color: #000; margin: 0 0 20px 0; font-size: 24px; font-weight: bold;">Quotation</h1>

    //             <div style="margin-bottom: 8px;">
    //               <strong>Quote Number:</strong> ${quoteNumber}
    //             </div>
    //             <div style="margin-bottom: 8px;">
    //               <strong>Date:</strong> ${currentDate}
    //             </div>
    //             <div style="margin-bottom: 8px;">
    //               <strong>Valid Until:</strong> ${validUntil}
    //             </div>
    //             <div style="margin-bottom: 8px;">
    //               <strong>Customer:</strong> ${formData.customerInfo.name || 'Not Specified'}
    //             </div>
    //             <div style="margin-bottom: 8px;">
    //               <strong>Phone:</strong> ${formData.customerInfo.phone || 'Not Specified'}
    //             </div>
    //             <div style="margin-bottom: 20px;">
    //               <strong>Email:</strong> ${formData.customerInfo.email || 'Not Specified'}
    //             </div>
    //           </div>

    //           <!-- Price Breakdown Header -->
    //           <h2 style="color: #000; margin: 30px 0 20px 0; font-size: 18px; font-weight: bold;">Price Breakdown</h2>

    //           <!-- Vehicle Details -->
    //           <div style="margin-bottom: 20px;">
    //             <div style="margin-bottom: 8px;">
    //               <strong>Vehicle Details:</strong>
    //             </div>
    //             <div style="margin-bottom: 4px; margin-left: 10px;">
    //               Model: ${formData.vehicleDetails.selectedVehicle?.name || 'Not Specified'}
    //             </div>
    //             <div style="margin-bottom: 4px; margin-left: 10px;">
    //               Variant: ${formData.vehicleDetails.selectedVehicle?.variant || 'Not Specified'}
    //             </div>
    //             <div style="margin-bottom: 15px; margin-left: 10px;">
    //               Color: ${formData.colorSelection.selectedColor || 'Not Specified'}
    //             </div>
    //           </div>

    //           <!-- Price Table -->
    //           <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 14px;">
    //             <thead>
    //               <tr>
    //                 <th style="border: 1px solid #000; padding: 8px; text-align: left; background-color: #f0f0f0; font-weight: bold;">Component</th>
    //                 <th style="border: 1px solid #000; padding: 8px; text-align: left; background-color: #f0f0f0; font-weight: bold;">Amount</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               <tr>
    //                 <td style="border: 1px solid #000; padding: 8px;">Ex-Showroom Price</td>
    //                 <td style="border: 1px solid #000; padding: 8px; font-family: monospace;">₹${formData.pricing.vehiclePrice.toLocaleString()}</td>
    //               </tr>
    //               <tr>
    //                 <td style="border: 1px solid #000; padding: 8px;">Handling & Logistics</td>
    //                 <td style="border: 1px solid #000; padding: 8px; font-family: monospace;">₹17,700</td>
    //               </tr>
    //               <tr>
    //                 <td style="border: 1px solid #000; padding: 8px;">Road Tax</td>
    //                 <td style="border: 1px solid #000; padding: 8px; font-family: monospace;">₹0</td>
    //               </tr>
    //               <tr>
    //                 <td style="border: 1px solid #000; padding: 8px;">RTO Fees</td>
    //                 <td style="border: 1px solid #000; padding: 8px; font-family: monospace;">₹${formData.pricing.registrationCost.toLocaleString()}</td>
    //               </tr>
    //               <tr>
    //                 <td style="border: 1px solid #000; padding: 8px;">Insurance</td>
    //                 <td style="border: 1px solid #000; padding: 8px; font-family: monospace;">₹${formData.pricing.insuranceCost.toLocaleString()}</td>
    //               </tr>
    //               <tr>
    //                 <td style="border: 1px solid #000; padding: 8px;">Accessories</td>
    //                 <td style="border: 1px solid #000; padding: 8px; font-family: monospace;">₹${formData.pricing.accessoriesCost.toLocaleString()}</td>
    //               </tr>
    //               <tr style="font-weight: bold;">
    //                 <td style="border: 1px solid #000; padding: 8px; font-weight: bold;">Gross On-Road Price</td>
    //                 <td style="border: 1px solid #000; padding: 8px; font-weight: bold; font-family: monospace;">₹${formData.pricing.totalCost.toLocaleString()}</td>
    //               </tr>
    //               <tr>
    //                 <td style="border: 1px solid #000; padding: 8px;">Scheme Discount (${formData.financing.schemeName || 'Cash'})</td>
    //                 <td style="border: 1px solid #000; padding: 8px; font-family: monospace;">- ₹0</td>
    //               </tr>
    //               <tr>
    //                 <td style="border: 1px solid #000; padding: 8px;">Scheme Benefit (Accessories)</td>
    //                 <td style="border: 1px solid #000; padding: 8px; font-family: monospace;">- ₹0</td>
    //               </tr>
    //               <tr>
    //                 <td style="border: 1px solid #000; padding: 8px;">TCS (1%)</td>
    //                 <td style="border: 1px solid #000; padding: 8px; font-family: monospace;">₹${tcsAmount.toLocaleString()}</td>
    //               </tr>
    //               <tr style="font-weight: bold; background-color: #f0f0f0;">
    //                 <td style="border: 1px solid #000; padding: 8px; font-weight: bold;">Final Amount Payable</td>
    //                 <td style="border: 1px solid #000; padding: 8px; font-weight: bold; font-family: monospace;">₹${finalPayableAmount.toLocaleString()}</td>
    //               </tr>
    //             </tbody>
    //           </table>

    //           <!-- Terms & Conditions -->
    //           <h2 style="color: #000; margin: 30px 0 15px 0; font-size: 18px; font-weight: bold;">Terms & Conditions</h2>

    //           <div style="margin-bottom: 8px;">• This quotation is valid for 30 days from the date of issue.</div>
    //           <div style="margin-bottom: 8px;">• Prices are subject to change without prior notice.</div>
    //           <div style="margin-bottom: 8px;">• Road tax and registration fees are as per current RTO rates.</div>
    //           <div style="margin-bottom: 8px;">• Insurance premium is indicative and subject to final calculation.</div>
    //           <div style="margin-bottom: 8px;">• Delivery is subject to availability and booking confirmation.</div>
    //           <div style="margin-bottom: 8px;">• All accessories are optional and charged separately.</div>

    //           <!-- JSON Data Section -->
    //           <h2 style="color: #000; margin: 40px 0 15px 0; font-size: 18px; font-weight: bold; page-break-before: always;">Complete Form Data (JSON)</h2>

    //           <div style="background-color: #f5f5f5; border: 1px solid #ddd; padding: 15px; border-radius: 5px; font-family: 'Courier New', monospace; font-size: 10px; white-space: pre-wrap; word-wrap: break-word; line-height: 1.2;">
    //   ${JSON.stringify({
    //                 quoteDetails: {
    //                     quoteNumber: quoteNumber,
    //                     date: currentDate,
    //                     validUntil: validUntil,
    //                     status: 'completed'
    //                 },
    //                 ...formData,
    //                 pricing: {
    //                     ...formData.pricing,
    //                     handlingLogistics: 17700,
    //                     roadTax: 0,
    //                     tcs: tcsAmount,
    //                     finalPayableAmount: finalPayableAmount
    //                 },
    //                 pdfGenerated: new Date().toISOString()
    //             }, null, 2)}
    //           </div>
    //         </div>
    //       `;

    //             document.body.appendChild(pdfElement);

    //             // Generate PDF using html2canvas and jsPDF
    //             const canvas = await html2canvas(pdfElement, {
    //                 scale: 2,
    //                 useCORS: true,
    //                 allowTaint: true,
    //                 backgroundColor: '#ffffff',
    //                 width: 794,
    //                 height: pdfElement.offsetHeight,
    //             });

    //             document.body.removeChild(pdfElement);

    //             const imgData = canvas.toDataURL('image/png');
    //             const pdf = new jsPDF('p', 'mm', 'a4');

    //             const imgWidth = 210; // A4 width in mm
    //             const pageHeight = 295; // A4 height in mm
    //             const imgHeight = (canvas.height * imgWidth) / canvas.width;
    //             let heightLeft = imgHeight;

    //             let position = 0;

    //             // Add first page
    //             pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    //             heightLeft -= pageHeight;

    //             // Add additional pages if needed
    //             while (heightLeft >= 0) {
    //                 position = heightLeft - imgHeight;
    //                 pdf.addPage();
    //                 pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    //                 heightLeft -= pageHeight;
    //             }

    //             // Save the PDF
    //             const fileName = `Quotation_${quoteNumber.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    //             pdf.save(fileName);

    //             // Update form data status and save to localStorage
    //             const completeQuoteData = {
    //                 quoteDetails: {
    //                     quoteNumber: quoteNumber,
    //                     date: currentDate,
    //                     validUntil: validUntil,
    //                     status: 'completed'
    //                 },
    //                 ...formData,
    //                 pricing: {
    //                     ...formData.pricing,
    //                     handlingLogistics: 17700,
    //                     roadTax: 0,
    //                     tcs: tcsAmount,
    //                     finalPayableAmount: finalPayableAmount
    //                 },
    //                 pdfGenerated: new Date().toISOString()
    //             };

    //             // Save complete quote data to localStorage
    //             localStorage.setItem(`quote_${quoteNumber}`, JSON.stringify(completeQuoteData));

    //             console.log('PDF generated successfully!', completeQuoteData);
    //             alert(`PDF generated successfully!\nQuote Number: ${quoteNumber}\nFinal Amount: ₹${finalPayableAmount.toLocaleString()}`);

    //         } catch (error) {
    //             console.error('Error generating PDF:', error);
    //             alert('Error generating PDF. Please try again.');
    //         }
    //     };


    const handleGeneratePDF = async () => {
        try {
            // Create a temporary div for PDF content - BALANCED PADDING
            const pdfElement = document.createElement('div');
            pdfElement.style.position = 'fixed';
            pdfElement.style.top = '-9999px';
            pdfElement.style.left = '-9999px';
            pdfElement.style.width = '794px';
            pdfElement.style.backgroundColor = 'white';
            pdfElement.style.padding = '15px'; // Professional balanced padding
            pdfElement.style.margin = '0px';
            pdfElement.style.fontFamily = 'Arial, sans-serif';
            pdfElement.style.fontSize = '12px';
            pdfElement.style.lineHeight = '1.3';
    
            const currentDate = new Date().toLocaleDateString('en-IN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
    
            const validUntilDate = new Date();
            validUntilDate.setDate(validUntilDate.getDate() + 30);
            const validUntil = validUntilDate.toLocaleDateString('en-IN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
    
            const quoteNumber = `QT-2025-${Date.now()}`;
    
            // Calculate TCS (1% of gross on-road price)
            const tcsAmount = Math.round(formData.pricing.totalCost * 0.01);
            const finalPayableAmount = formData.pricing.totalCost + tcsAmount;
    
            // Different logos for left and right
            const leftLogoBase64 = "/logo.jpeg";      // Left side logo
            const rightLogoBase64 = "/logo2.jpeg";    // Right side logo (different)
    
            // Generate PDF content - WITH BLACK HEADER BACKGROUND AND COMPANY TEXT
            pdfElement.innerHTML = `
            <div style="color: #000; font-family: Arial, sans-serif; line-height: 1.3; font-size: 12px; margin: 0; padding: 0;">
              <!-- BLACK HEADER WITH LOGOS AND COMPANY INFO -->
              <div style="background-color: #000000; color: #ffffff; display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px; padding: 20px 15px; border-radius: 8px;">
                <div style="flex: 0 0 130px;">
                  <img src="${leftLogoBase64}" style="max-width: 125px; max-height: 70px; width: auto; height: auto; object-fit: contain; display: block; filter: brightness(0) invert(1);" alt="Company Logo Left" onerror="this.style.display='none'">
                </div>
                <div style="flex: 1; text-align: center; margin: 0 15px;">
                  <div style="color: #ffffff; margin-bottom: 8px; font-size: 18px; font-weight: bold; letter-spacing: 1px;">INDRAPRASTH AUTOMOBILE</div>
                  <div style="color: #ffffff; margin-bottom: 12px; font-size: 16px; font-weight: 600; letter-spacing: 0.5px;">M&M</div>
                  <h1 style="color: #ffffff; margin: 0; padding: 0; font-size: 28px; font-weight: bold; line-height: 1; letter-spacing: 2px;">QUOTATION</h1>
                </div>
                <div style="flex: 0 0 130px; text-align: right;">
                  <img src="${rightLogoBase64}" style="max-width: 125px; max-height: 70px; width: auto; height: auto; object-fit: contain; display: block; margin-left: auto; filter: brightness(0) invert(1);" alt="Company Logo Right" onerror="this.style.display='none'">
                </div>
              </div>
      
              <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                <div style="width: 48%;">
                  <div style="margin-bottom: 4px; font-size: 11px;"><strong>Quote Number:</strong> ${quoteNumber}</div>
                  <div style="margin-bottom: 4px; font-size: 11px;"><strong>Date:</strong> ${currentDate}</div>
                  <div style="margin-bottom: 4px; font-size: 11px;"><strong>Valid Until:</strong> ${validUntil}</div>
                </div>
                <div style="width: 48%;">
                  <div style="margin-bottom: 4px; font-size: 11px;"><strong>Customer:</strong> ${formData.customerInfo.name || 'Not Specified'}</div>
                  <div style="margin-bottom: 4px; font-size: 11px;"><strong>Phone:</strong> ${formData.customerInfo.phone || 'Not Specified'}</div>
                  <div style="margin-bottom: 4px; font-size: 11px;"><strong>Email:</strong> ${formData.customerInfo.email || 'Not Specified'}</div>
                </div>
              </div>
      
              <div style="margin-bottom: 12px; font-size: 11px; background-color: #f5f5f5; padding: 8px; border-radius: 3px;">
                <strong>Vehicle Details:</strong> ${formData.vehicleDetails.selectedVehicle?.name || 'Not Specified'} | 
                <strong>Variant:</strong> ${formData.vehicleDetails.selectedVehicle?.variant || 'Not Specified'} | 
                <strong>Color:</strong> ${formData.colorSelection.selectedColor || 'Not Specified'}
              </div>
      
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: 10px;">
                <thead>
                  <tr>
                    <th style="border: 1px solid #000; padding: 6px; text-align: left; background-color: #e0e0e0; font-weight: bold;">Component</th>
                    <th style="border: 1px solid #000; padding: 6px; text-align: right; background-color: #e0e0e0; font-weight: bold;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="border: 1px solid #000; padding: 5px;">Ex-Showroom Price</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: right; font-family: monospace;">₹${formData.pricing.vehiclePrice.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #000; padding: 5px;">Handling & Logistics</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: right; font-family: monospace;">₹17,700</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #000; padding: 5px;">Road Tax</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: right; font-family: monospace;">₹0</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #000; padding: 5px;">RTO Fees</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: right; font-family: monospace;">₹${formData.pricing.registrationCost.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #000; padding: 5px;">Insurance</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: right; font-family: monospace;">₹${formData.pricing.insuranceCost.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #000; padding: 5px;">Accessories</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: right; font-family: monospace;">₹${formData.pricing.accessoriesCost.toLocaleString()}</td>
                  </tr>
                  <tr style="font-weight: bold; background-color: #f0f0f0;">
                    <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">Gross On-Road Price</td>
                    <td style="border: 1px solid #000; padding: 5px; font-weight: bold; text-align: right; font-family: monospace;">₹${formData.pricing.totalCost.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #000; padding: 5px;">Scheme Discount (${formData.financing.schemeName || 'Cash'})</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: right; font-family: monospace;">- ₹0</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #000; padding: 5px;">TCS (1%)</td>
                    <td style="border: 1px solid #000; padding: 5px; text-align: right; font-family: monospace;">₹${tcsAmount.toLocaleString()}</td>
                  </tr>
                  <tr style="font-weight: bold; background-color: #d0d0d0;">
                    <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">Final Amount Payable</td>
                    <td style="border: 1px solid #000; padding: 5px; font-weight: bold; text-align: right; font-family: monospace;">₹${finalPayableAmount.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
      
              <div style="margin-bottom: 12px;">
                <h3 style="color: #000; margin: 0 0 6px 0; font-size: 13px; font-weight: bold;">Terms & Conditions</h3>
                <div style="font-size: 9px; line-height: 1.4;">
                  <div style="margin-bottom: 3px;">• This quotation is valid for 30 days from the date of issue.</div>
                  <div style="margin-bottom: 3px;">• Prices are subject to change without prior notice.</div>
                  <div style="margin-bottom: 3px;">• Road tax and registration fees are as per current RTO rates.</div>
                  <div style="margin-bottom: 3px;">• Insurance premium is indicative and subject to final calculation.</div>
                  <div style="margin-bottom: 3px;">• Delivery is subject to availability and booking confirmation.</div>
                  <div style="margin-bottom: 3px;">• All accessories are optional and charged separately.</div>
                </div>
              </div>
      
              <div style="margin-top: 20px; border-top: 1px solid #ccc; padding-top: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                  <div style="width: 45%; text-align: center;">
                    <div style="height: 60px; margin-bottom: 8px; border-bottom: 1px solid #000;"></div>
                    <div style="font-size: 11px; font-weight: bold; margin-bottom: 2px;">Customer</div>
                    <div style="font-size: 10px; margin-bottom: 2px;">Customer Signature</div>
                    <div style="font-size: 9px; color: #666;">Date: ___________</div>
                  </div>
                  <div style="width: 45%; text-align: center;">
                    <div style="height: 60px; margin-bottom: 8px; border-bottom: 1px solid #000;"></div>
                    <div style="font-size: 11px; font-weight: bold; margin-bottom: 2px;">Sales Manager</div>
                    <div style="font-size: 10px; margin-bottom: 2px;">Authorized Signatory</div>
                    <div style="font-size: 9px; color: #666;">Company Seal & Date</div>
                  </div>
                </div>
              </div>
            </div>
          `;
    
            document.body.appendChild(pdfElement);
    
            const canvas = await html2canvas(pdfElement, {
                scale: 1.5,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                width: 794,
                height: pdfElement.offsetHeight,
                logging: false,
                letterRendering: true,
                imageTimeout: 0,
                scrollX: 0,
                scrollY: 0
            });
    
            document.body.removeChild(pdfElement);
    
            const imgData = canvas.toDataURL('image/png', 0.85);
            const pdf = new jsPDF('p', 'mm', 'a4');
    
            const imgWidth = 210;
            const pageHeight = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
            // Set top margin to 5mm (approx. 19px) to meet your requirement.
            const topMargin = 5;
            const bottomMargin = 5;
            const availableHeight = pageHeight - topMargin - bottomMargin;
    
            if (imgHeight > availableHeight) {
                // This handles content that is taller than one page.
                const scaleFactor = availableHeight / imgHeight;
                const scaledWidth = imgWidth * scaleFactor;
                const scaledHeight = availableHeight;
                const xOffset = (210 - scaledWidth) / 2;
                
                pdf.addImage(imgData, 'PNG', xOffset, topMargin, scaledWidth, scaledHeight);
            } else {
                // Fixed: Removed the vertical centering logic that added white space.
                const yOffset = topMargin;
                pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight);
            }
            
            const fileName = `Quotation_${quoteNumber.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
            pdf.save(fileName);
    
            // **NEW PART: Save to localStorage Array** 
            const newQuoteData = {
                id: quoteNumber,
                customer: formData.customerInfo.name || 'Not Specified',
                email: formData.customerInfo.email || '',
                phone: formData.customerInfo.phone || '',
                vehicle: `${formData.vehicleDetails.selectedVehicle?.name || 'Not selected'} ${formData.vehicleDetails.selectedVehicle?.variant || ''}`.trim(),
                color: formData.colorSelection.selectedColor || 'Not selected',
                amount: `₹${finalPayableAmount.toLocaleString()}`,
                status: 'Pending', // You can change this based on your business logic
                createdAt: currentDate,
                createdBy: 'Created by you',
                quoteDetails: {
                    quoteNumber: quoteNumber,
                    date: currentDate,
                    validUntil: validUntil,
                    status: 'completed'
                },
                customerInfo: formData.customerInfo,
                vehicleDetails: formData.vehicleDetails,
                colorSelection: formData.colorSelection,
                pricing: {
                    ...formData.pricing,
                    handlingLogistics: 17700,
                    roadTax: 0,
                    tcs: tcsAmount,
                    finalPayableAmount: finalPayableAmount
                },
                financing: formData.financing,
                insurance: formData.insurance,
                accessories: formData.accessories,
                pdfGenerated: new Date().toISOString()
            };
    
            // Get existing quotes array from localStorage or create empty array
            const existingQuotes = JSON.parse(localStorage.getItem('allQuotes')) || [];
            
            // Add new quote to the beginning of array (newest first)
            existingQuotes.unshift(newQuoteData);
            
            // Save updated array back to localStorage
            localStorage.setItem('allQuotes', JSON.stringify(existingQuotes));
    
            // Also keep individual quote for backward compatibility
            localStorage.setItem(`quote_${quoteNumber}`, JSON.stringify(newQuoteData));
    
            console.log('PDF generated successfully!', newQuoteData);
            console.log('Total quotes in localStorage:', existingQuotes.length);
            
            // Show success alert
            alert(`PDF generated successfully!\nQuote Number: ${quoteNumber}\nFinal Amount: ₹${finalPayableAmount.toLocaleString()}\nTotal Quotes: ${existingQuotes.length}`);
    
            // **PAGE RELOAD AFTER SUCCESS**
            setTimeout(() => {
                window.location.reload();
            }, 1000); // Small delay to ensure alert is seen and PDF download completes
    
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
        }
    };
    
    
    
    

    // Helper function to get all quotes from localStorage
    const getAllQuotes = () => {
        const quotes = localStorage.getItem('allQuotes');
        return quotes ? JSON.parse(quotes) : [];
    };

    // Helper function to get single quote by ID
    const getQuoteById = (quoteId) => {
        const quotes = getAllQuotes();
        return quotes.find(quote => quote.id === quoteId);
    };

    // Helper function to update quote status
    const updateQuoteStatus = (quoteId, newStatus) => {
        const quotes = getAllQuotes();
        const quoteIndex = quotes.findIndex(quote => quote.id === quoteId);

        if (quoteIndex !== -1) {
            quotes[quoteIndex].status = newStatus;
            quotes[quoteIndex].updatedAt = new Date().toLocaleDateString('en-IN');
            localStorage.setItem('allQuotes', JSON.stringify(quotes));
            return true;
        }
        return false;
    };

    // Helper function to delete quote
    const deleteQuote = (quoteId) => {
        const quotes = getAllQuotes();
        const filteredQuotes = quotes.filter(quote => quote.id !== quoteId);
        localStorage.setItem('allQuotes', JSON.stringify(filteredQuotes));

        // Also remove individual quote
        localStorage.removeItem(`quote_${quoteId}`);

        return filteredQuotes.length;
    };





    // Also update the handleSaveDraft function to match the same format
    const handleSaveDraft = () => {
        const currentDate = new Date().toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });

        const validUntilDate = new Date();
        validUntilDate.setDate(validUntilDate.getDate() + 30);
        const validUntil = validUntilDate.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });

        const draftNumber = `DRAFT-${Date.now()}`;

        const draftData = {
            quoteDetails: {
                quoteNumber: draftNumber,
                date: currentDate,
                validUntil: validUntil,
                status: 'draft'
            },
            ...formData,
            lastSaved: new Date().toISOString()
        };

        localStorage.setItem(`draft_${draftNumber}`, JSON.stringify(draftData));
        console.log('Draft saved successfully!', draftData);
        alert(`Draft saved successfully!\nDraft Number: ${draftNumber}`);
    };

    const getVariantsByModel = (selectedModel) => {
        if (!selectedModel) return [];
        return vehicleDatabase.filter(vehicle => vehicle.name === selectedModel);
    };
    const getVehicleByModelAndVariant = (model, variant) => {
        return vehicleDatabase.find(vehicle =>
            vehicle.name === model && vehicle.variant === variant
        );
    };

    const renderStepContent = () => {
        switch (activeStep) {
            case 0:
                return (
                    <Box>
                        <Typography variant="h6" sx={{ color: THEME_COLORS.text.primary, mb: 2, fontWeight: 600 }}>
                            Step 1: Vehicle Selection
                        </Typography>
                        <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary, mb: 3 }}>
                            Choose the vehicle model and provide registration details
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="subtitle1" sx={{ color: THEME_COLORS.text.primary, mb: 2, fontWeight: 600 }}>
                                    Customer Information
                                </Typography>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <StyledTextField
                                        label="Customer Name"
                                        value={formData.customerInfo.name}
                                        onChange={(e) => updateFormData('customerInfo', 'name', e.target.value)}
                                        fullWidth
                                        size="small"
                                    />

                                    <StyledTextField
                                        label="Email (Optional)"
                                        value={formData.customerInfo.email}
                                        onChange={(e) => updateFormData('customerInfo', 'email', e.target.value)}
                                        fullWidth
                                        size="small"
                                    />

                                    <StyledTextField
                                        label="Phone"
                                        placeholder="Enter phone number"
                                        value={formData.customerInfo.phone}
                                        onChange={(e) => updateFormData('customerInfo', 'phone', e.target.value)}
                                        fullWidth
                                        size="small"
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Typography variant="subtitle1" sx={{ color: THEME_COLORS.text.primary, mb: 2, fontWeight: 600 }}>
                                    Vehicle Selection
                                </Typography>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                                    {/* Model Selection - First Dropdown */}
                                    <FormControl fullWidth size="small">
                                        <InputLabel sx={{ color: THEME_COLORS.text.secondary }}>Select Model *</InputLabel>
                                        <StyledSelect
                                            value={formData.vehicleDetails.selectedModel || ''}
                                            label="Select Model *"
                                            onChange={(e) => {
                                                const selectedModel = e.target.value;
                                                updateFormData('vehicleDetails', 'selectedModel', selectedModel);
                                                // Reset variant and vehicle when model changes
                                                updateFormData('vehicleDetails', 'selectedVariant', '');
                                                updateFormData('vehicleDetails', 'selectedVehicle', null);
                                            }}
                                        >
                                            <MenuItem value="">Choose Model</MenuItem>
                                            <MenuItem value="BOLERO">BOLERO</MenuItem>
                                            <MenuItem value="XUV700">XUV700</MenuItem>
                                            <MenuItem value="SCORPIO">SCORPIO</MenuItem>
                                            <MenuItem value="THAR">THAR</MenuItem>
                                        </StyledSelect>
                                    </FormControl>

                                    {/* Variant Selection - Second Dropdown (appears after model selection) */}
                                    {formData.vehicleDetails.selectedModel && (
                                        <FormControl fullWidth size="small">
                                            <InputLabel sx={{ color: THEME_COLORS.text.secondary }}>Select Variant *</InputLabel>
                                            <StyledSelect
                                                value={formData.vehicleDetails.selectedVariant || ''}
                                                label="Select Variant *"
                                                onChange={(e) => {
                                                    const selectedVariant = e.target.value;
                                                    updateFormData('vehicleDetails', 'selectedVariant', selectedVariant);

                                                    // Find and set the complete vehicle data based on model + variant
                                                    const vehicleData = getVehicleByModelAndVariant(formData.vehicleDetails.selectedModel, selectedVariant);
                                                    updateFormData('vehicleDetails', 'selectedVehicle', vehicleData);
                                                }}
                                            >
                                                <MenuItem value="">Choose Variant</MenuItem>
                                                {getVariantsByModel(formData.vehicleDetails.selectedModel).map((variant) => (
                                                    <MenuItem key={variant.variant} value={variant.variant}>
                                                        {variant.variant} - {variant.fuel} - ₹{variant.price.toLocaleString()}
                                                    </MenuItem>
                                                ))}
                                            </StyledSelect>
                                        </FormControl>
                                    )}

                                    {/* Fuel Type and Transmission Display */}
                                    {formData.vehicleDetails.selectedVehicle && (
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <StyledTextField
                                                label="Fuel Type"
                                                value={formData.vehicleDetails.selectedVehicle.fuel}
                                                fullWidth
                                                size="small"
                                                disabled
                                            // sx={{ '& .MuiInputBase-input.Mui-disabled': { color: THEME_COLORS.text.primary } }}
                                            />
                                            <StyledTextField
                                                label="Transmission"
                                                value={formData.vehicleDetails.selectedVehicle.transmission}
                                                fullWidth
                                                size="small"
                                                disabled
                                                sx={{ '& .MuiInputBase-input.Mui-disabled': { color: THEME_COLORS.text.primary } }}
                                            />
                                        </Box>
                                    )}
                                </Box>

                                {/* Selected Vehicle Display Card */}
                                {formData.vehicleDetails.selectedVehicle && (
                                    <VehicleCard selected={true} sx={{ mb: 2 }}>
                                        <CardContent sx={{ p: 3 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                                <CarIcon sx={{ color: THEME_COLORS.primary, fontSize: 32, mt: 0.5 }} />
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography variant="h6" sx={{ color: THEME_COLORS.primary, fontWeight: 600, mb: 1 }}>
                                                        {formData.vehicleDetails.selectedVehicle.name}
                                                    </Typography>
                                                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 2 }}>
                                                        <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>
                                                            Variant: {formData.vehicleDetails.selectedVehicle.variant}
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>
                                                            Fuel: {formData.vehicleDetails.selectedVehicle.fuel}
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>
                                                            Transmission: {formData.vehicleDetails.selectedVehicle.transmission}
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>
                                                            Engine: {formData.vehicleDetails.selectedVehicle.engine}
                                                        </Typography>
                                                    </Box>
                                                    <Typography variant="h6" sx={{ color: THEME_COLORS.primary, fontWeight: 600 }}>
                                                        Ex-Showroom: ₹{formData.vehicleDetails.selectedVehicle.price.toLocaleString()}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </VehicleCard>
                                )}

                                {/* No variants message */}
                                {formData.vehicleDetails.selectedModel && !formData.vehicleDetails.selectedVariant && getVariantsByModel(formData.vehicleDetails.selectedModel).length === 0 && (
                                    <Box sx={{
                                        p: 3,
                                        border: `1px dashed ${THEME_COLORS.border}`,
                                        borderRadius: '8px',
                                        textAlign: 'center',
                                        mb: 2
                                    }}>
                                        <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>
                                            No variants available for: {formData.vehicleDetails.selectedModel}
                                            <br />
                                            Please select a different model.
                                        </Typography>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>

                        {/* Registration Details */}
                        <Typography variant="subtitle1" sx={{ color: THEME_COLORS.text.primary, mt: 3, mb: 2, fontWeight: 600 }}>
                            Registration Details
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth size="small">
                                    <InputLabel sx={{ color: THEME_COLORS.text.secondary }}>State *</InputLabel>
                                    <StyledSelect
                                        value={formData.vehicleDetails.registrationState}
                                        label="State *"
                                        onChange={(e) => updateFormData('vehicleDetails', 'registrationState', e.target.value)}
                                    >
                                        <MenuItem value="Delhi 1">Delhi 1</MenuItem>
                                        <MenuItem value="Delhi 2">Delhi 2</MenuItem>
                                        <MenuItem value="Delhi 3">Delhi 3</MenuItem>
                                        <MenuItem value="Delhi 4">Delhi 4</MenuItem>
                                    </StyledSelect>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Typography variant="subtitle2" sx={{ color: THEME_COLORS.text.primary, mb: 2, fontWeight: 600 }}>
                                    Registration Type *
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box
                                            component="input"
                                            type="radio"
                                            name="registrationType"
                                            value="individual"
                                            checked={formData.vehicleDetails.registrationType === 'individual'}
                                            onChange={(e) => updateFormData('vehicleDetails', 'registrationType', e.target.value)}
                                            sx={{
                                                accentColor: THEME_COLORS.primary,
                                                cursor: 'pointer',
                                            }}
                                        />
                                        <Typography variant="body2" sx={{ color: THEME_COLORS.text.primary }}>
                                            Individual
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box
                                            component="input"
                                            type="radio"
                                            name="registrationType"
                                            value="company"
                                            checked={formData.vehicleDetails.registrationType === 'company'}
                                            onChange={(e) => updateFormData('vehicleDetails', 'registrationType', e.target.value)}
                                            sx={{
                                                accentColor: THEME_COLORS.primary,
                                                cursor: 'pointer',
                                            }}
                                        />
                                        <Typography variant="body2" sx={{ color: THEME_COLORS.text.primary }}>
                                            Company
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                        <Box
                                            component="input"
                                            type="checkbox"
                                            checked={formData.vehicleDetails.vehicleFinanced}
                                            onChange={(e) => updateFormData('vehicleDetails', 'vehicleFinanced', e.target.checked)}
                                            sx={{
                                                accentColor: THEME_COLORS.primary,
                                                cursor: 'pointer',
                                            }}
                                        />
                                        <Typography variant="body2" sx={{ color: THEME_COLORS.text.primary }}>
                                            Vehicle will be financed
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                            <StyledButton
                                variant="contained"
                                onClick={handleNext}
                                disabled={!formData.vehicleDetails.selectedVehicle}
                                endIcon={<Box component="span" sx={{ ml: 1 }}>→</Box>}
                            >
                                Next: Color Selection
                            </StyledButton>
                        </Box>
                    </Box>
                );


            case 1:
                return (
                    <Box>
                        <Typography variant="h6" sx={{ color: THEME_COLORS.text.primary, mb: 2, fontWeight: 600 }}>
                            Step 2: Color Selection
                        </Typography>
                        <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary, mb: 4 }}>
                            Choose your preferred color option
                        </Typography>

                        <Typography variant="subtitle1" sx={{ color: THEME_COLORS.text.primary, mb: 3, fontWeight: 600 }}>
                            Available Colors
                        </Typography>

                        <Grid container spacing={2} sx={{ mb: 4 }}>
                            {[
                                { name: 'Pearl Blue', gradient: 'linear-gradient(135deg, #4A90E2, #7BB3F0)' },
                                { name: 'Midnight Black', gradient: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)' },
                                { name: 'Crimson Red', gradient: 'linear-gradient(135deg, #DC143C, #FF6B6B)' },
                                { name: 'Arctic White', gradient: 'linear-gradient(135deg, #FFFFFF, #F8F8FF)' },
                                { name: 'Silver Metallic', gradient: 'linear-gradient(135deg, #C0C0C0, #E5E5E5)' },
                                { name: 'Forest Green', gradient: 'linear-gradient(135deg, #228B22, #32CD32)' },
                            ].map((color) => (
                                <Grid item xs={12} sm={6} md={4} key={color.name}>
                                    <Box
                                        onClick={() => updateFormData('colorSelection', 'selectedColor', color.name)}
                                        sx={{
                                            border: formData.colorSelection.selectedColor === color.name ? `2px solid ${THEME_COLORS.primary}` : `1px solid ${THEME_COLORS.border}`,
                                            borderRadius: '12px',
                                            p: 2,
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            backgroundColor: formData.colorSelection.selectedColor === color.name ? 'rgba(229, 103, 81, 0.1)' : THEME_COLORS.background.paper,
                                            '&:hover': {
                                                borderColor: THEME_COLORS.primary,
                                                backgroundColor: 'rgba(229, 103, 81, 0.05)',
                                            },
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Box
                                                sx={{
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: '50%',
                                                    background: color.gradient,
                                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                                                }}
                                            />
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ color: THEME_COLORS.text.primary, fontWeight: 600 }}>
                                                    {color.name}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: THEME_COLORS.text.secondary }}>
                                                    Premium • Standard
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>

                        <Typography variant="subtitle1" sx={{ color: THEME_COLORS.text.primary, mb: 2, fontWeight: 600 }}>
                            Special Notes (Optional)
                        </Typography>
                        <StyledTextField
                            multiline
                            rows={4}
                            placeholder="Add any special requirements or notes for this color choice..."
                            value={formData.colorSelection.specialNotes}
                            onChange={(e) => updateFormData('colorSelection', 'specialNotes', e.target.value)}
                            fullWidth
                            sx={{ mb: 3 }}
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                            <StyledButton
                                variant="outlined"
                                onClick={handleBack}
                                startIcon={<Box component="span" sx={{ mr: 1 }}>←</Box>}
                            >
                                Previous
                            </StyledButton>

                            <StyledButton
                                variant="contained"
                                onClick={handleNext}
                                endIcon={<Box component="span" sx={{ ml: 1 }}>→</Box>}
                                disabled={!formData.colorSelection.selectedColor}
                            >
                                Next: Insurance
                            </StyledButton>
                        </Box>
                    </Box>
                );

            case 2:
                return (
                    <Box>
                        <Typography variant="h6" sx={{ color: THEME_COLORS.text.primary, mb: 2, fontWeight: 600 }}>
                            Step 3: Insurance Selection
                        </Typography>
                        <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary, mb: 4 }}>
                            Choose an insurance plan or indicate customer's own insurance
                        </Typography>

                        <Typography variant="subtitle1" sx={{ color: THEME_COLORS.text.primary, mb: 3, fontWeight: 600 }}>
                            Insurance Options
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                            {insuranceOptions.map((insurance) => (
                                <Box
                                    key={insurance.id}
                                    onClick={() => handleInsuranceSelect(insurance)}
                                    sx={{
                                        border: formData.insurance.type === insurance.type ? `2px solid ${THEME_COLORS.primary}` : `1px solid ${THEME_COLORS.border}`,
                                        borderRadius: '12px',
                                        p: 3,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        backgroundColor: formData.insurance.type === insurance.type ? 'rgba(229, 103, 81, 0.1)' : THEME_COLORS.background.paper,
                                        '&:hover': {
                                            borderColor: THEME_COLORS.primary,
                                            backgroundColor: 'rgba(229, 103, 81, 0.05)',
                                        },
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                        <Box
                                            component="input"
                                            type="radio"
                                            name="insurance"
                                            checked={formData.insurance.type === insurance.type}
                                            onChange={() => handleInsuranceSelect(insurance)}
                                            sx={{
                                                accentColor: THEME_COLORS.primary,
                                                cursor: 'pointer',
                                                mt: 0.5,
                                            }}
                                        />
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="subtitle1" sx={{ color: THEME_COLORS.text.primary, fontWeight: 600, mb: 1 }}>
                                                {insurance.provider}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary, mb: 1 }}>
                                                {insurance.description}
                                            </Typography>
                                            {insurance.coverage && (
                                                <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary, mb: 1 }}>
                                                    {insurance.coverage}
                                                </Typography>
                                            )}
                                            <Typography variant="h6" sx={{ color: THEME_COLORS.primary, fontWeight: 600 }}>
                                                ₹{insurance.premium.toLocaleString()}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                            <StyledButton
                                variant="outlined"
                                onClick={handleBack}
                                startIcon={<Box component="span" sx={{ mr: 1 }}>←</Box>}
                            >
                                Previous
                            </StyledButton>

                            <StyledButton
                                variant="contained"
                                onClick={handleNext}
                                endIcon={<Box component="span" sx={{ ml: 1 }}>→</Box>}
                                disabled={!formData.insurance.type}
                            >
                                Next: Accessories
                            </StyledButton>
                        </Box>
                    </Box>
                );

                case 3:
                    return (
                        <Box>
                            <Typography variant="h6" sx={{ color: THEME_COLORS.text.primary, mb: 2, fontWeight: 600 }}>
                                Step 4: Accessories Selection
                            </Typography>
                            <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary, mb: 4 }}>
                                Choose optional accessories or accessory packs for your {formData.vehicleDetails.selectedVehicle?.name || 'vehicle'}
                            </Typography>
                
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle1" sx={{ color: THEME_COLORS.text.primary, mb: 3, fontWeight: 600 }}>
                                        Available Accessories
                                    </Typography>
                
                                    <Box sx={{ borderBottom: `1px solid ${THEME_COLORS.border}`, mb: 3 }}>
                                        <Box sx={{ display: 'flex', gap: 0 }}>
                                            <Button
                                                onClick={() => setAccessoryTab('individual')}
                                                sx={{
                                                    color: accessoryTab === 'individual' ? THEME_COLORS.primary : THEME_COLORS.text.secondary,
                                                    borderBottom: accessoryTab === 'individual' ? `2px solid ${THEME_COLORS.primary}` : 'none',
                                                    borderRadius: 0,
                                                    textTransform: 'none',
                                                    fontWeight: 500,
                                                    py: 1.5,
                                                    px: 2,
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(229, 103, 81, 0.1)',
                                                    },
                                                }}
                                            >
                                                Individual Items
                                            </Button>
                                            <Button
                                                onClick={() => setAccessoryTab('packs')}
                                                sx={{
                                                    color: accessoryTab === 'packs' ? THEME_COLORS.primary : THEME_COLORS.text.secondary,
                                                    borderBottom: accessoryTab === 'packs' ? `2px solid ${THEME_COLORS.primary}` : 'none',
                                                    borderRadius: 0,
                                                    textTransform: 'none',
                                                    fontWeight: 500,
                                                    py: 1.5,
                                                    px: 2,
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(229, 103, 81, 0.1)',
                                                    },
                                                }}
                                            >
                                                Accessory Packs
                                            </Button>
                                        </Box>
                                    </Box>
                
                                    <Box sx={{
                                        maxHeight: '400px',
                                        overflowY: 'auto',
                                        border: `1px solid ${THEME_COLORS.border}`,
                                        borderRadius: '12px',
                                        p: 2,
                                        backgroundColor: THEME_COLORS.background.paper,
                                    }}>
                                        {accessoryTab === 'individual' && (
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                {getCurrentModelAccessories().map((accessory) => (
                                                    <Box
                                                        key={accessory.id}
                                                        onClick={() => handleAccessoryToggle(accessory)}
                                                        sx={{
                                                            p: 2,
                                                            border: `1px solid ${THEME_COLORS.border}`,
                                                            borderRadius: '8px',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.3s ease',
                                                            backgroundColor: formData.accessories.individualItems.some(item => item.id === accessory.id)
                                                                ? 'rgba(229, 103, 81, 0.1)'
                                                                : 'transparent',
                                                            borderColor: formData.accessories.individualItems.some(item => item.id === accessory.id)
                                                                ? THEME_COLORS.primary
                                                                : THEME_COLORS.border,
                                                            '&:hover': {
                                                                borderColor: THEME_COLORS.primary,
                                                                backgroundColor: 'rgba(229, 103, 81, 0.05)',
                                                            },
                                                        }}
                                                    >
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <Box>
                                                                <Typography variant="body2" sx={{ color: THEME_COLORS.text.primary, fontWeight: 500 }}>
                                                                    {accessory.name}
                                                                </Typography>
                                                                <Typography variant="caption" sx={{ color: THEME_COLORS.text.secondary }}>
                                                                    {accessory.description}
                                                                </Typography>
                                                                {accessory.partNumber && (
                                                                    <Typography variant="caption" sx={{ color: THEME_COLORS.text.tertiary, display: 'block' }}>
                                                                        Part: {accessory.partNumber}
                                                                    </Typography>
                                                                )}
                                                            </Box>
                                                            <Typography variant="body2" sx={{ color: THEME_COLORS.primary, fontWeight: 600 }}>
                                                                ₹{accessory.price.toLocaleString()}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                ))}
                                                
                                                {/* No accessories message */}
                                                {getCurrentModelAccessories().length === 0 && (
                                                    <Box sx={{ textAlign: 'center', py: 4 }}>
                                                        <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>
                                                            No accessories available for {getCurrentModel()}
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                        )}
                
                                        {accessoryTab === 'packs' && (
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                {getCurrentModelAccessoryPacks().map((pack) => (
                                                    <Box
                                                        key={pack.id}
                                                        onClick={() => handlePackToggle(pack)}
                                                        sx={{
                                                            p: 2,
                                                            border: `1px solid ${THEME_COLORS.border}`,
                                                            borderRadius: '8px',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.3s ease',
                                                            backgroundColor: formData.accessories.accessoryPacks.some(item => item.id === pack.id)
                                                                ? 'rgba(229, 103, 81, 0.1)'
                                                                : 'transparent',
                                                            borderColor: formData.accessories.accessoryPacks.some(item => item.id === pack.id)
                                                                ? THEME_COLORS.primary
                                                                : THEME_COLORS.border,
                                                            '&:hover': {
                                                                borderColor: THEME_COLORS.primary,
                                                                backgroundColor: 'rgba(229, 103, 81, 0.05)',
                                                            },
                                                        }}
                                                    >
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                            <Box sx={{ flex: 1 }}>
                                                                <Typography variant="body2" sx={{ color: THEME_COLORS.text.primary, fontWeight: 500, mb: 0.5 }}>
                                                                    {pack.name}
                                                                </Typography>
                                                                <Typography variant="caption" sx={{ color: THEME_COLORS.text.secondary, display: 'block', mb: 1 }}>
                                                                    {pack.description}
                                                                </Typography>
                                                                <Typography variant="caption" sx={{ color: THEME_COLORS.text.tertiary }}>
                                                                    Includes: {pack.items.join(', ')}
                                                                </Typography>
                                                            </Box>
                                                            <Box sx={{ textAlign: 'right', ml: 2 }}>
                                                                <Typography variant="body2" sx={{ color: THEME_COLORS.primary, fontWeight: 600 }}>
                                                                    ₹{pack.price.toLocaleString()}
                                                                </Typography>
                                                                {pack.originalPrice && pack.originalPrice > pack.price && (
                                                                    <Typography variant="caption" sx={{ color: THEME_COLORS.success, textDecoration: 'line-through' }}>
                                                                        ₹{pack.originalPrice.toLocaleString()}
                                                                    </Typography>
                                                                )}
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                ))}
                                                
                                                {/* No packs message */}
                                                {getCurrentModelAccessoryPacks().length === 0 && (
                                                    <Box sx={{ textAlign: 'center', py: 4 }}>
                                                        <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>
                                                            No accessory packs available for {getCurrentModel()}
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                        )}
                                    </Box>
                                </Grid>
                
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle1" sx={{ color: THEME_COLORS.text.primary, mb: 3, fontWeight: 600 }}>
                                        Selected Accessories
                                    </Typography>
                
                                    <Box sx={{
                                        minHeight: '400px',
                                        border: `1px solid ${THEME_COLORS.border}`,
                                        borderRadius: '12px',
                                        p: 3,
                                        backgroundColor: THEME_COLORS.background.paper,
                                    }}>
                                        {(formData.accessories.individualItems.length === 0 && formData.accessories.accessoryPacks.length === 0) ? (
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                minHeight: '200px',
                                                textAlign: 'center'
                                            }}>
                                                <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>
                                                    No accessories selected
                                                </Typography>
                                            </Box>
                                        ) : (
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                                {formData.accessories.individualItems.map((accessory) => (
                                                    <Box key={accessory.id} sx={{
                                                        p: 2,
                                                        border: `1px solid ${THEME_COLORS.border}`,
                                                        borderRadius: '8px',
                                                        backgroundColor: THEME_COLORS.background.secondary,
                                                    }}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <Box sx={{ flex: 1 }}>
                                                                <Typography variant="body2" sx={{ color: THEME_COLORS.text.primary, fontWeight: 500 }}>
                                                                    {accessory.name}
                                                                </Typography>
                                                                <Typography variant="caption" sx={{ color: THEME_COLORS.text.secondary }}>
                                                                    Individual Item
                                                                </Typography>
                                                            </Box>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                <Typography variant="body2" sx={{ color: THEME_COLORS.primary, fontWeight: 600 }}>
                                                                    ₹{accessory.price.toLocaleString()}
                                                                </Typography>
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => handleAccessoryToggle(accessory)}
                                                                    sx={{ color: THEME_COLORS.text.secondary }}
                                                                >
                                                                    ×
                                                                </IconButton>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                ))}
                
                                                {formData.accessories.accessoryPacks.map((pack) => (
                                                    <Box key={pack.id} sx={{
                                                        p: 2,
                                                        border: `1px solid ${THEME_COLORS.border}`,
                                                        borderRadius: '8px',
                                                        backgroundColor: THEME_COLORS.background.secondary,
                                                    }}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                            <Box sx={{ flex: 1 }}>
                                                                <Typography variant="body2" sx={{ color: THEME_COLORS.text.primary, fontWeight: 500 }}>
                                                                    {pack.name}
                                                                </Typography>
                                                                <Typography variant="caption" sx={{ color: THEME_COLORS.text.secondary, display: 'block' }}>
                                                                    Accessory Pack
                                                                </Typography>
                                                                <Typography variant="caption" sx={{ color: THEME_COLORS.text.tertiary }}>
                                                                    {pack.items.join(', ')}
                                                                </Typography>
                                                            </Box>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
                                                                <Typography variant="body2" sx={{ color: THEME_COLORS.primary, fontWeight: 600 }}>
                                                                    ₹{pack.price.toLocaleString()}
                                                                </Typography>
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => handlePackToggle(pack)}
                                                                    sx={{ color: THEME_COLORS.text.secondary }}
                                                                >
                                                                    ×
                                                                </IconButton>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                ))}
                
                                                <Box sx={{
                                                    mt: 2,
                                                    pt: 2,
                                                    borderTop: `1px solid ${THEME_COLORS.border}`,
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center'
                                                }}>
                                                    <Typography variant="subtitle2" sx={{ color: THEME_COLORS.text.primary, fontWeight: 600 }}>
                                                        Total Accessories:
                                                    </Typography>
                                                    <Typography variant="h6" sx={{ color: THEME_COLORS.primary, fontWeight: 600 }}>
                                                        ₹{formData.accessories.totalCost.toLocaleString()}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        )}
                                    </Box>
                                </Grid>
                            </Grid>
                
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                                <StyledButton
                                    variant="outlined"
                                    onClick={handleBack}
                                    startIcon={<Box component="span" sx={{ mr: 1 }}>←</Box>}
                                >
                                    Previous
                                </StyledButton>
                
                                <StyledButton
                                    variant="contained"
                                    onClick={handleNext}
                                    endIcon={<Box component="span" sx={{ ml: 1 }}>→</Box>}
                                >
                                    Next: Scheme
                                </StyledButton>
                            </Box>
                        </Box>
                    );
            case 4:
                return (
                    <Box>
                        <Typography variant="h6" sx={{ color: THEME_COLORS.text.primary, mb: 2, fontWeight: 600 }}>
                            Step 5: Financing Scheme
                        </Typography>
                        <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary, mb: 4 }}>
                            Select financing scheme and payment options
                        </Typography>

                        <Typography variant="subtitle1" sx={{ color: THEME_COLORS.text.primary, mb: 3, fontWeight: 600 }}>
                            Financing Options
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                            {financingSchemes.map((scheme) => (
                                <Box
                                    key={scheme.id}
                                    onClick={() => handleSchemeSelect(scheme)}
                                    sx={{
                                        border: formData.financing.scheme === scheme.id ? `2px solid ${THEME_COLORS.primary}` : `1px solid ${THEME_COLORS.border}`,
                                        borderRadius: '12px',
                                        p: 3,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        backgroundColor: formData.financing.scheme === scheme.id ? 'rgba(229, 103, 81, 0.1)' : THEME_COLORS.background.paper,
                                        '&:hover': {
                                            borderColor: THEME_COLORS.primary,
                                            backgroundColor: 'rgba(229, 103, 81, 0.05)',
                                        },
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                        <Box
                                            component="input"
                                            type="radio"
                                            name="scheme"
                                            checked={formData.financing.scheme === scheme.id}
                                            onChange={() => handleSchemeSelect(scheme)}
                                            sx={{
                                                accentColor: THEME_COLORS.primary,
                                                cursor: 'pointer',
                                                mt: 0.5,
                                            }}
                                        />
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="subtitle1" sx={{ color: THEME_COLORS.text.primary, fontWeight: 600, mb: 1 }}>
                                                {scheme.name}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary, mb: 1 }}>
                                                {scheme.description}
                                            </Typography>
                                            <Grid container spacing={2}>
                                                {scheme.downPayment > 0 && (
                                                    <Grid item xs={6}>
                                                        <Typography variant="caption" sx={{ color: THEME_COLORS.text.secondary }}>
                                                            Down Payment: {scheme.downPayment}%
                                                        </Typography>
                                                    </Grid>
                                                )}
                                                {scheme.emi > 0 && (
                                                    <Grid item xs={6}>
                                                        <Typography variant="caption" sx={{ color: THEME_COLORS.primary, fontWeight: 600 }}>
                                                            EMI: ₹{scheme.emi.toLocaleString()}/month
                                                        </Typography>
                                                    </Grid>
                                                )}
                                                {scheme.interestRate > 0 && (
                                                    <Grid item xs={6}>
                                                        <Typography variant="caption" sx={{ color: THEME_COLORS.text.secondary }}>
                                                            Interest Rate: {scheme.interestRate}% p.a.
                                                        </Typography>
                                                    </Grid>
                                                )}
                                                {scheme.processingFee > 0 && (
                                                    <Grid item xs={6}>
                                                        <Typography variant="caption" sx={{ color: THEME_COLORS.text.secondary }}>
                                                            Processing Fee: ₹{scheme.processingFee.toLocaleString()}
                                                        </Typography>
                                                    </Grid>
                                                )}
                                            </Grid>
                                            {scheme.id === 'company_finance' && (
                                                <Typography variant="caption" sx={{ color: THEME_COLORS.success, fontWeight: 500, mt: 1, display: 'block' }}>
                                                    ✓ Recommended - Best Interest Rate
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                            <StyledButton
                                variant="outlined"
                                onClick={handleBack}
                                startIcon={<Box component="span" sx={{ mr: 1 }}>←</Box>}
                            >
                                Previous
                            </StyledButton>

                            <StyledButton
                                variant="contained"
                                onClick={handleNext}
                                endIcon={<Box component="span" sx={{ ml: 1 }}>→</Box>}
                                disabled={!formData.financing.scheme}
                            >
                                Next: Review
                            </StyledButton>
                        </Box>
                    </Box>
                );

            case 5:
                return (
                    <Box>
                        <Typography variant="h6" sx={{ color: THEME_COLORS.text.primary, mb: 2, fontWeight: 600 }}>
                            Step 6: Quote Review
                        </Typography>
                        <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary, mb: 4 }}>
                            Review all details before generating your final quote
                        </Typography>

                        {/* Customer Information */}
                        <Card sx={{ backgroundColor: THEME_COLORS.background.paper, border: `1px solid ${THEME_COLORS.border}`, borderRadius: '12px', mb: 3 }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" sx={{ color: THEME_COLORS.primary, mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CheckCircleIcon fontSize="small" />
                                    Customer Information
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>Name:</Typography>
                                        <Typography variant="body1" sx={{ color: THEME_COLORS.text.primary, fontWeight: 500 }}>
                                            {formData.customerInfo.name || 'Not provided'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>Email:</Typography>
                                        <Typography variant="body1" sx={{ color: THEME_COLORS.text.primary, fontWeight: 500 }}>
                                            {formData.customerInfo.email || 'Not provided'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>Phone:</Typography>
                                        <Typography variant="body1" sx={{ color: THEME_COLORS.text.primary, fontWeight: 500 }}>
                                            {formData.customerInfo.phone || 'Not provided'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Vehicle Details */}
                        <Card sx={{ backgroundColor: THEME_COLORS.background.paper, border: `1px solid ${THEME_COLORS.border}`, borderRadius: '12px', mb: 3 }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" sx={{ color: THEME_COLORS.primary, mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CheckCircleIcon fontSize="small" />
                                    Vehicle Details
                                </Typography>
                                {formData.vehicleDetails.selectedVehicle ? (
                                    <Box>
                                        <Grid container spacing={2} sx={{ mb: 2 }}>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>Vehicle:</Typography>
                                                <Typography variant="h6" sx={{ color: THEME_COLORS.text.primary, fontWeight: 600 }}>
                                                    {formData.vehicleDetails.selectedVehicle.name} - {formData.vehicleDetails.selectedVehicle.variant}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>Ex-Showroom Price:</Typography>
                                                <Typography variant="h6" sx={{ color: THEME_COLORS.primary, fontWeight: 600 }}>
                                                    ₹{formData.vehicleDetails.selectedVehicle.price.toLocaleString()}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6} md={3}>
                                                <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>Fuel:</Typography>
                                                <Typography variant="body1" sx={{ color: THEME_COLORS.text.primary }}>
                                                    {formData.vehicleDetails.selectedVehicle.fuel}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} md={3}>
                                                <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>Transmission:</Typography>
                                                <Typography variant="body1" sx={{ color: THEME_COLORS.text.primary }}>
                                                    {formData.vehicleDetails.selectedVehicle.transmission}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} md={3}>
                                                <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>Engine:</Typography>
                                                <Typography variant="body1" sx={{ color: THEME_COLORS.text.primary }}>
                                                    {formData.vehicleDetails.selectedVehicle.engine}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} md={3}>
                                                <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>Seating:</Typography>
                                                <Typography variant="body1" sx={{ color: THEME_COLORS.text.primary }}>
                                                    {formData.vehicleDetails.selectedVehicle.seating}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                ) : (
                                    <Typography variant="body1" sx={{ color: THEME_COLORS.text.secondary }}>
                                        No vehicle selected
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>

                        {/* Color Selection */}
                        <Card sx={{ backgroundColor: THEME_COLORS.background.paper, border: `1px solid ${THEME_COLORS.border}`, borderRadius: '12px', mb: 3 }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" sx={{ color: THEME_COLORS.primary, mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CheckCircleIcon fontSize="small" />
                                    Color Selection
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>Selected Color:</Typography>
                                        <Typography variant="body1" sx={{ color: THEME_COLORS.text.primary, fontWeight: 500 }}>
                                            {formData.colorSelection.selectedColor || 'Not selected'}
                                        </Typography>
                                    </Grid>
                                    {formData.colorSelection.specialNotes && (
                                        <Grid item xs={12}>
                                            <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>Special Notes:</Typography>
                                            <Typography variant="body1" sx={{ color: THEME_COLORS.text.primary }}>
                                                {formData.colorSelection.specialNotes}
                                            </Typography>
                                        </Grid>
                                    )}
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Insurance */}
                        <Card sx={{ backgroundColor: THEME_COLORS.background.paper, border: `1px solid ${THEME_COLORS.border}`, borderRadius: '12px', mb: 3 }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" sx={{ color: THEME_COLORS.primary, mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CheckCircleIcon fontSize="small" />
                                    Insurance Details
                                </Typography>
                                {formData.insurance.type ? (
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={4}>
                                            <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>Provider:</Typography>
                                            <Typography variant="body1" sx={{ color: THEME_COLORS.text.primary, fontWeight: 500 }}>
                                                {formData.insurance.provider}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>Coverage:</Typography>
                                            <Typography variant="body1" sx={{ color: THEME_COLORS.text.primary }}>
                                                {formData.insurance.coverage}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>Premium:</Typography>
                                            <Typography variant="body1" sx={{ color: THEME_COLORS.primary, fontWeight: 600 }}>
                                                ₹{formData.insurance.premium.toLocaleString()}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                ) : (
                                    <Typography variant="body1" sx={{ color: THEME_COLORS.text.secondary }}>
                                        No insurance selected
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>

                        {/* Accessories */}
                        <Card sx={{ backgroundColor: THEME_COLORS.background.paper, border: `1px solid ${THEME_COLORS.border}`, borderRadius: '12px', mb: 3 }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" sx={{ color: THEME_COLORS.primary, mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CheckCircleIcon fontSize="small" />
                                    Accessories
                                </Typography>
                                {(formData.accessories.individualItems.length > 0 || formData.accessories.accessoryPacks.length > 0) ? (
                                    <Box>
                                        {formData.accessories.individualItems.length > 0 && (
                                            <Box sx={{ mb: 2 }}>
                                                <Typography variant="subtitle2" sx={{ color: THEME_COLORS.text.primary, mb: 1, fontWeight: 600 }}>
                                                    Individual Items:
                                                </Typography>
                                                <List dense>
                                                    {formData.accessories.individualItems.map((item) => (
                                                        <ListItem key={item.id} sx={{ py: 0.5, px: 0 }}>
                                                            <ListItemText
                                                                primary={item.name}
                                                                secondary={item.description}
                                                                primaryTypographyProps={{ color: THEME_COLORS.text.primary, fontSize: '0.875rem' }}
                                                                secondaryTypographyProps={{ color: THEME_COLORS.text.secondary, fontSize: '0.75rem' }}
                                                            />
                                                            <Typography variant="body2" sx={{ color: THEME_COLORS.primary, fontWeight: 600 }}>
                                                                ₹{item.price.toLocaleString()}
                                                            </Typography>
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </Box>
                                        )}

                                        {formData.accessories.accessoryPacks.length > 0 && (
                                            <Box sx={{ mb: 2 }}>
                                                <Typography variant="subtitle2" sx={{ color: THEME_COLORS.text.primary, mb: 1, fontWeight: 600 }}>
                                                    Accessory Packs:
                                                </Typography>
                                                <List dense>
                                                    {formData.accessories.accessoryPacks.map((pack) => (
                                                        <ListItem key={pack.id} sx={{ py: 0.5, px: 0 }}>
                                                            <ListItemText
                                                                primary={pack.name}
                                                                secondary={`${pack.description} (${pack.items.join(', ')})`}
                                                                primaryTypographyProps={{ color: THEME_COLORS.text.primary, fontSize: '0.875rem' }}
                                                                secondaryTypographyProps={{ color: THEME_COLORS.text.secondary, fontSize: '0.75rem' }}
                                                            />
                                                            <Typography variant="body2" sx={{ color: THEME_COLORS.primary, fontWeight: 600 }}>
                                                                ₹{pack.price.toLocaleString()}
                                                            </Typography>
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </Box>
                                        )}

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 2, borderTop: `1px solid ${THEME_COLORS.border}` }}>
                                            <Typography variant="subtitle2" sx={{ color: THEME_COLORS.text.primary, fontWeight: 600 }}>
                                                Total Accessories:
                                            </Typography>
                                            <Typography variant="h6" sx={{ color: THEME_COLORS.primary, fontWeight: 600 }}>
                                                ₹{formData.accessories.totalCost.toLocaleString()}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ) : (
                                    <Typography variant="body1" sx={{ color: THEME_COLORS.text.secondary }}>
                                        No accessories selected
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>

                        {/* Financing */}
                        <Card sx={{ backgroundColor: THEME_COLORS.background.paper, border: `1px solid ${THEME_COLORS.border}`, borderRadius: '12px', mb: 3 }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" sx={{ color: THEME_COLORS.primary, mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CheckCircleIcon fontSize="small" />
                                    Financing Details
                                </Typography>
                                {formData.financing.scheme ? (
                                    <Box>
                                        <Grid container spacing={2} sx={{ mb: 2 }}>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>Scheme:</Typography>
                                                <Typography variant="body1" sx={{ color: THEME_COLORS.text.primary, fontWeight: 500 }}>
                                                    {formData.financing.schemeName}
                                                </Typography>
                                            </Grid>
                                            {formData.financing.downPayment > 0 && (
                                                <Grid item xs={12} md={6}>
                                                    <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>Down Payment:</Typography>
                                                    <Typography variant="body1" sx={{ color: THEME_COLORS.primary, fontWeight: 600 }}>
                                                        ₹{formData.financing.downPayment.toLocaleString()}
                                                    </Typography>
                                                </Grid>
                                            )}
                                        </Grid>
                                        <Grid container spacing={2}>
                                            {formData.financing.emi > 0 && (
                                                <Grid item xs={6} md={3}>
                                                    <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>EMI:</Typography>
                                                    <Typography variant="body1" sx={{ color: THEME_COLORS.text.primary }}>
                                                        ₹{formData.financing.emi.toLocaleString()}/month
                                                    </Typography>
                                                </Grid>
                                            )}
                                            {formData.financing.tenure > 0 && (
                                                <Grid item xs={6} md={3}>
                                                    <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>Tenure:</Typography>
                                                    <Typography variant="body1" sx={{ color: THEME_COLORS.text.primary }}>
                                                        {formData.financing.tenure} months
                                                    </Typography>
                                                </Grid>
                                            )}
                                            {formData.financing.interestRate > 0 && (
                                                <Grid item xs={6} md={3}>
                                                    <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>Interest Rate:</Typography>
                                                    <Typography variant="body1" sx={{ color: THEME_COLORS.text.primary }}>
                                                        {formData.financing.interestRate}% p.a.
                                                    </Typography>
                                                </Grid>
                                            )}
                                            {formData.financing.processingFee > 0 && (
                                                <Grid item xs={6} md={3}>
                                                    <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>Processing Fee:</Typography>
                                                    <Typography variant="body1" sx={{ color: THEME_COLORS.text.primary }}>
                                                        ₹{formData.financing.processingFee.toLocaleString()}
                                                    </Typography>
                                                </Grid>
                                            )}
                                        </Grid>
                                    </Box>
                                ) : (
                                    <Typography variant="body1" sx={{ color: THEME_COLORS.text.secondary }}>
                                        No financing scheme selected
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>

                        {/* Price Breakdown */}
                        <Card sx={{ backgroundColor: THEME_COLORS.background.paper, border: `2px solid ${THEME_COLORS.primary}`, borderRadius: '12px', mb: 3 }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" sx={{ color: THEME_COLORS.primary, mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CheckCircleIcon fontSize="small" />
                                    Price Breakdown
                                </Typography>

                                <TableContainer>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ color: THEME_COLORS.text.primary, fontWeight: 600, border: 'none' }}>
                                                    Item
                                                </TableCell>
                                                <TableCell align="right" sx={{ color: THEME_COLORS.text.primary, fontWeight: 600, border: 'none' }}>
                                                    Amount
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell sx={{ color: THEME_COLORS.text.secondary, border: 'none' }}>
                                                    Vehicle Ex-Showroom Price
                                                </TableCell>
                                                <TableCell align="right" sx={{ color: THEME_COLORS.text.primary, border: 'none' }}>
                                                    ₹{formData.pricing.vehiclePrice.toLocaleString()}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell sx={{ color: THEME_COLORS.text.secondary, border: 'none' }}>
                                                    Insurance Premium
                                                </TableCell>
                                                <TableCell align="right" sx={{ color: THEME_COLORS.text.primary, border: 'none' }}>
                                                    ₹{formData.pricing.insuranceCost.toLocaleString()}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell sx={{ color: THEME_COLORS.text.secondary, border: 'none' }}>
                                                    Accessories
                                                </TableCell>
                                                <TableCell align="right" sx={{ color: THEME_COLORS.text.primary, border: 'none' }}>
                                                    ₹{formData.pricing.accessoriesCost.toLocaleString()}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell sx={{ color: THEME_COLORS.text.secondary, border: 'none' }}>
                                                    Registration & Others
                                                </TableCell>
                                                <TableCell align="right" sx={{ color: THEME_COLORS.text.primary, border: 'none' }}>
                                                    ₹{formData.pricing.registrationCost.toLocaleString()}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell sx={{
                                                    color: THEME_COLORS.primary,
                                                    fontWeight: 600,
                                                    fontSize: '1.1rem',
                                                    borderTop: `2px solid ${THEME_COLORS.border}`,
                                                    pt: 2
                                                }}>
                                                    Total On-Road Price
                                                </TableCell>
                                                <TableCell align="right" sx={{
                                                    color: THEME_COLORS.primary,
                                                    fontWeight: 600,
                                                    fontSize: '1.2rem',
                                                    borderTop: `2px solid ${THEME_COLORS.border}`,
                                                    pt: 2
                                                }}>
                                                    ₹{formData.pricing.totalCost.toLocaleString()}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>


                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                            <StyledButton
                                variant="outlined"
                                onClick={handleBack}
                                startIcon={<Box component="span" sx={{ mr: 1 }}>←</Box>}
                            >
                                Previous
                            </StyledButton>

                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <StyledButton
                                    variant="outlined"
                                    onClick={handleSaveDraft}
                                    startIcon={<SaveIcon />}
                                >
                                    Save Draft
                                </StyledButton>
                                <StyledButton
                                    variant="contained"
                                    onClick={handleGeneratePDF}
                                    startIcon={<PictureAsPdfIcon />}
                                >
                                    Generate PDF Quote
                                </StyledButton>
                            </Box>
                        </Box>
                    </Box>
                );

            default:
                return null;
        }
    };

    return (
        <Box sx={{ p: 3, backgroundColor: THEME_COLORS.background.main, minHeight: '100vh' }}>
            {/* Header */}
            <HeaderContainer>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton sx={{ color: THEME_COLORS.text.secondary }} onClick={() => navigate('/quotes/all-quotes')}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Box>
                        <Typography variant="h4" sx={{ color: THEME_COLORS.text.primary, fontWeight: 600, fontSize: '1.5rem' }}>
                            New Quote
                        </Typography>
                        <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>
                            Create a new vehicle quotation
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <StyledButton
                        variant="outlined"
                        startIcon={<SaveIcon />}
                        onClick={handleSaveDraft}
                    >
                        Save Draft
                    </StyledButton>
                </Box>
            </HeaderContainer>

            {/* Stepper */}
            <Paper sx={{
                backgroundColor: THEME_COLORS.background.paper,
                border: `1px solid ${THEME_COLORS.border}`,
                borderRadius: '12px',
                p: 2,
                mb: 3
            }}>
                <CustomStepper activeStep={activeStep} alternativeLabel>
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel
                                StepIconComponent={(props) => (
                                    <CustomStepIcon
                                        icon={step.icon}
                                        active={props.active}
                                        completed={props.completed}
                                    />
                                )}
                                sx={{
                                    '& .MuiStepLabel-label': {
                                        color: index <= activeStep ? THEME_COLORS.text.primary : THEME_COLORS.text.secondary,
                                        fontWeight: index <= activeStep ? 600 : 400,
                                        fontSize: '0.875rem',
                                        mt: 1,
                                    },
                                }}
                            >
                                {step.label}
                            </StepLabel>
                        </Step>
                    ))}
                </CustomStepper>
            </Paper>

            {/* Main Content */}
            <Grid container spacing={3}>
                {/* Form Content */}
                <Grid item xs={12} lg={8}>
                    <Paper sx={{
                        backgroundColor: THEME_COLORS.background.paper,
                        border: `1px solid ${THEME_COLORS.border}`,
                        borderRadius: '12px',
                        p: 3
                    }}>
                        {renderStepContent()}
                    </Paper>
                </Grid>

                {/* Price Summary */}
                <Grid item xs={12} lg={4}>
                    <PriceSummaryCard>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ color: THEME_COLORS.text.primary, mb: 1, fontWeight: 600 }}>
                                Price Summary
                            </Typography>
                            <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary, mb: 3 }}>
                                Live calculation
                            </Typography>

                            <Divider sx={{ borderColor: THEME_COLORS.border, mb: 3 }} />

                            {formData.vehicleDetails.selectedVehicle ? (
                                <Box>
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="body1" sx={{ color: THEME_COLORS.text.primary, mb: 2 }}>
                                            {formData.vehicleDetails.selectedVehicle.name} - {formData.vehicleDetails.selectedVehicle.variant}
                                        </Typography>

                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>
                                                    Ex-Showroom:
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: THEME_COLORS.text.primary }}>
                                                    ₹{formData.pricing.vehiclePrice.toLocaleString()}
                                                </Typography>
                                            </Box>

                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>
                                                    Insurance:
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: THEME_COLORS.text.primary }}>
                                                    ₹{formData.pricing.insuranceCost.toLocaleString()}
                                                </Typography>
                                            </Box>

                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>
                                                    Accessories:
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: THEME_COLORS.text.primary }}>
                                                    ₹{formData.pricing.accessoriesCost.toLocaleString()}
                                                </Typography>
                                            </Box>

                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="body2" sx={{ color: THEME_COLORS.text.secondary }}>
                                                    Registration:
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: THEME_COLORS.text.primary }}>
                                                    ₹{formData.pricing.registrationCost.toLocaleString()}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Divider sx={{ borderColor: THEME_COLORS.border, mb: 2 }} />

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="subtitle1" sx={{ color: THEME_COLORS.text.primary, fontWeight: 600 }}>
                                                Total On-Road:
                                            </Typography>
                                            <Typography variant="h6" sx={{ color: THEME_COLORS.primary, fontWeight: 600 }}>
                                                ₹{formData.pricing.totalCost.toLocaleString()}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Selected Items Summary */}
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="subtitle2" sx={{ color: THEME_COLORS.text.primary, mb: 1, fontWeight: 600 }}>
                                            Selected Items:
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                            {formData.colorSelection.selectedColor && (
                                                <Chip
                                                    label={`Color: ${formData.colorSelection.selectedColor}`}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: THEME_COLORS.background.secondary,
                                                        color: THEME_COLORS.text.primary,
                                                        fontSize: '0.75rem'
                                                    }}
                                                />
                                            )}
                                            {formData.insurance.provider && (
                                                <Chip
                                                    label={`Insurance: ${formData.insurance.provider}`}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: THEME_COLORS.background.secondary,
                                                        color: THEME_COLORS.text.primary,
                                                        fontSize: '0.75rem'
                                                    }}
                                                />
                                            )}
                                            {formData.financing.schemeName && (
                                                <Chip
                                                    label={`Finance: ${formData.financing.schemeName}`}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: THEME_COLORS.background.secondary,
                                                        color: THEME_COLORS.text.primary,
                                                        fontSize: '0.75rem'
                                                    }}
                                                />
                                            )}
                                            {(formData.accessories.individualItems.length + formData.accessories.accessoryPacks.length) > 0 && (
                                                <Chip
                                                    label={`Accessories: ${formData.accessories.individualItems.length + formData.accessories.accessoryPacks.length} items`}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: THEME_COLORS.background.secondary,
                                                        color: THEME_COLORS.text.primary,
                                                        fontSize: '0.75rem'
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{ textAlign: 'center', py: 4 }}>
                                    <Typography variant="body1" sx={{ color: THEME_COLORS.text.secondary, mb: 2 }}>
                                        Select a vehicle to see pricing
                                    </Typography>
                                </Box>
                            )}

                            <StyledButton
                                variant="contained"
                                fullWidth
                                startIcon={<PictureAsPdfIcon />}
                                onClick={handleGeneratePDF}
                                sx={{ mt: 2 }}
                                disabled={!formData.vehicleDetails.selectedVehicle}
                            >
                                Generate PDF Quote
                            </StyledButton>
                        </CardContent>
                    </PriceSummaryCard>
                </Grid>
            </Grid>
        </Box>
    );
};

export default NewQuoteForm;
