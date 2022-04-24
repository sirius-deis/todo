import './Item.css';


const Item = ({checked, name, expireSoon, due, created}) => {
    
    return (
        <div className='item'>
            <label className='container'>
                <input type="checkbox" checked={checked}/>
                <span className='checkbox'></span>
            </label>
            <div className='title'>{name}</div>
            <div className='dueDate'>
                <i class="fa-solid fa-hourglass-end"></i>
                {due.getDate()}th {due.toLocaleString('en-US', {month: 'short'})} {due.getFullYear()}
            </div>
            <div className='leftPaned'>
                <div className='top'>
                    <i class="fa-solid fa-pencil"></i>
                    <i class="fa-solid fa-trash-can"></i>
                </div>
                <div className='created'>
                    <i class="fa-solid fa-circle-info"></i>
                    {created.getDate()} {created.toLocaleString('en-US', {month: 'short'})} {created.getFullYear()}
                </div>
            </div>
        </div>
    );
}

export default Item;