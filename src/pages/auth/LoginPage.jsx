// import React, { useState } from 'react';
// import {
//   Box,
//   Container,
//   Typography,
//   TextField,
//   Button,
//   FormControlLabel,
//   Checkbox,
//   Link,
//   useTheme,
//   useMediaQuery,
//   Alert,
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import EmailIcon from '@mui/icons-material/Email';
// import InputAdornment from '@mui/material/InputAdornment';
// import IconButton from '@mui/material/IconButton';
// import { useNavigate } from 'react-router-dom';
// import loginimage from "../../assets/loginpageimage/loginpage.jpg";

// // Theme constants matching AllQuotes design
// const THEME_COLORS = {
//   primary: '#E56751',
//   primaryHover: '#D65A45',
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
//   success: '#4CAF50',
//   warning: '#FF9800',
//   error: '#F44336',
// };

// // Styled Components
// const StyledTextField = styled(TextField)(({ theme }) => ({
//   '& .MuiOutlinedInput-root': {
//     backgroundColor: THEME_COLORS.background.paper,
//     color: THEME_COLORS.text.primary,
//     fontSize: '0.875rem',
//     borderRadius: '12px',
//     transition: 'all 0.3s ease',
//     '& fieldset': {
//       borderColor: THEME_COLORS.border,
//       borderWidth: '1px',
//     },
//     '&:hover fieldset': {
//       borderColor: THEME_COLORS.primary,
//     },
//     '&.Mui-focused fieldset': {
//       borderColor: THEME_COLORS.primary,
//       borderWidth: '2px',
//       boxShadow: `0 0 0 3px rgba(229, 103, 81, 0.1)`,
//     },
//   },
//   '& .MuiInputLabel-root': {
//     color: THEME_COLORS.text.secondary,
//     fontSize: '0.875rem',
//     '&.Mui-focused': {
//       color: THEME_COLORS.primary,
//     },
//   },
//   '& .MuiInputAdornment-root': {
//     color: THEME_COLORS.text.secondary,
//   },
// }));

// const StyledButton = styled(Button)(({ theme }) => ({
//   backgroundColor: THEME_COLORS.primary,
//   color: 'white',
//   textTransform: 'none',
//   fontWeight: 600,
//   borderRadius: '12px',
//   padding: theme.spacing(1.5, 2),
//   fontSize: '1rem',
//   boxShadow: '0 4px 12px rgba(229, 103, 81, 0.3)',
//   transition: 'all 0.3s ease',
//   '&:hover': {
//     backgroundColor: THEME_COLORS.primaryHover,
//     boxShadow: '0 6px 16px rgba(229, 103, 81, 0.4)',
//     transform: 'translateY(-1px)',
//   },
// }));

// // Full Screen Container with proper height handling
// const FullScreenContainer = styled(Box)(({ theme }) => ({
//   backgroundColor: THEME_COLORS.background.main,
//   minHeight: '100vh',
//   height: '100vh',
//   display: 'flex',
//   flexDirection: 'row',
//   overflow: 'hidden',
//   [theme.breakpoints.down('md')]: {
//     flexDirection: 'column',
//     height: 'auto',
//     minHeight: '100vh',
//   },
// }));

// const FormSection = styled(Box)(({ theme }) => ({
//   width: '50%',
//   height: '100vh',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   backgroundColor: THEME_COLORS.background.main,
//   overflow: 'auto',
//   [theme.breakpoints.down('md')]: {
//     width: '100%',
//     height: 'auto',
//     minHeight: '100vh',
//     order: 2,
//     padding: theme.spacing(2, 0),
//   },
// }));

// const ImageSection = styled(Box)(({ theme }) => ({
//   width: '50%',
//   height: '100vh',
//   display: 'block',
//   overflow: 'hidden',
//   [theme.breakpoints.down('md')]: {
//     width: '100%',
//     height: '40vh',
//     order: 1,
//   },
// }));

// // Form Card with glassmorphism effect
// const FormCard = styled(Box)(({ theme }) => ({
//   backdropFilter: 'blur(20px)',
//   borderRadius: '20px',
//   padding: theme.spacing(4),
//   width: '100%',
//   maxWidth: '600px',
//   boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
//   [theme.breakpoints.down('sm')]: {
//     padding: theme.spacing(3),
//     borderRadius: '16px',
//     margin: theme.spacing(2),
//   },
// }));

