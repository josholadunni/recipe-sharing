import { useEffect, useState } from "react";

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
  formState,
  setFormState,
}) {
  let [isOverWordCount, setIsOverWordCount] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
    const count = value.length;
    count > charLimit ? setIsOverWordCount(true) : setIsOverWordCount(false);
    onWordCountChange(id, name, index, count, isOverWordCount); // Call the callback to update the word count in the parent
  };

  return (
    <div>
      <div id={id} className="py-2 flex flex-col w-60 mx-auto">
        <label htmlFor={name}>{label}</label>
        <input
          className="border-2"
          type={type}
          name={name}
          value={formState[name]}
          placeholder={placeholder}
          onChange={handleInputChange}
          required
        />
      </div>
      {isOverWordCount && (
        <p className="text-red-600">Too many characters. Please reduce.</p>
      )}
    </div>
  );
}
