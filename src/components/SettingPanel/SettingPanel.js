import CustomSelect from './CustomSelect/CustomSelect';

import './SettingPanel.css';

const SettingPanel = () => {
    const filterOptions = ['All', 'Completed', 'Active', 'Has due date'];
    const sortOptions = ['Added date', 'Due date'];
    return (
        <div>
            <label htmlFor='filter'>Filter</label>
            <CustomSelect name="filter" list={filterOptions}/>
            <label htmlFor='sort'>Sort</label>
            <CustomSelect name="sort" list={sortOptions}/>
            <i className="fa-solid fa-arrow-down-short-wide"></i>
            {/* <i className="fa-solid fa-arrow-up-short-wide"></i> */}
        </div>
    );
}

export default SettingPanel;