// const LoginPage = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     rememberMe: false
//   });
//   const [errors, setErrors] = useState({
//     email: '',
//     password: '',
//     general: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   const navigate = useNavigate();

//   // Predefined credentials with roles
//   const validCredentials = {
//     'admin@gmail.com': {
//       password: '123456',
//       role: 'ADMIN',
//       name: 'Administrator'
//     },
//     'sales@gmail.com': {
//       password: '123456',
//       role: 'SALESEXECUTIVE',
//       name: 'Sales Executive'
//     }
//   };

//   // Email validation function
//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email) {
//       return 'Email is required';
//     }
//     if (!emailRegex.test(email)) {
//       return 'Please enter a valid email address';
//     }
//     return '';
//   };

//   // Password validation function
//   const validatePassword = (password) => {
//     if (!password) {
//       return 'Password is required';
//     }
//     if (password.length < 6) {
//       return 'Password must be at least 6 characters';
//     }
//     return '';
//   };

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value, checked } = e.target;
//     const inputValue = name === 'rememberMe' ? checked : value;
    
//     setFormData(prev => ({
//       ...prev,
//       [name]: inputValue
//     }));

//     // Clear errors when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: '',
//         general: ''
//       }));
//     }
//   };

//   // Handle field blur for real-time validation
//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     let error = '';

//     switch (name) {
//       case 'email':
//         error = validateEmail(value);
//         break;
//       case 'password':
//         error = validatePassword(value);
//         break;
//       default:
//         break;
//     }

//     setErrors(prev => ({
//       ...prev,
//       [name]: error
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     // Validate all fields
//     const emailError = validateEmail(formData.email);
//     const passwordError = validatePassword(formData.password);

//     if (emailError || passwordError) {
//       setErrors({
//         email: emailError,
//         password: passwordError,
//         general: ''
//       });
//       setIsLoading(false);
//       return;
//     }

//     try {
//       // Simulate loading delay for better UX
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       const user = validCredentials[formData.email.toLowerCase()];

//       if (!user) {
//         setErrors({
//           email: '',
//           password: '',
//           general: 'Invalid email address. Please check your credentials.'
//         });
//         setIsLoading(false);
//         return;
//       }

//       if (user.password !== formData.password) {
//         setErrors({
//           email: '',
//           password: '',
//           general: 'Invalid password. Please check your credentials.'
//         });
//         setIsLoading(false);
//         return;
//       }

//       // Successful login - store user data in localStorage
//       const userData = {
//         email: formData.email,
//         role: user.role,
//         name: user.name,
//         isAuthenticated: true,
//         loginTime: new Date().toISOString(),
//         rememberMe: formData.rememberMe
//       };

//       // Store in localStorage
//       // localStorage.setItem('currentUser', JSON.stringify(userData));
//       localStorage.setItem('role',userData.role)
//       if (formData.rememberMe) {
//         localStorage.setItem('rememberUser', 'true');
//       }

//       console.log('Login successful:', userData);

//       // Clear form
//       setFormData({
//         email: '',
//         password: '',
//         rememberMe: false
//       });

//       // Navigate to dashboard with role information
//       navigate('/dashboard', { 
//         state: { 
//           user: userData,
//           loginSuccess: true 
//         } 
//       });

//     } catch (error) {
//       console.error('Login error:', error);
//       setErrors({
//         email: '',
//         password: '',
//         general: 'Something went wrong. Please try again.'
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <FullScreenContainer>
//       <FormSection>
//         <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center' }}>
//           <FormCard>
//             <Box sx={{ textAlign: 'center', mb: 4 }}>
//               <Typography
//                 variant={isSmallMobile ? 'h3' : 'h2'}
//                 sx={{
//                   mb: 1,
//                   fontWeight: 800,
//                   color: THEME_COLORS.primary,
//                   fontSize: { xs: '2.5rem', sm: '3rem' },
//                   letterSpacing: '-0.02em',
//                 }}
//               >
//                 Quotation Portal
//               </Typography>
              
