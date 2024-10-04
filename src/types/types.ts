export interface Item {
    name: string
    done: boolean
    id: number
}

export type ItemFunction = (item: Item) => void