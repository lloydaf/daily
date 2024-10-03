import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { DeleteItem, Item, ToggleItemCheck } from "../types/types";
import './Item.css'

export const ItemComponent = ({item, toggleItemCheck, deleteItem}: {
    item: Item,
    toggleItemCheck: ToggleItemCheck,
    deleteItem: DeleteItem
}) =>
    <div style={{
        margin: '0.5rem 1rem',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }}>
        <div style={{margin: '0 1rem'}}>
            <input type="checkbox" checked={item.done}
                   onChange={e => toggleItemCheck({checked: e.target.checked, item})}/>
            <span className={item.done ? "strikethrough" : ""} style={{margin: '0 0.5rem'}}>{item.name}</span>
        </div>
        <div style={{margin: '0 1rem'}}>
            <FontAwesomeIcon icon={faTrash} onClick={() => deleteItem(item)}/>
        </div>
    </div>