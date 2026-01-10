const Filter = ({ value, options, onChange }) => {
    return (
        <select
            value={value}
            onChange={onChange}
        >
            {options.map((o,i) => {
                return <option key={i}>{o}</option>
            })}
        </select>
    );
};

export default Filter;