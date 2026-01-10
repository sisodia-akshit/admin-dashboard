const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div style={{ marginTop: "10px" }}>
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          style={{
            marginRight: "5px",
            fontWeight: page === i + 1 ? "bold" : "normal",
            backgroundColor :  page === i + 1 ?"blue":"#bbb"
          }}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
