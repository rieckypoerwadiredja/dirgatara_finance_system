import React from "react";
import { SelectType } from "../../utils/Type";

function Select({ name, value, onChange, options }: SelectType) {
  return (
    <select
      id={name} // Menggunakan properti name sebagai id
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      name={name}
      value={value}
      onChange={onChange} // Memperbaiki penulisan properti onChange
    >
      <option value="">Select {name}</option>
      {options.map((option, idx) => (
        <option key={idx} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Select;
