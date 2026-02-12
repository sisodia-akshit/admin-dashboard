import { Pagination, Stack } from "@mui/material";

const PaginationControl = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <Stack alignItems="center" sx={{ mt: 2 }}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, value) => onPageChange(value)}
        color="primary"
        shape="rounded"
      />
    </Stack>
  );
};

export default PaginationControl;
