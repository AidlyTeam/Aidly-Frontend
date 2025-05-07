import React, { useEffect } from 'react';
import { Container, Paper, Box, Divider } from '@mui/material';
import PersonalInfoForm from '@/components/profile/PersonakInfoForm';
import PasswordChangeForm from '@/components/profile/PasswordChangeForm';
import { getUserInfo } from '@/store/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import BadgeList from '@/components/badge-list/BadgeList';

const ProfileInfo = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const { user: userSlice } = useSelector((state) => state);

  const userData = userSlice?.data?.data

  console.log(userData);

  return (
    <Box >
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        <PersonalInfoForm initialData={userData} />
        
        <Divider sx={{ my: 4 }} />
        
        <BadgeList badges={userData?.badges?.badges} />
      </Paper>
    </Box>
  );
};

export default ProfileInfo;