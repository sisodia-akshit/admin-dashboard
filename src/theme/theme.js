import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Mulish, Arial, sans-serif",
  },
  palette: {
    mode: "light",

    background: {
      default: "#F4F5FA", // app background
      paper: "#fff", // cards, drawers, etc.
      light: "#ccc",
      superLight: "#eee",
    },
    color: {
      main: "#555",
      light: "#999",
      hover: "#fff",
    },
    text: {
      primary: "#000000",
    },

    primary: {
      main: "#5570F1",
      alpha: "#dde3ff",
      light: "#a1aef1",
    },

    secondary: {
      main: "#FFCC91",
      pending: "rgb(255, 238, 220)",
    },

    action: {
      hover: "#f5f5f5",
    },
  },
});

export default theme;
