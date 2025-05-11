import React, { useEffect, useState } from 'react';
import { Container, Paper, Box, Divider, Tabs, Tab } from '@mui/material';
import PersonalInfoForm from '@/components/profile/PersonakInfoForm';
import PasswordChangeForm from '@/components/profile/PasswordChangeForm';
import { getUserInfo } from '@/store/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import BadgeList from '@/components/badge-list/BadgeList';
import NFTList from '@/components/nft-list/NFTList';

const ProfileInfo = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const { user: userSlice } = useSelector((state) => state);
  const userData = userSlice?.data?.data;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const nfts = userData?.badges?.badges?.filter(badge => badge.isNft) || [];
  const badges = userData?.badges?.badges?.filter(badge => !badge.isNft) || [];

  return (
    <Box>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        <PersonalInfoForm initialData={userData} />
        
        <Divider sx={{ my: 4 }} />

        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
              sx={{
                '& .MuiTab-root': {
                  color: 'text.secondary',
                  '&.Mui-selected': {
                    color: 'secondary.main',
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: 'secondary.main',
                },
              }}
            >
              <Tab label="My NFTs" />
              <Tab label="My Badges" />
            </Tabs>
          </Box>

          <Box sx={{ mt: 3 }}>
            {activeTab === 0 && (
              <NFTList nfts={nfts} />
            )}
            {activeTab === 1 && (
              <BadgeList badges={badges} />
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfileInfo;