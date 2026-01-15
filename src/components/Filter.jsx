const Filter = ({ value, options, onChange }) => {
    return (
        <select
            value={value}
            onChange={onChange}
        >
            {options.map((o,i) => {
                return <option key={i} style={{textTransform:"capitalize"}}>{o}</option>
            })}
        </select>
    );
};

export default Filter;