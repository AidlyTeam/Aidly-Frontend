import DonateMost from "@/components/home/donate-most/DonateMost"
import StatisticCard from "@/components/home/statistic/StatisticCard"
import WhoWeCard from "@/components/home/whowe/WhoWeCard"
import { Box } from "@mui/material"

const Home = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap : 2,
            }}
        >
            <StatisticCard />
            <WhoWeCard />
            <DonateMost />
        </Box>
    )
}

export default Home