import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '@/store/user/userSlice';
import { setIsDefault } from '@/store/auth/authSlice';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from '@mui/material';

const ProfileUpdate = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isDefault } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
  });

  useEffect(() => {
    if (!isDefault) {
      router.replace('/home');
    }
  }, [isDefault, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateProfile(formData)).unwrap();
      dispatch(setIsDefault(false));
      router.push('/home');
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Complete Your Profile
          </Typography>
          <Typography variant="body1" gutterBottom align="center" sx={{ mb: 4 }}>
            Please complete your profile information to continue
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
              margin="normal"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
            >
              Update Profile
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProfileUpdate; 