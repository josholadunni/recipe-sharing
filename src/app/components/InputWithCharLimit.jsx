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
  formState,
  setFormState,
}) {
  let isOverWordCount = null;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
    const count = value.length;
    count > charLimit ? (isOverWordCount = true) : (isOverWordCount = false);
    onWordCountChange(id, index, count, isOverWordCount); // Call the callback to update the word count in the parent
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
          value={formState[name]}
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
