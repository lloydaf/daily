import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCheck,
  faEdit,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { Item, ItemFunction } from "../types/types";
import "./Item.css";

export const ItemComponent = ({
  item,
  toggleItemCheck,
  deleteItem,
  moveToNextDay,
  dateOffset,
  onEdit,
}: {
  item: Item;
  toggleItemCheck: ItemFunction;
  deleteItem: ItemFunction;
  moveToNextDay: ItemFunction;
  onEdit: ItemFunction;
  dateOffset: number;
}) => {
  const [hover, setHover] = useState(false);
  const [edit, setEdit] = useState(false);
  const [temp, setTemp] = useState<string>(item.name);

  const saveEdit = () => {
    onEdit({ ...item, name: temp });
    setEdit(false);
  };

  const clear = () => {
    if (temp === item.name) {
      setEdit(false);
    } else {
      setTemp(item.name);
    }
  };

  useEffect(() => {
    if (temp === "") {
      setEdit(true);
    }
  }, [temp]);

  return (
    <div
      className="item-container"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="item-content"
        onClick={() => hover && !edit && toggleItemCheck(item)}
      >
        <input
          title="Mark as done"
          type="checkbox"
          checked={item.done}
          onChange={() => toggleItemCheck(item)}
          disabled={edit}
          className="done-checkbox"
        />
        {edit ? (
          <>
            <input
              autoFocus
              type="text"
              maxLength={48}
              className="text-input"
              value={temp}
              onChange={(e) => setTemp(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveEdit()}
            />
          </>
        ) : (
          <span className={item.done ? "strikethrough" : ""}>{item.name}</span>
        )}
      </div>
      <div className={`action-container ${hover ? "visible" : ""}`}>
        {edit ? (
          <>
            <button
              className="action-button"
              disabled={item.done || temp === ""}
              onClick={() => saveEdit()}
            >
              <FontAwesomeIcon title="Save" icon={faCheck} />
            </button>
            <button
              className="action-button"
              disabled={item.done || temp === ""}
              onClick={() => clear()}
            >
              <FontAwesomeIcon title="Cancel" icon={faX} />
            </button>
          </>
        ) : (
          <>
            <button
              className="action-button"
              disabled={item.done}
              onClick={() => setEdit(true)}
            >
              <FontAwesomeIcon title="Edit" icon={faEdit} />
            </button>
            <button
              className="action-button"
              disabled={item.done || dateOffset === 1}
              onClick={() => moveToNextDay(item)}
            >
              <FontAwesomeIcon title="Move to next day" icon={faArrowRight} />
            </button>
            <button className="action-button" onClick={() => deleteItem(item)}>
              <FontAwesomeIcon title="Delete" icon={faTrash} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
