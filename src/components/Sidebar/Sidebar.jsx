import React from 'react';
import classNames from 'classnames';
import axios from 'axios';

import Badge from '../Badge/Badge';

import removeSvg from '../../assets/img/remove.svg';
import './Sidebar.scss';

const Sidebar = ({
  items,
  onClickList,
  isRemovable,
  onRemove,
  onClickItem,
  activeItem,
}) => {
  const removeElement = (obj) => {
    if (window.confirm('Действительно удалить?')) {
      axios.delete('http://localhost:3001/lists/' + obj.id).then(() => {
        onRemove(obj.id);
      });
    }
  };

  return (
    <ul onClick={onClickList} className="list">
      {items.map((obj) => (
        <li
          onClick={onClickItem ? () => onClickItem(obj) : null}
          key={obj.name}
          className={classNames(obj.className, {
            active: activeItem && activeItem.id === obj.id,
          })}
        >
          <i>{obj.icon ? obj.icon : <Badge color={obj.color.name} />}</i>
          <span>
            {obj.name} {obj.tasks && `(${obj.tasks.length})`}
          </span>
          {isRemovable && (
            <img
              className="list__remove-icon"
              src={removeSvg}
              alt="Иконка удаления"
              onClick={() => removeElement(obj)}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
