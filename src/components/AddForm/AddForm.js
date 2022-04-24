import './AddForm.css';

const AddForm = () => {
    return (
        <form className='addForm'>
            <input type="text" placeholder='Add new...'/>
            <label htmlFor='date'>
                <input type="date" id='date' className='date'/>
                <i className="fa-solid fa-calendar-days"></i>
            </label>
            <button type='submit' className='btn'>add</button>
        </form>
    );
}

export default AddForm;