import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
} from "@mui/material";
import { useState } from "react";
import SortIcon from "@mui/icons-material/FilterList";


function DataTable({ columns, data, sortConfig, onSort, renderRow }) {
    const [direction, setDirection] = useState("asc")

    const handleSort = (key) => {
        if (!key) return;

        setDirection(direction === "asc" ? "desc" : "asc")

        onSort({ key, direction });
    };

    const sortedData = [...data];

    if (sortConfig) {
        sortedData.sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];

            if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }

    return (
        <TableContainer
            component={Paper}
            sx={{
                boxShadow: 0,
                overflowX: "auto",
                "&::-webkit-scrollbar": {
                    display: "none",
                },
                scrollbarWidth: "none", // Firefox
            }}
        >
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {columns.map((col) => (
                            <TableCell
                                key={col.key}
                                onClick={() => handleSort(col.key)}
                                sx={{
                                    cursor: "pointer",
                                    fontWeight: 500,
                                    whiteSpace: "nowrap",
                                    py: 1.5,
                                    borderTop: "1px solid #ddd",
                                    borderBottom: "1px solid #ddd",
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    {col.label}
                                    {sortConfig?.key === col.key &&
                                        <SortIcon
                                            sx={{
                                                transition: "transform 0.2s ease",
                                                transform: sortConfig.direction === "asc" ? "rotate(180deg)" : "rotate(0deg)",
                                                fontSize: "medium"
                                            }}
                                        />
                                    }
                                    {(!sortConfig?.key && sortConfig?.key !== col.key) &&<SortIcon
                                        sx={{
                                            transition: "transform 0.2s ease",
                                            fontSize: "medium"
                                        }}
                                    />}
                                </Box>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody sx={{
                }}>
                    {sortedData.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                align="center"
                                sx={{
                                    py: 3,
                                }}
                            >
                                No data found
                            </TableCell>
                        </TableRow>
                    ) : (
                        sortedData.map(renderRow)
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default DataTable;
