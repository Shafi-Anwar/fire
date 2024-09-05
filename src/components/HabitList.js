"use client "
import React, { useState } from "react";

import { FaBook, FaDumbbell, FaMedkit, FaTint, FaTrash,FaPen } from "react-icons/fa";

const defaultIcons = [
  { id: "dumbbell", icon: <FaDumbbell />, label: "Exercise" },
  { id: "book", icon: <FaBook />, label: "Read" },
  { id: "tint", icon: <FaTint />, label: "Water" },
  { id: "medkit", icon: <FaMedkit />, label: "Meditate" },
];

const HabitList = ({ habits, onAdd, onEdit, onRemove }) => {
  const [newHabit, setNewHabit] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("dumbbell");
  const [customIcons, setCustomIcons] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editIcon, setEditIcon] = useState("");

  const handleAddCustomIcon = (icon) => {
    setCustomIcons([...customIcons, icon]);
  };

  const handleAdd = () => {
    if (newHabit.trim()) {
      onAdd({ text: newHabit, icon: selectedIcon });
      setNewHabit("");
      setSelectedIcon("dumbbell");
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditValue(habits[index].text);
    setEditIcon(habits[index].icon);
  };

  const handleSaveEdit = (index) => {
    if (editValue.trim()) {
      onEdit(index, { text: editValue, icon: editIcon });
      setEditingIndex(null);
      setEditValue("");
      setEditIcon("");
    }
  };

  // Combine default icons and custom icons
  const combinedIcons = [...customIcons, ...defaultIcons];

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2">My Habits</h2>
     
      <ul className="list-disc pl-5 mb-4 space-y-2">
        {habits.map((habit, index) => (
          <li
            key={index}
            className={`flex items-center p-3 border rounded cursor-pointer transition-colors duration-300 ${
              editingIndex === index
                ? "bg-green-100 text-green-800"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <span
              className={`mr-3 text-2xl`}
              style={{
                color: habit.icon.startsWith("#") ? habit.icon : "inherit",
              }}
            >
              {combinedIcons.find((icon) => icon.id === habit.icon)?.icon || (
                <img src={habit.icon} alt="icon" className="text-xl" />
              )}
            </span>
            {index === editingIndex ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="flex-grow p-2 border border-gray-300 rounded"
                />
                <select
                  value={editIcon}
                  onChange={(e) => setEditIcon(e.target.value)}
                  className="ml-2 border border-gray-300 rounded"
                >
                  {combinedIcons.map((icon) => (
                    <option key={icon.id} value={icon.id}>
                      {icon.label}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              habit.text
            )}
            <div className="ml-auto flex space-x-2">
              <button
                onClick={() => onRemove(index)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
              {index === editingIndex ? (
                <button
                  onClick={() => handleSaveEdit(index)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(index)}
                  className="text-yellow-500 hover:text-yellow-700"
                >
                  
                  <FaPen />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center border-t pt-4 mt-4">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="New habit"
          className="flex-grow p-2 border border-gray-300 rounded"
        />
        <select
          value={selectedIcon}
          onChange={(e) => setSelectedIcon(e.target.value)}
          className="ml-2 border border-gray-300 rounded"
        >
          {combinedIcons.map((icon) => (
            <option key={icon.id} value={icon.id}>
              {icon.label}
            </option>
          ))}
        </select>
        <button
          onClick={handleAdd}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default HabitList;
