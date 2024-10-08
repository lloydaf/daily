import { useEffect, useState } from "react"
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ItemComponent } from "../components/Item";
import { ItemFunction, Item, createItem } from "../types/types";
import { LocalStorageService } from "../utils/LocalStorageService";
import './Home.css'


export const Home = () => {
    const [dateOffset, setDateOffset] = useState(0)
    const [dateStr, setDateStr] = useState<number>()
    const [dailyItems, setDailyItems] = useState<Item[]>([])

    useEffect(() => {
        try {
            const date = new Date();
            date.setHours(0, 0, 0, 0);
            date.setDate(date.getDate() + dateOffset);
            const dateStr = date.valueOf()
            setDateStr(dateStr)

            const item = JSON.parse(LocalStorageService.getItem(dateStr)!)
            const length = item.length
            if (length) {
                setDailyItems(JSON.parse(LocalStorageService.getItem(dateStr)!))
            }
        } catch (e: unknown) {
            setDailyItems([])
        }
    }, [dateOffset]);

    useEffect(() => {
        dailyItems.length && LocalStorageService.setItem(dateStr, JSON.stringify(dailyItems.filter(item => item.name !== "")))
    }, [dailyItems])

    const addItem = () => {
        const newItem = createItem()
        setDailyItems([...dailyItems, newItem])
    }

    const onEdit: ItemFunction = item => {
        setDailyItems(dailyItems => dailyItems.map(dailyItem => dailyItem.id === item.id ? item : dailyItem))
    }

    const toggleItemCheck: ItemFunction = (item) => {
        setDailyItems(dailyItems => dailyItems.map(dailyItem => dailyItem.id !== item.id ? dailyItem : {...item, done: !item.done}))
    }

    const deleteItem: ItemFunction = item => {
        if(prompt(`Are you sure you want to delete "${item.name}"? Yes / No`, "No") === "Yes"){
            const items = dailyItems.filter(dailyItem => dailyItem.id !== item.id)
            if(items.length) {
                LocalStorageService.setItem(dateStr, JSON.stringify(items))
            }
            else {
                LocalStorageService.removeItem(dateStr)
            }
            setDailyItems(items)
        }
    }


    const moveToNextDay: ItemFunction = item => {
        if(prompt(`Are you sure you want to move "${item.name}" to the next day? Yes / No`, "No") === "Yes") {
            const date = new Date();
            date.setHours(0, 0, 0, 0);
            date.setDate(date.getDate() + dateOffset + 1);
            const nextDateStr = date.valueOf();
            try {
                const nextDayItems = JSON.parse(LocalStorageService.getItem(nextDateStr)!)
                LocalStorageService.setItem(nextDateStr, JSON.stringify([...nextDayItems, item]))
            } catch (e: unknown) {
                LocalStorageService.setItem(nextDateStr, JSON.stringify([item]))
            }

            const items = dailyItems.filter(dailyItem => dailyItem.id !== item.id)
            if (items.length) {
                LocalStorageService.setItem(dateStr, JSON.stringify(items))
            } else {
                LocalStorageService.removeItem(dateStr)
            }
            setDailyItems(items)
        }
    }

    return (
        <div className="flex row">
            <div className="flex column outline">
                {dateStr && <h2>{new Date(dateStr).toDateString()}</h2>}
                <div style={{width: '100%', margin: '0.5rem 1rem'}} className="flex row">
                    <div className="link flex row" onClick={() => setDateOffset(-1)}>
                        <FontAwesomeIcon style={{margin: '0 0.5rem'}}  icon={faBackward} />
                        <h3 className={dateOffset === -1 ? 'active' : 'passive'}>Yesterday's tasks</h3>
                    </div>
                    <h1 className={`link ${dateOffset === 0 ? 'active' : 'passive'}`} onClick={() => setDateOffset(0)}>Today's tasks</h1>
                    <div className="link flex row" onClick={() => setDateOffset(1)}>
                        <h3 className={dateOffset === 1 ? 'active' : 'passive'}>Tomorrow's tasks</h3>
                        <FontAwesomeIcon style={{margin: '0 0.5rem'}}  icon={faForward}/>
                    </div>
                </div>
                <button className="button" onClick={() => addItem()} disabled={dateOffset === -1}>Add Task</button>
                {dailyItems.map((item, index) => (
                    <ItemComponent
                        key={index}
                        item={item}
                        toggleItemCheck={toggleItemCheck}
                        deleteItem={deleteItem}
                        moveToNextDay={moveToNextDay}
                        dateOffset={dateOffset}
                        onEdit={onEdit}
                    />
                ))}
                {dailyItems.length === 0 && <h4>No tasks for the day</h4>}
            </div>
        </div>
    )
}