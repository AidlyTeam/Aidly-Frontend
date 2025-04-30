import React from 'react';
import { Container, Paper, Box, Divider } from '@mui/material';
import PersonalInfoForm from '@/components/profile/PersonakInfoForm';
import PasswordChangeForm from '@/components/profile/PasswordChangeForm';


const ProfileInfo = () => {
  const userData = {
    firstName: 'Jayvion',
    lastName: 'Simon',
    email: 'nannie.abernethy70@yahoo.com',
    phone: '365-374-4961',
    birthday: 'DD/MM/YYYY',
    gender: 'male',
    street: '',
    zipCode: '',
    city: '',
    country: '',
  };

  return (
    <Box >
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        <PersonalInfoForm initialData={userData} />
        
        <Divider sx={{ my: 4 }} />
        
        <PasswordChangeForm />
      </Paper>
    </Box>
  );
};

export default ProfileInfo;