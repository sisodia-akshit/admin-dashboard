import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { alpha } from "@mui/material/styles";

function SidebarItem({ to, icon, label, collapsed, onClick, danger }) {
  const renderButton = (isActive = false) => (
    <ListItemButton
      onClick={onClick}
      sx={{
        mx: collapsed ? 1 : 2,
        mb: 1,
        p: collapsed ? 2 : 2,
        borderRadius: 2,
        justifyContent: collapsed ? "center" : "flex-start",

        backgroundColor: isActive
          ? (theme) => alpha(theme.palette.primary.main, 0.9)
          : "transparent",

        color: isActive
          ? "#fff"
          : danger
          ? "error.main"
          : "text.primary",

        "&:hover": {
          backgroundColor: isActive
            ? (theme) => alpha(theme.palette.primary.main, 1)
            : "action.hover",
        },
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: collapsed ? "auto" : 40,
          justifyContent: "center",
          color: "inherit",
        }}
      >
        {icon}
      </ListItemIcon>

      {!collapsed && <ListItemText primary={label} />}
    </ListItemButton>
  );

  const buttonWithLink = (
    <NavLink
      to={to}
      end
      style={{ textDecoration: "none", color: "inherit" }}
    >
      {({ isActive }) => renderButton(isActive)}
    </NavLink>
  );

  // Collapsed sidebar → tooltip
  if (collapsed) {
    return (
      <Tooltip title={label} placement="right">
        {to ? buttonWithLink : renderButton(false)}
      </Tooltip>
    );
  }

  // Normal sidebar
  return to ? buttonWithLink : renderButton(false);
}

export default SidebarItem;
