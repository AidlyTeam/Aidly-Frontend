import React from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import DonationCard from '@/components/profile/DonateCard';
import NoDonations from '@/components/profile/NoDonation';
import { useRouter } from 'next/router';

const ProfileDonate = () => {
  // const donations = []; 
  const donations = [
    {
      id: 1,
      organization: "Clean Water Project",
      amount: 100,
      date: "2023-10-01",
    },
    {
      id: 2,
      organization: "Food for All",
      amount: 50,
      date: "2023-09-15",
    },
    {
      id: 3,
      organization: "Tree Plantation Initiative",
      amount: 200,
      date: "2023-08-20",
    },
  ];

  const router = useRouter();
  const handleDonateClick = () => {
    router.push('/donates');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Donations
      </Typography>

      {donations.length === 0 ? (
        <NoDonations onDonateClick={handleDonateClick} />
      ) : (
        <Grid container spacing={2}>
          {donations?.map((donation) => (
            <Grid item xs={12} sm={6} md={4} key={donation.id}>
              <DonationCard
                organization={donation.organization}
                amount={donation.amount}
                date={donation.date}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProfileDonate;
