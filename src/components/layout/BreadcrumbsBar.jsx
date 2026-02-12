import {
  Breadcrumbs,
  Typography,
  Link,
  Box,
  IconButton,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

function BreadcrumbsBar() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const formatLabel = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <Box sx={{ px: { md: 3, xs: 1 } }}>
      <Breadcrumbs aria-label="breadcrumb">
        {/* Home icon */}
        <Link
          component={RouterLink}
          to="/"
          color="primary.main"
          underline="none"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <HomeIcon fontSize="small" />
        </Link>

        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <Typography color="primary.main" fontSize={13} key={to}>
              {formatLabel(value)}
            </Typography>
          ) : (
            <Link
              component={RouterLink}
              to={to}
              underline="hover"
              color="color.light"
              fontSize={13}
              key={to}
            >
              {formatLabel(value)}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}

export default BreadcrumbsBar;
