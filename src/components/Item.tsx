import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { ItemFunction, Item, ToggleItemCheck } from "../types/types";
import './Item.css'

export const ItemComponent = ({ item, toggleItemCheck, deleteItem, moveToNextDay, dateOffset }: {
    item: Item,
    toggleItemCheck: ToggleItemCheck,
    deleteItem: ItemFunction,
    moveToNextDay: ItemFunction,
    dateOffset: number
}) =>
    <div className="item-container">
        <div className="item">
            <input title="Mark as done" type="checkbox" checked={item.done}
                   onChange={e => toggleItemCheck({checked: e.target.checked, item})}/>
            <span className={item.done ? "strikethrough" : ""} style={{margin: '0 0.5rem'}}>{item.name}</span>
        </div>
        <div className="action-container">
            <button className="action-button" disabled={item.done || dateOffset === 1}>
                <FontAwesomeIcon title="Move to next day" icon={faArrowRight} onClick={() => moveToNextDay(item)}/>
            </button>
            <button className="action-button">
                <FontAwesomeIcon title="Delete" icon={faTrash} onClick={() => deleteItem(item)}/>
            </button>
        </div>
    </div>