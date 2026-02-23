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
    <div style={{ minHeight: '100vh', padding: '1em' }}>
      <div
        style={{
          minWidth: '20em',
          maxWidth: '56em',
          width: '90%',
          background: 'white',
          borderRadius: '1em',
          margin: '2em auto',
          padding: '2em',
          boxShadow: '0 1.25em 3.75em rgba(0, 0, 0, 0.3)',
        }}
      >
        <Link
          to="/daily"
          style={{
            display: 'inline-block',
            color: '#667eea',
            textDecoration: 'none',
            fontWeight: 600,
            padding: '0.5em 1em',
            borderRadius: '0.5em',
            transition: 'all 0.2s ease',
          }}
        >
          Back
        </Link>
        {items?.map((day) => (
          <div key={day.date} style={{ marginTop: '2em' }}>
            <h2
              style={{
                margin: '0 0 1em 0',
                fontSize: '1.25em',
                fontWeight: 600,
                color: '#4a5568',
              }}
            >
              {day.date}
            </h2>
            {day.value.map((item: Item) => (
              <ItemComponent key={item.id} item={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
