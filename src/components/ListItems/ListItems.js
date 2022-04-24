import Item from './Item/Item';

import './ListItems.css';

const ListItems = () => {
    const item = {
        checked: true,
        name: 'Buy groceries for next week',
        due: new Date(2020, 10, 20),
        expireSoon: true,
        created: new Date(2020, 9, 29),
    }
    return (
        <div className='listItem'>
            <Item {...item}/>
        </div>
    );
}

export default ListItems;