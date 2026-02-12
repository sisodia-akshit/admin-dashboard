import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";

const Filter = ({ value, options, onChange }) => {
    return (
        <FormControl size="small" sx={{minWidth:'250px'}}>
            <Select value={value} onChange={onChange} sx={{ textTransform: "capitalize" }}>
                {options.map((o) => (
                    <MenuItem
                        key={o}
                        value={o}
                        sx={{ textTransform: "capitalize" }}
                    >
                        {o}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default Filter;
