import { useState } from "react";

function SearchBar() {
  const [value, setValue] = useState("");

  return (
    <div className="flex items-center bg-[#B5C4C6] rounded-full px-4 py-2 w-[300px] max-w-sm">
      <input
        type="text"
        placeholder="Buscar usuário"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="bg-transparent outline-none flex-1 text-sm font-medium text-gray-700 placeholder-gray-600"
      />

      <svg
        className="w-4 h-4 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="m21 21-4.35-4.35m1.85-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
        />
      </svg>
    </div>
  );
}
export default SearchBar;
