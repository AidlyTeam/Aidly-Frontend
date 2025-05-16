import DonateMost from "@/components/home/donate-most/DonateMost"
import StatisticCard from "@/components/home/statistic/StatisticCard"
import WhoWeCard from "@/components/home/whowe/WhoWeCard"
import { Box } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCampaign } from "@/store/campaign/campaignSlice"
import { getStatistic } from "@/store/user/userSlice"

const Home = () => {
    const dispatch = useDispatch();
    const { campaign: campaignSlice } = useSelector((state) => state);
    const { statistic } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getCampaign("limit=3"));
        dispatch(getStatistic());
    }, [dispatch]);


    const statistics = statistic?.data;

    const totalUsers = statistics?.TotalUsers ?? 0;
    const totalDonations = statistics?.TotalDonations ?? 0;
    const totalCampaigns = statistics?.TotalCampaigns ?? 0;

    const donations = Array.isArray(campaignSlice?.data?.data) ? campaignSlice?.data?.data : [];

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <StatisticCard totalCampaigns={totalCampaigns} totalDonations={totalDonations} totalUsers={totalUsers} />
            <WhoWeCard />
            <DonateMost donations={donations} loading={campaignSlice.loading} />
        </Box>
    )
}

export default Home