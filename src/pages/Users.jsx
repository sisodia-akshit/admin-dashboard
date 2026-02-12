import { Box, Typography } from "@mui/material";
import DashboardLayout from "../components/layout/DashboardLayout";
import CardTwo from "../components/common/CardTwo";

import CardUsers from "../components/common/CardUsers";

import PeopleIcon from "@mui/icons-material/People";
import OrderIcon from "@mui/icons-material/Inventory";
import { useAuth } from "../context/AuthContext";


function Users() {
  const { user } = useAuth();

  if (user.role !== "admin") {
    return (
      <DashboardLayout>
        <Typography>You are not authorized to view users.</Typography>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        gap: { md: 2, xs: 1 }
      }}>
        <Typography>
          Customers Summary
        </Typography>
        <Box sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px, 1fr))",
          gap: { md: 2, xs: 1 }
        }}>
          <CardTwo Icon={PeopleIcon} label1={"All Customers"} label2={"Active"} label3={"In-Active"} value1={0} value2={0} value3={0} />
          <CardTwo Icon={OrderIcon} label1={"New Customers"} label2={"Purchasing"} label3={"Abandoned Carts"} value1={0} value2={0} value3={0} />
        </Box>

        {/* card Users  */}
        <CardUsers />
      </Box>
    </DashboardLayout>
  );
}

export default Users;
