import DonateDetailAdminPagesCard from '@/components/donate-detail/DonateDetailsAdmin'
import { getCampaignByIdAdmin } from '@/store/admin/campaign';
import { Box } from '@mui/material'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const CampaignDetails = () => {
  const { data: campaignData, loading } = useSelector((state) => state.admin.campaign);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      dispatch(getCampaignByIdAdmin({id}));
    }
  }, [dispatch, id]);

  if (loading) {
    return <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', px: 2 }}>Loading...</Box>;
  }


  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', px: 2 }}>
        <DonateDetailAdminPagesCard donateDetails={campaignData} />
    </Box>
  )
}

export default CampaignDetails