import { Box, Button, Typography } from "@mui/material";
import DashboardLayout from "../components/layout/DashboardLayout";
import CardTwo from "../components/common/CardTwo";
import CardOne from "../components/common/CardOne";

import { useDashboardStats } from "../context/DashboardStatsContext";
import CardCustomerOrders from "../components/common/CardCustomerOrders";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import OrderIcon from "@mui/icons-material/ShoppingBag";
import TrollyIcon from "@mui/icons-material/Trolley";


function Orders() {
  const { stats } = useDashboardStats();

  return (
    <DashboardLayout>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        gap: { md: 2, xs: 1 }
      }}>
        <Typography fontWeight={500}>
          Orders Summary
        </Typography>
        <Box>
          <Box sx={{
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            gap: { md: 2, xs: 1 }

          }}>
            <Box sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: { md: 2, xs: 1 },
              flex: 1
            }}>
              <CardTwo Icon={OrderIcon} label1={"All Orders"} label2={"Pending"} label3={"Confirmed"} value1={stats?.totalOrders} value2={stats?.orders?.pending} value3={stats?.orders?.confirmed} />
              <CardTwo Icon={TrollyIcon} label1={"Cancelled"} label2={"Shipped"} label3={"Delivered"} value1={stats?.orders?.cancelled} value2={stats?.orders?.shipped} value3={stats?.orders?.delivered} />
            </Box>
            <Box sx={{
              minWidth: { md: "300px", xs: "300px" },
            }}>
              <CardOne Icon={ShoppingCartIcon} label1={"Abandoned Cart"} label2={"Customer"} value1={"0"} value2={"0"} />
            </Box>
          </Box>
        </Box>
        {/*All orders & data  */}
        <Box>
          <CardCustomerOrders />
        </Box>
      </Box>
    </DashboardLayout>
  );
}

export default Orders;
