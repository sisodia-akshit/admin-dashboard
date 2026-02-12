import { Box, Toolbar, Typography } from "@mui/material";
import DashboardLayout from "../components/layout/DashboardLayout";
import CardOne from "../components/common/CardOne";
import PeopleIcon from "@mui/icons-material/People";
import CardTwo from "../components/common/CardTwo";
import CardThree from "../components/common/CardThree";
import CardDashboardSummary from "../components/common/CardDashboardSummary";
import CardDashboardRecent from "../components/common/CardDashboardRecent";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import OrderIcon from "@mui/icons-material/ShoppingBag";
import RevenueIcon from "@mui/icons-material/Money";
import { useDashboardStats } from "../context/DashboardStatsContext";

function Dashboard() {
  const { stats } = useDashboardStats();
  return (
    <DashboardLayout>
      {/* top  */}
      <Box sx={{
        display: "flex",
        flexDirection: { md: "row", xs: "column" },
        gap: { md: 2, xs: 1 },
        height: "100%",           // 👈 REQUIRED
        alignItems: "stretch",    // 👈 IMPORTANT
      }}>
        <Box sx={{
          display: "grid",
          gridTemplateColumns: { md: "repeat(auto-fit, minmax(260px, 1fr))", xs: "repeat(auto-fit, minmax(300px, 1fr))" },
          gap: { md: 2, xs: 1 },
          flex: 1
        }}>
          <CardOne Icon={RevenueIcon} label1={"Sales"} label2={"Volume"} value1={0} value2={0} />
          <CardOne Icon={PeopleIcon} label1={"Customers"} label2={"Active"} value1={stats.totalUsers} value2={stats.totalUsers} />
          <CardThree value1={0} value2={0} value3={0} />
          <Box
            sx={{
              display: "grid",
              gap: { md: 2, xs: 1 },
            }}
          >
            <CardOne Icon={InventoryIcon} label1={"All Products"} label2={"Active"} value1={stats.totalBooks} value2={0} />
            <CardOne Icon={ShoppingCartIcon} label1={"Abandoned Cart"} label2={"Customers"} value1={0} value2={0} />
          </Box>
          <Box
            sx={{
              gridColumn: "1 / -1",
            }}
          >
            <CardDashboardSummary />
          </Box>

        </Box>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          // gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          minWidth: { md: "420px", xs: "310px" },
          gap: { md: 2, xs: 1 },
          flex: 0.65
        }}>
          <CardTwo Icon={OrderIcon} label1={"All Orders"} label2={"Pending"} label3={"Confirmed"} value1={stats.totalOrders} value2={stats.orders?.pending} value3={stats.orders?.confirmed} />
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <CardDashboardRecent />
          </Box>
        </Box>
      </Box>
    </DashboardLayout >
  );
}

export default Dashboard;
