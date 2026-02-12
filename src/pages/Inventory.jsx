import DashboardLayout from '../components/layout/DashboardLayout'
import { Box, Button, Typography } from '@mui/material'
import CardOne from '../components/common/CardOne'
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import CardTwo from '../components/common/CardTwo';
import CardInventoryItems from '../components/common/CardInventoryItems';

import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from 'react-router-dom';
import { useDashboardStats } from '../context/DashboardStatsContext';


function Inventory() {
    const { stats } = useDashboardStats();
    const navigate = useNavigate()

    const NewInvantoryHandler = () => {
        navigate("add-inventory")
    }
    return (
        <DashboardLayout>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: { md: 2, xs: 1 }
            }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <Typography>
                        Inventory
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            display: "flex",
                            gap: 1,
                        }}
                        onClick={NewInvantoryHandler}
                    >
                        <AddIcon fontSize="small" />New Product
                    </Button>
                </Box>
                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(300px, 1fr))",
                    gap: { md: 2, xs: 1 }
                }}>
                    <CardOne Icon={PeopleIcon} label1={"All Items"} label2={"Available"} value1={stats.totalBooks} value2={8} />
                    <CardTwo Icon={InventoryIcon} label1={"Low Stock"} label2={"N/A"} label3={"1 Star Rating"} value1={24} value2={32} value3={0} />
                </Box>

                {/* card Inventory Items  */}
                <CardInventoryItems />

            </Box>
        </DashboardLayout>
    )
}

export default Inventory