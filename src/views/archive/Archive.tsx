import React, { useEffect, useState } from 'react'
import { LocalStorageService } from '../../utils/LocalStorageService'
import { Item } from '../../types/types'
import { Link } from 'react-router-dom'
import { ItemComponent } from '../../components/Item'
import { getDate } from '../../utils/Dates'
import './Archive.css'
type DateStringRep = {
  date: string
  value: Item[]
}


export const Archive = () => {
  const [items, setItems] = useState<DateStringRep[]>()
  useEffect(() => {
    const today = getDate(0)
    const storedItems = LocalStorageService.getAll()
    const parsedItems: DateStringRep[] = Object.entries<string>(storedItems)
      .filter(([key, _]) => new Date(Number(key)) < today)
      .map(([key, value]: [string, string]) => {
        const date = new Date(Number(key))
        return {
          date: date.toDateString(),
          value: JSON.parse(value) as Item[],
        }
      })
    setItems(parsedItems)
  }, [])
  return (
    <div>
      <Link to="/daily">Back</Link>
      <div>
        {items?.map((day) => (
          <div key={day.date}>
            <h2>{day.date}</h2>
            {day.value.map((item: Item) => (
              <ItemComponent key={item.id} item={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
