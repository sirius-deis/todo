import './AddForm.css';

const AddForm = () => {
    return (
        <form className='addForm'>
            <input type="text" placeholder='Add new...'/>
            <label htmlFor='date'>
                <input type="date"/>
                <i class="fa-solid fa-calendar-days"></i>
            </label>
            <button type='submit' className='btn'>add</button>
        </form>
    );
}

export default AddForm;