//               <Typography 
//                 variant={isSmallMobile ? 'h6' : 'h5'} 
//                 sx={{ 
//                   mb: 1, 
//                   fontWeight: 600,
//                   color: THEME_COLORS.text.primary,
//                   fontSize: { xs: '1.25rem', sm: '1.5rem' },
//                 }}
//               >
//                 Welcome Back
//               </Typography>
              
//               <Typography 
//                 variant="body1" 
//                 sx={{ 
//                   color: THEME_COLORS.text.secondary,
//                   fontSize: '0.95rem',
//                   lineHeight: 1.6,
//                   maxWidth: '300px',
//                   mx: 'auto',
//                 }}
//               >
//                 Sign in to access your dashboard and manage quotations
//               </Typography>
//             </Box>

//             <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
//               {/* General Error Alert */}
//               {errors.general && (
//                 <Alert 
//                   severity="error" 
//                   sx={{ 
//                     mb: 3,
//                     backgroundColor: 'rgba(244, 67, 54, 0.1)',
//                     color: THEME_COLORS.error,
//                     '& .MuiAlert-icon': {
//                       color: THEME_COLORS.error,
//                     }
//                   }}
//                 >
//                   {errors.general}
//                 </Alert>
//               )}

//               {/* Email Field */}
//               <StyledTextField
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 size="medium"
//                 value={formData.email}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={!!errors.email}
//                 helperText={errors.email}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <EmailIcon sx={{ fontSize: 20, color: THEME_COLORS.text.tertiary }} />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{ 
//                   mb: 3,
//                   '& .MuiFormHelperText-root': {
//                     color: THEME_COLORS.error,
//                   }
//                 }}
//               />

//               {/* Password Field */}
//               <StyledTextField
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type={showPassword ? 'text' : 'password'}
//                 autoComplete="current-password"
//                 size="medium"
//                 value={formData.password}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={!!errors.password}
//                 helperText={errors.password}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={() => setShowPassword(!showPassword)}
//                         edge="end"
//                         sx={{ 
//                           color: THEME_COLORS.text.tertiary,
//                           '&:hover': { color: THEME_COLORS.primary }
//                         }}
//                       >
//                         {showPassword ? 
//                           <VisibilityIcon sx={{ fontSize: 20 }} /> : 
//                           <VisibilityOffIcon sx={{ fontSize: 20 }} />
//                         }
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{ 
//                   mb: 3,
//                   '& .MuiFormHelperText-root': {
//                     color: THEME_COLORS.error,
//                   }
//                 }}
//               />

//               {/* Remember Me & Forgot Password */}
//               <Box 
//                 sx={{ 
//                   display: 'flex', 
//                   justifyContent: 'space-between', 
//                   alignItems: 'center',
//                   mb: 4,
//                   flexWrap: 'wrap',
//                   gap: 1,
//                 }}
//               >
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       name="rememberMe"
//                       checked={formData.rememberMe}
//                       onChange={handleChange}
//                       sx={{
//                         color: THEME_COLORS.text.secondary,
//                         '&.Mui-checked': {
//                           color: THEME_COLORS.primary,
//                         },
//                       }}
//                     />
//                   }
//                   label={
//                     <Typography 
//                       variant="body2" 
//                       sx={{ 
//                         color: THEME_COLORS.text.secondary,
//                         fontSize: '0.875rem',
//                       }}
//                     >
//                       Remember Me
//                     </Typography>
//                   }
//                 />
//                 <Link
//                   href="#"
//                   variant="body2"
//                   sx={{
//                     color: THEME_COLORS.primary,
//                     textDecoration: 'none',
//                     fontSize: '0.875rem',
//                     fontWeight: 500,
//                     '&:hover': { 
//                       textDecoration: 'underline',
//                       color: THEME_COLORS.primaryHover,
//                     }
//                   }}
//                 >
//                   Forgot Password?
//                 </Link>
//               </Box>

//               {/* Sign In Button */}
//               <StyledButton
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 disabled={isLoading}
//                 sx={{ 
//                   mb: 3,
//                   opacity: isLoading ? 0.7 : 1,
//                   cursor: isLoading ? 'not-allowed' : 'pointer',
//                 }}
//               >
//                 {isLoading ? 'Signing In...' : 'Sign In to Dashboard'}
//               </StyledButton>

//               {/* Demo Credentials Info */}
              
//             </Box>
//           </FormCard>
//         </Container>
//       </FormSection>

//       {/* Image Section */}
//       <ImageSection>
//         <Box
//           component="img"
//           src={loginimage}
//           alt="Login Background"
//           sx={{
//             width: '100%',
//             height: '100%',
//             objectFit: 'cover',
//             objectPosition: 'center',
//           }}
//         />
//       </ImageSection>
//     </FullScreenContainer>
//   );
// };

// export default LoginPage;





























import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Link,
  useTheme,
  useMediaQuery,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

// Theme constants matching AllQuotes design
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

// Styled Components
const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: THEME_COLORS.background.paper,
    color: THEME_COLORS.text.primary,
    fontSize: '0.875rem',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    '& fieldset': {
      borderColor: THEME_COLORS.border,
      borderWidth: '1px',
    },
    '&:hover fieldset': {
      borderColor: THEME_COLORS.primary,
    },
    '&.Mui-focused fieldset': {
      borderColor: THEME_COLORS.primary,
      borderWidth: '2px',
      boxShadow: `0 0 0 3px rgba(229, 103, 81, 0.1)`,
    },
  },
  '& .MuiInputLabel-root': {
    color: THEME_COLORS.text.secondary,
    fontSize: '0.875rem',
    '&.Mui-focused': {
      color: THEME_COLORS.primary,
    },
  },
  '& .MuiInputAdornment-root': {
    color: THEME_COLORS.text.secondary,
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: THEME_COLORS.background.paper,
  color: THEME_COLORS.text.primary,
  fontSize: '0.875rem',
  borderRadius: '12px',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: THEME_COLORS.border,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: THEME_COLORS.primary,
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: THEME_COLORS.primary,
    borderWidth: '2px',
    boxShadow: `0 0 0 3px rgba(229, 103, 81, 0.1)`,
  },
  '& .MuiSelect-icon': {
    color: THEME_COLORS.text.secondary,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: THEME_COLORS.primary,
  color: 'white',
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: '12px',
  padding: theme.spacing(1.5, 2),
  fontSize: '1rem',
  boxShadow: '0 4px 12px rgba(229, 103, 81, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: THEME_COLORS.primaryHover,
    boxShadow: '0 6px 16px rgba(229, 103, 81, 0.4)',
    transform: 'translateY(-1px)',
  },
}));

