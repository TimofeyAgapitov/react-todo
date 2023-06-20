import React from 'react';
import classNames from 'classnames';
import Badge from '../Badge/Badge';

import './Sidebar.scss';

const Sidebar = ({ items, onClick, isRemovable }) => {
  return (
    <ul className='list'>
      {
        items.map(obj => (
          <li onClick={onClick} key={obj.name} className={classNames(obj.className, {'active' : obj.active})}>
            <i>{obj.icon ? obj.icon : <Badge color={obj.color} />}</i>
            <span>{obj.name}</span>
          </li>
        ))
      }
    </ul>
  );
}

export default Sidebar;