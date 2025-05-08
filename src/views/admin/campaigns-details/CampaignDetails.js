import DonateDetailAdminPagesCard from '@/components/donate-detail/DonateDetailsAdmin'
import { getCampaignByIdAdmin } from '@/store/admin/campaign';
import { Box } from '@mui/material'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const CampaignDetails = () => {

  const { campaignAdmin: campaignAdminSlice } = useSelector((state) => state);

  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;



  useEffect(() => {
    dispatch(getCampaignByIdAdmin(id));
  }, [dispatch, id]);

  console.log(campaignAdminSlice);

  const donationsDetails = campaignAdminSlice?.data?.data || [];

        

  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', px: 2 }}>
        <DonateDetailAdminPagesCard  donateDetails={donationsDetails} />
    </Box>
  )
}

export default CampaignDetails