import React from 'react';
import axios from 'axios';

import TasksAddNewElement from './TasksAddNewElement';
import Task from './Task';

import editSvg from '../../assets/img/edit.svg';

import './Tasks.scss';

const Tasks = ({
  list,
  onAddTaskElement,
  onEditTitle,
  onRemoveTaskElement,
  onEditTaskElement,
  withoutEmpty,
}) => {
  const editTitle = () => {
    const newTitle = window.prompt('Название списка:', list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch(`http://localhost:3001/lists/` + list.id, { name: newTitle })
        .catch(() => {
          alert('Не удалось изменить название списка');
        });
    }
  };

  return (
    <div className="tasks">
      <h2 style={{ color: list.color.hex }} className="tasks__title">
        {list.name}
        <img onClick={editTitle} src={editSvg} alt="Иконка редактирования" />
      </h2>

      <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && (
          <h2>Задачи отсутствуют</h2>
        )}
        {list.tasks &&
          list.tasks.map((task) => (
            <Task
              key={task.id}
              list={list}
              task={task}
              onRemove={onRemoveTaskElement}
              onEdit={onEditTaskElement}
            />
          ))}
      </div>

      <TasksAddNewElement
        key={list.id}
        list={list}
        onAddTaskElement={onAddTaskElement}
      />
    </div>
  );
};

export default Tasks;
