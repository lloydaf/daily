import { useEffect, useState } from "react"
import { ItemComponent } from "../components/Item";
import { DeleteItem, Item, ToggleItemCheck } from "../types/types";
import './Home.css'

export const Home = () => {
    const [dateOffset, setDateOffset] = useState(0)
    const [dateStr, setDateStr] = useState("")
    const [dailyItems, setDailyItems] = useState<Item[]>([])

    useEffect(() => {
        try {
            const date = new Date();
            date.setHours(0, 0, 0, 0);
            date.setDate(date.getDate() + dateOffset);
            const dateStr = date.toDateString();

            setDateStr(dateStr)

            const item = JSON.parse(localStorage.getItem(dateStr)!)
            const length = item.length
            if (length) {
                setDailyItems(JSON.parse(localStorage.getItem(dateStr)!))
            }
        } catch (e: unknown) {
            setDailyItems([])
        }
    }, [dateOffset]);

    useEffect(() => {
        dailyItems.length && localStorage.setItem(dateStr, JSON.stringify(dailyItems))
    }, [dailyItems, dateStr])

    const addItem = () => {
        const newItem = prompt("Enter item to add", "")
        newItem && setDailyItems([...dailyItems, {name: newItem, done: false}])
    }

    const toggleItemCheck: ToggleItemCheck = ({checked, item}) => {
        setDailyItems([
            ...dailyItems.filter(dailyItem => dailyItem.name !== item.name && !item.done),
            {name: item.name, done: checked},
            ...dailyItems.filter(dailyItem => dailyItem.name !== item.name && item.done)])
    }

    const deleteItem: DeleteItem = item => {
        if(prompt(`Are you sure you want to delete "${item.name}"? Yes / No`, "No") === "Yes"){
            const items = dailyItems.filter(dailyItem => dailyItem.name !== item.name)
            localStorage.setItem(dateStr, JSON.stringify(items))
            setDailyItems(items)
        }
    }

    return (
        <div className="flex row">
            <div
                 className="flex column outline">
                <h1>{dateStr}</h1>
                <div style={{width: '100%', margin: '0.5rem 1rem'}} className="flex row">
                    <h2 className="link" onClick={() => setDateOffset(-1)}>Yesterday's tasks</h2>
                    <h1 className="link" onClick={() => setDateOffset(0)}>Today's tasks</h1>
                    <h2 className="link" onClick={() => setDateOffset(1)}>Tomorrow's tasks</h2>
                </div>
                <button className="button" onClick={addItem} disabled={dateOffset === -1}>Add Task</button>
                {dailyItems.map((item, index) => (
                    <ItemComponent key={index} item={item} toggleItemCheck={toggleItemCheck} deleteItem={deleteItem}/>
                ))}
                {dailyItems.length === 0 && <h3>No tasks for the day</h3>}
            </div>
        </div>
    )
}