import {useEffect, useState} from "react"
import './Home.css'
import {ItemComponent} from "../components/Item";
import {Item, ToggleItemCheck} from "../types/types";

export const Home = () => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)

    const dateStr = date.toDateString()
    const [dailyItems, setDailyItems] = useState<Item[]>(localStorage.getItem(dateStr) ? JSON.parse(localStorage.getItem(dateStr)!!) : [])

    useEffect(() => {
        localStorage.setItem(dateStr, JSON.stringify(dailyItems))
    }, [dailyItems])

    const addItem = () => {
        const newItem = prompt("Enter item to add", "")
        newItem && setDailyItems([...dailyItems, { name: newItem, done: false }])
    }

    const toggleItemCheck: ToggleItemCheck = ({checked, item}) => {
        console.log('toggle', checked, item)
        setDailyItems([
            ...dailyItems.filter(dailyItem => dailyItem.name !== item.name && !item.done),
            {name: item.name, done: checked},
            ...dailyItems.filter(dailyItem => dailyItem.name !== item.name && item.done)])
    }

    return (
        <div>
            <h1 className="home-heading heading">Home</h1>
            <button onClick={addItem}>Add Item</button>
            {dailyItems.map((item, index) => (
                <ItemComponent key={index} item={item} toggleItemCheck={toggleItemCheck}/>
            ))}
        </div>
    )
}