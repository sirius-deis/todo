import './CustomSelect.css';

const CustomSelect = ({name, list}) => {
    return (
        <div className='custom-select'>
            <select name={name} id={name}>
                {list.map(item => {
                    return <option value={item} key={item}>{item}</option>;
                })}
            </select>
        </div>
    );
}

export default CustomSelect;