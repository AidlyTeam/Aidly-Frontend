import DonateDetailPagesCard from '@/components/donate-detail/DonateDetails'
import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getCampaign, getCampaignById } from '@/store/campaign/campaignSlice'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'


const DonateDetailPages = () => {

  const { campaign: campaignSlice } = useSelector((state) => state);

  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    dispatch(getCampaignById(id));
  }, [dispatch, id]);

  const donationsDetails = campaignSlice.data.data || [];


  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', px: 2 }}>
        <DonateDetailPagesCard donateDetails={donationsDetails} />
    </Box>
  )
}

export default DonateDetailPages