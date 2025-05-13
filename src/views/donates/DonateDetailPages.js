import DonateDetailPagesCard from '@/components/donate-detail/DonateDetails'
import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getCampaign, getCampaignById } from '@/store/campaign/campaignSlice'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { getCampaignByIdAdmin } from '@/store/admin/campaign'
import { getUserInfo } from '@/store/user/userSlice'


const DonateDetailPages = () => {
  const { data: campaignData, loading } = useSelector((state) => state.admin.campaign);
  const { user: userSlice } = useSelector((state) => state);
  const userData = userSlice?.data?.data;

  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      dispatch(getCampaignByIdAdmin({id}));
      dispatch(getUserInfo());
    }
  }, [dispatch, id]);

  


  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', px: 2 }}>
      <DonateDetailPagesCard donateDetails={campaignData} haveWallet={userData.walletAddress ? true : false} />
    </Box>
  )
}

export default DonateDetailPages