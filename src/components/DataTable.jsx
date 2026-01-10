import { useState } from "react";

const DataTable = ({ columns, data, renderRow, onSort, sortConfig }) => {
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
    <div style={{ overflowX: "auto" }}>
      <table width="100%" border="1" cellPadding="8">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                style={{ cursor: "pointer" }}
              >
                {col.label}
                {sortConfig?.key === col.key &&
                  (sortConfig.direction === "asc" ? " ▲" : " ▼")}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} align="center">
                No data found
              </td>
            </tr>
          ) : (
            sortedData.map(renderRow)
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
