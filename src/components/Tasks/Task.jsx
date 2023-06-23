import React from 'react';

import removeSvg from '../../assets/img/remove.svg';
import editSvg from '../../assets/img/edit.svg';
import checkSvg from '../../assets/img/check.svg';

const Task = ({ list, task, onRemove, onEdit }) => {
  const taskObj = {
    id: task.id,
    text: task.text,
  };

  return (
    <div key={task.id} className="tasks__items-row">
      <div className="checkbox">
        <input id={`task-${task.id}`} type="checkbox" />
        <label htmlFor={`task-${task.id}`}>
          <img src={checkSvg} alt="" />
        </label>
      </div>
      <p>{task.text}</p>
      <div className="tasks__items-row-actions">
        <div onClick={() => onEdit(list.id, taskObj)}>
          <img src={editSvg} alt="" />
        </div>
        <div onClick={() => onRemove(list.id, task.id)}>
          <img src={removeSvg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Task;
