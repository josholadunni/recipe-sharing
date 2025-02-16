import React from "react";

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
  let isOverWordCount = null;
  //Change the field's formState on input change
  const handleInputChange = (e) => {
    const { name, value, id } = e.target;
    const index = parseInt(id.split("-")[1]);
    setFormState((prev) => {
      const updatedValue = [...prev[name]];
      updatedValue[index] = value;
      return {
        ...prev,
        [name]: updatedValue,
      };
    });
    //Check if the field is over the word count
    const count = value.length;
    count > charLimit ? (isOverWordCount = true) : (isOverWordCount = false);
    onWordCountChange(id, index, count, isOverWordCount);
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
      {wordCount > charLimit && (
        <p className="text-red-600">Too many characters. Please reduce.</p>
      )}
    </div>
  );
}
