import React from "react";
import Badge from "../Badge/Badge";
import Sidebar from "../Sidebar/Sidebar";

import './AddButtonSidebar.scss';

const AddButtonSidebar = ({ colors }) => {
    const [visiablePopup, setVisiablePopup] = React.useState(false);
    const [selectedColor, setSelectedColor] = React.useState(colors[0].id);

    return (
        <div className="add-list">
            <Sidebar items={[
                {
                    className: 'list__add-button',
                    icon: (
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 16 16"
                            ill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="list__icon-add">
                            <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ),
                    name: 'Добавить список'
                }
            ]}
                onClick={() => setVisiablePopup(true)}
            />
            {
                visiablePopup && (
                    <div className="add-list__popup">
                        <input type="text" className="add-list__popup-input field" placeholder="Название списка" />
                        <div className="add-list__popup-colors">
                            {
                                colors.map((color) => (
                                    <Badge 
                                    onClick={() => setSelectedColor(color.id)} 
                                    key={color.id} 
                                    color={color.name} 
                                    className = {selectedColor === color.id && 'active'}
                                    />
                                ))
                            }
                        </div>
                        <button className="add-list__popup-button button">Добавить</button>
                    </div>
                )
            }
        </div>
    );
}

export default AddButtonSidebar;