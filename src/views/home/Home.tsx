import React from 'react'
import { useEffect, useState } from 'react'
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ItemComponent } from '../../components/Item'
import { ItemFunction, Item, createItem } from '../../types/types'
import { LocalStorageService } from '../../utils/LocalStorageService'
import './Home.css'
import { Link } from 'react-router-dom'
import { getDate } from '../../utils/Dates'

export const Home = () => {
  const [dateOffset, setDateOffset] = useState(0)
  const [dateStr, setDateStr] = useState<number>()
  const [dailyItems, setDailyItems] = useState<Item[]>([])

  useEffect(() => {
    try {
      const date = getDate(dateOffset)
      const dateStr = date.valueOf()
      setDateStr(dateStr)

      const item = JSON.parse(LocalStorageService.getItem(`${dateStr}`)!)
      const length = item.length
      if (length) {
        setDailyItems(JSON.parse(LocalStorageService.getItem(`${dateStr}`)!))
      }
    } catch (e: unknown) {
      console.error('An error occurred', e)
      setDailyItems([])
    }
  }, [dateOffset])

  useEffect(() => {
    if (dailyItems.length) {
      LocalStorageService.setItem(
        `${dateStr}`,
        JSON.stringify(dailyItems.filter((item) => item.name !== '')),
      )
    }
  }, [dailyItems])

  const addItem = () => {
    const newItem = createItem()
    setDailyItems([...dailyItems, newItem])
  }

  const onEdit: ItemFunction = (item) => {
    setDailyItems((dailyItems) =>
      dailyItems.map((dailyItem) =>
        dailyItem.id === item.id ? item : dailyItem,
      ),
    )
  }

  const toggleItemCheck: ItemFunction = (item) => {
    setDailyItems((dailyItems) =>
      dailyItems.map((dailyItem) =>
        dailyItem.id !== item.id
          ? dailyItem
          : {
              ...item,
              done: !item.done,
            },
      ),
    )
  }

  const deleteItem: ItemFunction = (item) => {
    if (
      prompt(
        `Are you sure you want to delete "${item.name}"? Yes / No`,
        'No',
      ) === 'Yes'
    ) {
      const items = dailyItems.filter((dailyItem) => dailyItem.id !== item.id)
      if (items.length) {
        LocalStorageService.setItem(`${dateStr}`, JSON.stringify(items))
      } else {
        LocalStorageService.removeItem(`${dateStr}`)
      }
      setDailyItems(items)
    }
  }

  const moveToNextDay: ItemFunction = (item) => {
    if (
      prompt(
        `Are you sure you want to move "${item.name}" to the next day? Yes / No`,
        'No',
      ) === 'Yes'
    ) {
      const date = getDate(dateOffset + 1)
      const nextDateStr = date.valueOf()
      try {
        const nextDayItems = JSON.parse(
          LocalStorageService.getItem(`${nextDateStr}`)!,
        )
        LocalStorageService.setItem(
          `${nextDateStr}`,
          JSON.stringify([...nextDayItems, item]),
        )
      } catch (e: unknown) {
        console.error('An unknown error occurred', e)
        LocalStorageService.setItem(`${nextDateStr}`, JSON.stringify([item]))
      }

      const items = dailyItems.filter((dailyItem) => dailyItem.id !== item.id)
      if (items.length) {
        LocalStorageService.setItem(`${dateStr}`, JSON.stringify(items))
      } else {
        LocalStorageService.removeItem(`${dateStr}`)
      }
      setDailyItems(items)
    }
  }

  return (
    <div className="flex column" style={{ minHeight: '100vh', padding: '1em' }}>
      <div className="flex column outline">
        <Link to="/daily/archive" style={{ alignSelf: 'flex-end' }}>
          Archive
        </Link>
        {dateStr && <h2>{new Date(dateStr).toDateString()}</h2>}
        <div className="flex row" style={{ width: '100%' }}>
          <div className="link flex row" onClick={() => setDateOffset(-1)}>
            <FontAwesomeIcon icon={faBackward} />
            <h3 className={dateOffset === -1 ? 'active' : 'passive'}>
              Yesterday
            </h3>
          </div>
          <h1
            className={`link ${dateOffset === 0 ? 'active' : 'passive'}`}
            onClick={() => setDateOffset(0)}
          >
            Today
          </h1>
          <div className="link flex row" onClick={() => setDateOffset(1)}>
            <h3 className={dateOffset === 1 ? 'active' : 'passive'}>
              Tomorrow
            </h3>
            <FontAwesomeIcon icon={faForward} />
          </div>
        </div>
        <button
          className="button"
          onClick={() => addItem()}
          disabled={dateOffset === -1}
        >
          Add Task
        </button>
        <div
          style={{
            width: '100%',
            alignSelf: 'stretch',
            marginTop: '1em',
            paddingLeft: '2em',
            paddingRight: '2em',
          }}
        >
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
    </div>
  )
}
