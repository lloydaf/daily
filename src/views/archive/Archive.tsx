import React, { useEffect, useState } from 'react'
import { LocalStorageService } from '../../utils/LocalStorageService'
import { Item } from '../../types/types'
import { Link } from 'react-router-dom'

type DateStringRep = {
  date: string
  value: Item[]
}

export const Archive = () => {
  const [items, setItems] = useState<DateStringRep[]>()
  useEffect(() => {
    const storedItems = LocalStorageService.getAll()

    const parsedItems: DateStringRep[] = Object.entries<string>(
      storedItems,
    ).map(([key, value]: [string, string]) => {
      const date = new Date(Number(key))
      console.log('date', date.toDateString())
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
              <li key={item.name}>{item.name}</li>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
