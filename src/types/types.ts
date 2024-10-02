export interface Item {
    name: string
    done: boolean
}

export type ToggleItemCheck = (args: {checked: boolean, item: Item}) => void