import DonateDetailPagesCard from '@/components/donate-detail/DonateDetails'
import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getCampaign, getCampaignById } from '@/store/campaign/campaignSlice'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { getCampaignByIdAdmin } from '@/store/admin/campaign'


const DonateDetailPages = () => {
  const { data: campaignData, loading } = useSelector((state) => state.admin.campaign);

  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      dispatch(getCampaignByIdAdmin({id}));
    }
  }, [dispatch, id]);

  


  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', px: 2 }}>
      <DonateDetailPagesCard donateDetails={campaignData} />
    </Box>
  )
}

export default DonateDetailPages