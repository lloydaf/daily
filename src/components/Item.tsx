import {Item, ToggleItemCheck} from "../types/types";

export const ItemComponent = ({item, toggleItemCheck} : {item: Item, toggleItemCheck: ToggleItemCheck}) => <>
    <div>
        <input type="checkbox" checked={item.done} onChange={e => toggleItemCheck({checked: e.target.checked, item})}/> {item.name}
    </div>
</>