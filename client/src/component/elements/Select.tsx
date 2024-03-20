import React, { useState } from "react";
import { SelectType } from "../../utils/Type";
import { Input, input } from "@material-tailwind/react";

function Select({
  name,
  value,
  onChange,
  options,
  customOption = false,
}: SelectType) {
  const [customWithText, setCustomWIthText] = useState(false);

  function onChangeSelect(e: any) {
    if (e.target.value === "custom") {
      setCustomWIthText(true);
    } else {
      setCustomWIthText(false);
    }
    onChange(e);
  }
  return (
    <>
      <select
        id={name} // Menggunakan properti name sebagai id
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        name={name}
        value={value}
        onChange={onChangeSelect} // Memperbaiki penulisan properti onChange
      >
        <option value="">Select {name}</option>
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
        {customOption && <option value="custom">Custome</option>}
      </select>
      {customWithText && (
        <Input
          type="text"
          name={name}
          id={name}
          label="name"
          value={value}
          crossOrigin=""
          onChange={onChange}
        />
      )}
    </>
  );
}

export default Select;
