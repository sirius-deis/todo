import './AddForm.css';

const AddForm = () => {
    return (
        <form className='addForm'>
            <input type="text" placeholder='Add new...' className='title'/>
            <label htmlFor='date' className='data_picker'>
                <input type="date" id='date' className='date'/>
                <i className="fa-solid fa-calendar-days toggle"></i>
            </label>
            <button type='submit' className='btn'>add</button>
        </form>
    );
}

export default AddForm;