// Full Screen Container with dual logo layout
const FullScreenContainer = styled(Box)(({ theme }) => ({
  backgroundColor: THEME_COLORS.background.main,
  minHeight: '100vh',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

// Logo Header Section
const LogoHeader = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '80px',
  backgroundColor: THEME_COLORS.background.main,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2, 4),
  borderBottom: `1px solid ${THEME_COLORS.border}`,
  [theme.breakpoints.down('sm')]: {
    height: '100px',
    padding: theme.spacing(1, 2),
  },
}));

const FormSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: THEME_COLORS.background.main,
  overflow: 'auto',
  padding: theme.spacing(2, 0),
}));

// Form Card with glassmorphism effect
const FormCard = styled(Box)(({ theme }) => ({
  backdropFilter: 'blur(20px)',
  borderRadius: '20px',
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: '500px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  marginTop:'10px',
  // backgroundColor: 'rgba(26, 26, 26, 0.8)',
  // border: `1px solid ${THEME_COLORS.border}`,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    borderRadius: '16px',
    margin: theme.spacing(2),
  },
}));

const LoginPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    dealership: '',
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({
    dealership: '',
    email: '',
    password: '',
    general: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Dealership options
  const dealerships = [
    'Indraprastha Automobiles – Wazirpur',
    'Indraprastha Automobiles – Peeragarhi',
    'Indraprastha Automobiles – Ashok Nagar',
    'Indraprastha Automobiles – Janakpuri',
    'Indraprastha Automobiles – Prashant Vihar',
    'Indraprastha Automobiles – Narela',
    'Indraprastha Automobiles – Shakti Nagar',
  ];

  // Predefined credentials with roles
  const validCredentials = {
    'admin@gmail.com': {
      password: '123456',
      role: 'ADMIN',
      name: 'Administrator'
    },
    'sales@gmail.com': {
      password: '123456',
      role: 'SALESEXECUTIVE',
      name: 'Sales Executive'
    }
  };

  // Dealership validation function
  const validateDealership = (dealership) => {
    if (!dealership) {
      return 'Please select a dealership';
    }
    return '';
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email is required';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  // Password validation function
  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    const inputValue = name === 'rememberMe' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: inputValue
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
        general: ''
      }));
    }
  };

  // Handle field blur for real-time validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = '';

    switch (name) {
      case 'dealership':
        error = validateDealership(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate all fields
    const dealershipError = validateDealership(formData.dealership);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (dealershipError || emailError || passwordError) {
      setErrors({
        dealership: dealershipError,
        email: emailError,
        password: passwordError,
        general: ''
      });
      setIsLoading(false);
      return;
    }

    try {
      // Simulate loading delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = validCredentials[formData.email.toLowerCase()];

      if (!user) {
        setErrors({
          dealership: '',
          email: '',
          password: '',
          general: 'Invalid email address. Please check your credentials.'
        });
        setIsLoading(false);
        return;
      }

      if (user.password !== formData.password) {
        setErrors({
          dealership: '',
          email: '',
          password: '',
          general: 'Invalid password. Please check your credentials.'
        });
        setIsLoading(false);
        return;
      }

      // Successful login - store user data in localStorage
      const userData = {
        dealership: formData.dealership,
        email: formData.email,
        role: user.role,
        name: user.name,
        isAuthenticated: true,
        loginTime: new Date().toISOString(),
        rememberMe: formData.rememberMe
      };

      // Store in localStorage
      localStorage.setItem('role', userData.role);
      localStorage.setItem('selectedDealership', formData.dealership);
      if (formData.rememberMe) {
        localStorage.setItem('rememberUser', 'true');
      }

      console.log('Login successful:', userData);

      // Clear form
      setFormData({
        dealership: '',
        email: '',
        password: '',
        rememberMe: false
      });

      // Navigate to dashboard with role information
      navigate('/dashboard', { 
        state: { 
          user: userData,
          loginSuccess: true 
        } 
      });

    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        dealership: '',
        email: '',
        password: '',
        general: 'Something went wrong. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FullScreenContainer>
      {/* Logo Header Section */}
      <LogoHeader>
        <Box sx={{ flex: '0 0 150px' }}>
          <img 
            src="/logo.jpeg" 
            alt="Company Logo 1" 
            style={{
              maxWidth: '140px',
              maxHeight: '80px',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain'
            }}
            onError={(e) => {e.target.style.display = 'none'}}
          />
        </Box>
        
        <Box sx={{ textAlign: 'center', flex: 1 }}>
          <Typography
            variant={isSmallMobile ? 'h5' : 'h4'}
            sx={{
              fontWeight: 800,
              color: THEME_COLORS.primary,
              fontSize: { xs: '1.5rem', sm: '2rem' },
              letterSpacing: '1px',
              mb: 0.5,
            }}
          >
            Dealership Quotation System
          </Typography>
          {/* <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: THEME_COLORS.text.primary,
              fontSize: { xs: '1rem', sm: '1.25rem' },
              letterSpacing: '0.5px',
            }}
          >
            M&M AUTHORIZED DEALER
          </Typography> */}
        </Box>
        
        <Box sx={{ flex: '0 0 150px', textAlign: 'right' }}>
          <img 
            src="/logo2.jpeg" 
            alt="Company Logo 2" 
            style={{
              maxWidth: '140px',
              maxHeight: '80px',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain'
            }}
            onError={(e) => {e.target.style.display = 'none'}}
          />
        </Box>
      </LogoHeader>

      {/* Form Section */}
      <FormSection>
        <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center' }}>
          <FormCard>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant={isSmallMobile ? 'h5' : 'h4'}
                sx={{
                  mb: 1,
                  fontWeight: 700,
                  color: THEME_COLORS.text.primary,
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                  letterSpacing: '-0.02em',
                }}
              >
                Welcome Back
              </Typography>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  color: THEME_COLORS.text.secondary,
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  maxWidth: '300px',
                  mx: 'auto',
                }}
              >
                Sign in to access your dashboard and manage quotations
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              {/* General Error Alert */}
              {errors.general && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3,
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    color: THEME_COLORS.error,
                    '& .MuiAlert-icon': {
                      color: THEME_COLORS.error,
                    }
                  }}
                >
                  {errors.general}
                </Alert>
              )}

              {/* Dealership Dropdown */}
              <FormControl 
                fullWidth 
                sx={{ 
                  mb: 3,
                  '& .MuiInputLabel-root': {
                    color: THEME_COLORS.text.secondary,
                    '&.Mui-focused': {
                      color: THEME_COLORS.primary,
                    },
                  },
                  '& .MuiFormHelperText-root': {
                    color: THEME_COLORS.error,
                  }
                }}
                error={!!errors.dealership}
              >
                <InputLabel>Select Dealership</InputLabel>
                <StyledSelect
                  name="dealership"
                  value={formData.dealership}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Select Dealership"
                  startAdornment={
                    <InputAdornment position="start">
                      <BusinessIcon sx={{ fontSize: 20, color: THEME_COLORS.text.tertiary, mr: 1 }} />
                    </InputAdornment>
                  }
                >
                  {dealerships.map((dealership, index) => (
                    <MenuItem 
                      key={index} 
                      value={dealership}
                      sx={{
                        color: THEME_COLORS.text.primary,
                        backgroundColor: THEME_COLORS.background.paper,
                        '&:hover': {
                          backgroundColor: THEME_COLORS.background.secondary,
                        },
                        '&.Mui-selected': {
                          backgroundColor: THEME_COLORS.primary,
                          '&:hover': {
                            backgroundColor: THEME_COLORS.primaryHover,
                          },
                        },
                      }}
                    >
                      {dealership}
                    </MenuItem>
                  ))}
                </StyledSelect>
                {errors.dealership && (
                  <Typography variant="caption" sx={{ color: THEME_COLORS.error, mt: 0.5, fontSize: '0.75rem' }}>
                    {errors.dealership}
                  </Typography>
                )}
              </FormControl>

              {/* Email Field */}
              <StyledTextField
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                size="medium"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EmailIcon sx={{ fontSize: 20, color: THEME_COLORS.text.tertiary }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  mb: 3,
                  '& .MuiFormHelperText-root': {
                    color: THEME_COLORS.error,
                  }
                }}
              />

              {/* Password Field */}
              <StyledTextField
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                size="medium"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ 
                          color: THEME_COLORS.text.tertiary,
                          '&:hover': { color: THEME_COLORS.primary }
                        }}
                      >
                        {showPassword ? 
                          <VisibilityIcon sx={{ fontSize: 20 }} /> : 
                          <VisibilityOffIcon sx={{ fontSize: 20 }} />
                        }
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  mb: 3,
                  '& .MuiFormHelperText-root': {
                    color: THEME_COLORS.error,
                  }
                }}
              />

              {/* Remember Me & Forgot Password */}
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 4,
                  flexWrap: 'wrap',
                  gap: 1,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      sx={{
                        color: THEME_COLORS.text.secondary,
                        '&.Mui-checked': {
                          color: THEME_COLORS.primary,
                        },
                      }}
                    />
                  }
                  label={
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: THEME_COLORS.text.secondary,
                        fontSize: '0.875rem',
                      }}
                    >
                      Remember Me
                    </Typography>
                  }
                />
                <Link
                  href="#"
                  variant="body2"
                  sx={{
                    color: THEME_COLORS.primary,
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    '&:hover': { 
                      textDecoration: 'underline',
                      color: THEME_COLORS.primaryHover,
                    }
                  }}
                >
                  Forgot Password?
                </Link>
              </Box>

              {/* Sign In Button */}
              <StyledButton
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{ 
                  mb: 3,
                  opacity: isLoading ? 0.7 : 1,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                }}
              >
                {isLoading ? 'Signing In...' : 'Sign In to Dashboard'}
              </StyledButton>
            </Box>
          </FormCard>
        </Container>
      </FormSection>
    </FullScreenContainer>
  );
};

export default LoginPage;

