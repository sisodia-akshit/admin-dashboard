const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{ marginBottom: "10px", padding: "8px" }}
    />
  );
};

export default SearchInput;
