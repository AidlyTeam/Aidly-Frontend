import DonateMost from "@/components/home/donate-most/DonateMost"
import StatisticCard from "@/components/home/statistic/StatisticCard"
import WhoWeCard from "@/components/home/whowe/WhoWeCard"
import { Box } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCampaign } from "@/store/campaign/campaignSlice"

const Home = () => {
    const dispatch = useDispatch();
    const { campaign: campaignSlice } = useSelector((state) => state);

    useEffect(() => {
        dispatch(getCampaign("limit=3"));
    }, [dispatch]);

    const donations = Array.isArray(campaignSlice?.data?.data) ? campaignSlice?.data?.data : [];

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <StatisticCard />
            <WhoWeCard />
            <DonateMost donations={donations} loading={campaignSlice.loading} />
        </Box>
    )
}

export default Home