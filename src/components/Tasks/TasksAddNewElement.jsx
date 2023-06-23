import React from 'react';
import axios from 'axios';

import addSvg from '../../assets/img/add.svg';

const TasksAddNewElement = ({ list, onAddTaskElement }) => {
  const [isFormVisible, setIsFormVisible] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const toggleFormVisiable = () => {
    setIsFormVisible(!isFormVisible);
    setInputValue('');
  };

  const addNewTask = () => {
    const obj = {
      listId: list.id,
      text: inputValue,
      complete: false,
    };
    setIsLoading(true);
    axios
      .post('http://localhost:3001/tasks', obj)
      .then((data) => {
        onAddTaskElement(data.id, obj);
        toggleFormVisiable();
      })
      .catch((e) => {
        console.log(e);
        alert('Ошибка при добавлении задачи');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="tasks__form">
      {isFormVisible ? (
        <div className="tasks__form-block">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            className="add-list__popup-input field"
            placeholder="Название задачи"
          />
          <button disabled={isLoading} onClick={addNewTask} className="button">
            {isLoading ? 'Добавление...' : 'Добавить задачу'}
          </button>
          <button onClick={toggleFormVisiable} className="button button--grey">
            Отмена
          </button>
        </div>
      ) : (
        <div onClick={toggleFormVisiable} className="tasks__form-new-button">
          <img src={addSvg} alt="Иконка добавления задачи" />
          <span>Новая задача</span>
        </div>
      )}
    </div>
  );
};

export default TasksAddNewElement;
