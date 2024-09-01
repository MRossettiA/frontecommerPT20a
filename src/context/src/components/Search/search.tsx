"use client";

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useSearchContext } from "@/context/SearchContext"; // Ajusta el path si es necesario

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const { setSearchProduct } = useSearchContext();
  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      setSearchProduct(inputValue.trim());
      router.push(`/search/search?q=${encodeURIComponent(inputValue.trim())}`);
    } else {
      router.push("/");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search products..."
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        className="border rounded p-2 outline-none w-full"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
        Search
      </button>
    </div>
  );
};

export default Search;
