import React, { useState } from "react";

export default function Input({
  id,
  type,
  name,
  label,
  placeholder,
  wordCount,
  charLimit,
  onChange,
  onRemove,
  formState,
  setFormState,
  onWordCountChange,
}) {
  const idNumber = Number(id.split("-")[1]);
  let [isOverWordCount, setIsOverWordCount] = useState(false);

  //Change the field's formState on input change
  const handleInputChange = (e) => {
    const { name, value, id } = e.target;
    const index = parseInt(id.split("-")[1]);
    setFormState((prev) => {
      const idIndex = prev[name].indexOf(id);
      const updatedArray = [...prev[name]];
      updatedArray[idIndex + 1] = value;
      if (prev[name].includes(id)) {
        return {
          ...prev,
          [name]: updatedArray,
        };
      } else {
        return {
          ...prev,
          [name]: [...prev[name], id, value],
        };
      }
    });

    //Check if the field is over the word count
    const count = value.length;
    count > charLimit ? setIsOverWordCount(true) : setIsOverWordCount(false);
    onWordCountChange(id, name, index, count, isOverWordCount);
  };

  const fieldValue = () => {
    // Search for this specific field's ID in the array
    const idIndex = formState[name].findIndex((item) => item === id);
    if (idIndex !== -1) {
      // Get the value that follows this specific ID
      return formState[name][idIndex + 1] || "";
    }
    return "";
  };

  return (
    <div id={id} className="py-2 flex flex-col w-60 mx-auto">
      <label htmlFor={name}>{label}</label>
      <br></br>
      <div className="flex flex-row">
        <input
          id={id}
          className="border-2"
          type={type}
          name={name}
          placeholder={placeholder}
          value={fieldValue()}
          onChange={handleInputChange}
          required
        />
        <span
          className=" text-black border border-black rounded hover:bg-black hover:text-white px-2"
          onClick={() => onRemove()}
        >
          x
        </span>
      </div>
      {isOverWordCount && (
        <p className="text-red-600">Too many characters. Please reduce.</p>
      )}
    </div>
  );
}
