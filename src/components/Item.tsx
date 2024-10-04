import {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { ItemFunction, Item } from "../types/types";
import './Item.css'

export const ItemComponent = ({ item, toggleItemCheck, deleteItem, moveToNextDay, dateOffset }: {
    item: Item,
    toggleItemCheck: ItemFunction,
    deleteItem: ItemFunction,
    moveToNextDay: ItemFunction,
    dateOffset: number
}) => {
    const [hover, setHover] = useState(false)

    return <div className="item-container" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <div className="item-content" onClick={() => toggleItemCheck(item)}>
            <input title="Mark as done" type="checkbox" checked={item.done}
                   onChange={() => toggleItemCheck(item)}/>
            <span className={item.done ? "strikethrough" : ""} style={{margin: '0 0.5rem'}}>{item.name}</span>
        </div>
        <div className="action-container">
            {hover && (<button className="action-button" disabled={item.done || dateOffset === 1}>
                <FontAwesomeIcon title="Move to next day" icon={faArrowRight} onClick={() => moveToNextDay(item)}/>
            </button>)}
            {hover && (<button className="action-button">
                <FontAwesomeIcon title="Delete" icon={faTrash} onClick={() => deleteItem(item)}/>
            </button>)}
        </div>
    </div>
}