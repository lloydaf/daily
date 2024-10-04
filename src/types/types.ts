export interface Item {
    name: string
    done: boolean
    id: number
}

export type ToggleItemCheck = (args: { checked: boolean, item: Item }) => void

export type ItemFunction = (item: Item) => void