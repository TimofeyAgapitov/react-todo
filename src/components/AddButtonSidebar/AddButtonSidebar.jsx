import React from 'react';
import axios from 'axios';

import Badge from '../Badge/Badge';
import Sidebar from '../Sidebar/Sidebar';

import closeSvg from '../../assets/img/close.svg';

import './AddButtonSidebar.scss';

const AddButtonSidebar = ({ colors, onAddListElement }) => {
  const [visiablePopup, setVisiablePopup] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState(3);
  const [inputValue, setInputValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setVisiablePopup(false);
    setInputValue('');
    setSelectedColor(colors[0].id);
  };

  const onClickAddElementList = () => {
    if (!inputValue) {
      alert('Введите название задачи');
      return;
    }
    setIsLoading(true);
    axios
      .post('http://localhost:3001/lists', {
        name: inputValue,
        colorId: selectedColor,
      })
      .then((data) => {
        const color = colors.filter((color) => color.id === selectedColor)[0];
        const listObj = { ...data, color, task: [] };
        onAddListElement(listObj);
        onClose();
      })
      .catch((e) => {
        console.log(e);
        alert('Ошибка при добавлении списка!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="add-list">
      <Sidebar
        items={[
          {
            className: 'list__add-button',
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                ill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="list__icon-add"
              >
                <path
                  d="M8 1V15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: 'Добавить список',
          },
        ]}
        onClickList={() => setVisiablePopup(true)}
      />
      {visiablePopup && (
        <div className="add-list__popup">
          <img
            onClick={onClose}
            src={closeSvg}
            alt="close button"
            className="add-list__popup-close-btn"
          />
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            className="add-list__popup-input field"
            placeholder="Название списка"
          />
          <div className="add-list__popup-colors">
            {colors.map((color) => (
              <Badge
                onClick={() => setSelectedColor(color.id)}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && 'active'}
              />
            ))}
          </div>
          <button
            onClick={onClickAddElementList}
            className="add-list__popup-button button"
          >
            {isLoading ? 'Добавление...' : 'Добавить'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddButtonSidebar;
