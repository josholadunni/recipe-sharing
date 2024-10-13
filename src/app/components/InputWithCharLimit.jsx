import { useEffect } from "react";

export default function InputWithCharLimit({
  id,
  name,
  label,
  placeholder,
  type,
  wordCount,
  onWordCountChange,
  index,
  charLimit,
}) {
  let isOverWordCount = null;
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const count = inputValue.length;
    count > charLimit ? (isOverWordCount = true) : (isOverWordCount = false);
    onWordCountChange(index, count, isOverWordCount); // Call the callback to update the word count in the parent
  };

  return (
    <div>
      <div id={id} className="py-2 flex flex-col w-60 mx-auto">
        <label htmlFor={name}>{label}</label>
        <br />
        <input
          className="border-2"
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={handleInputChange}
          required
        />
      </div>
      {wordCount > charLimit && (
        <p className="text-red-600">Too many characters. Please reduce.</p>
      )}
    </div>
  );
}
