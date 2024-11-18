export interface Item {
  name: string
  done: boolean
  id: number
}

export const createItem = (): Item => ({
  name: '',
  done: false,
  id: Date.now(),
})

export type ItemFunction = (item: Item) => void
