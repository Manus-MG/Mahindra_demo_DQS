// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Grid,
//   IconButton,
//   Divider,
//   Container
// } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// const MyProfile = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     userName: '',
//     phone: '',
//     email: '',
//     address: '',
//     country: '',
//     state: '',
//     city: '',
//     postalCode: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     console.log('Form Data Updated:', { ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form Submitted:', formData);
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size <= 800 * 1024) { // 800K limit
//         console.log('File uploaded:', file);
//       } else {
//         alert('File size should not exceed 800K');
//       }
//     }
//   };

//   return (
//       <Paper elevation={3} sx={{ p: 4}}>
//         <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
//           Profile Settings
//         </Typography>

//         <Box component="form" onSubmit={handleSubmit}>
//           {/* Employee Information Section */}
//           <Typography variant="h6" sx={{ mb: 2 }}>
//             Employee Information
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//             Provide the information below
//           </Typography>

//           {/* Image Upload Section */}
//           <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
//             <Box
//               sx={{
//                 width: 100,
//                 height: 100,
//                 border: '1px dashed grey',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 mr: 2
//               }}
//             >
//               <input
//                 accept="image/*"
//                 style={{ display: 'none' }}
//                 id="upload-photo"
//                 type="file"
//                 onChange={handleFileUpload}
//               />
//               <label htmlFor="upload-photo">
//                 <IconButton component="span">
//                   <CloudUploadIcon />
//                 </IconButton>
//               </label>
//             </Box>
//             <Button
//               variant="outlined"
//               component="label"
//               startIcon={<CloudUploadIcon />}
//             >
//               Upload File
//               <input
//                 hidden
//                 accept="image/*"
//                 type="file"
//                 onChange={handleFileUpload}
//               />
//             </Button>
//           </Box>
//           <Typography variant="caption" sx={{ mb: 3, display: 'block' }}>
//             JPG, GIF or PNG. Max size of 800K
//           </Typography>

//           {/* Form Grid */}
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={4}>
//               <TextField
//                 required
//                 fullWidth
//                 label="First Name"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <TextField
//                 required
//                 fullWidth
//                 label="Last Name"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <TextField
//                 required
//                 fullWidth
//                 label="User Name"
//                 name="userName"
//                 value={formData.userName}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 required
//                 fullWidth
//                 label="Phone Number"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 required
//                 fullWidth
//                 label="Email"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </Grid>
//           </Grid>

//           <Divider sx={{ my: 4 }} />

//           {/* Address Section */}
//           <Typography variant="h6" sx={{ mb: 2 }}>
//             Address
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//             Please enter the address details
//           </Typography>

//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <TextField
//                 required
//                 fullWidth
//                 label="Address"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 multiline
//                 rows={2}
//               />
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <TextField
//                 required
//                 fullWidth
//                 label="Country"
//                 name="country"
//                 value={formData.country}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <TextField
//                 required
//                 fullWidth
//                 label="State/Province"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <TextField
//                 required
//                 fullWidth
//                 label="City"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <TextField
//                 required
//                 fullWidth
//                 label="Postal Code"
//                 name="postalCode"
//                 value={formData.postalCode}
//                 onChange={handleChange}
//               />
//             </Grid>
//           </Grid>

//           {/* Action Buttons */}
//           <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-start' }}>
//             <Button variant="outlined" color="primary">
//               Cancel
//             </Button>
//             <Button
//               variant="contained"
//               color="error"
//               type="submit"
//             >
//               Save Changes
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//   );
// };

// export default MyProfile;



import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  IconButton,
  Divider,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const MyProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    phone: '',
    email: '',
    address: '',
    country: '',
    state: '',
    city: '',
    postalCode: ''
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    console.log('Form Data Updated:', { ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      console.log('File uploaded:', file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Profile Settings
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        {/* Employee Information Section */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Employee Information
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Provide the information below
        </Typography>

        {/* Image Upload Section */}
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: 100,
              height: 100,
              border: '1px dashed grey',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mr: 2,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {imagePreview ? (
              <>
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)'
                    }
                  }}
                  onClick={handleRemoveImage}
                  size="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </>
            ) : (
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="upload-photo"
                type="file"
                onChange={handleFileUpload}
              />
            )}
            {!imagePreview && (
              <label htmlFor="upload-photo">
                <IconButton component="span">
                  <CloudUploadIcon />
                </IconButton>
              </label>
            )}
          </Box>
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            Upload File
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleFileUpload}
            />
          </Button>
        </Box>

        {/* Form Grid */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              required
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              fullWidth
              label="User Name"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Address Section */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Address
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Please enter the address details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              multiline
              rows={2}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              required
              fullWidth
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              required
              fullWidth
              label="State/Province"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              required
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              required
              fullWidth
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-start' }}>
          <Button variant="outlined" color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            type="submit"
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default MyProfile;