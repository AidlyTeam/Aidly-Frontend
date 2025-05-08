import React, { useEffect } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import DonationCard from "@/components/profile/DonateCard";
import NoDonations from "@/components/profile/NoDonation";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getDonationsForCampaign } from "@/store/donations/donationsSlice";

const ProfileDonate = () => {
  const dispatch = useDispatch();
  const { donations: donationSlice } = useSelector((state) => state);

  const router = useRouter();

  useEffect(() => {
    dispatch(getDonationsForCampaign());
  }, [dispatch]);

  const handleDonateClick = () => {
    router.push("/donates");
  };

  console.log(donationSlice.data.data);


  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Donations
      </Typography>

      {donationSlice?.data?.data?.totalCount === 0 ? (
        <NoDonations onDonateClick={handleDonateClick} />
      ) : (
        <Grid container spacing={2}>
          {donationSlice?.data?.data?.donations.map((donation) => (
            <Grid item xs={12} sm={6} md={4} key={donation.id}>
              <DonationCard
                organization={donation.campaignTitle}
                amount={donation.amount}
                date={donation.donationDate}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProfileDonate;
