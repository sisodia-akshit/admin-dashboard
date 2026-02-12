import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <TextField
      size="small"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      sx={{
        "& .MuiInputBase-root": {
          height: 32,          // default ~40
          fontSize: "0.85rem",
        },
        "& .MuiInputBase-input": {
          padding: "6px 8px",  // default bigger
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
    />

  );
};

export default SearchInput;