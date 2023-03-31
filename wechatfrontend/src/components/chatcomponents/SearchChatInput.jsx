import { useRef } from "react";

const SearchChatInput = ({ HandleInputValue }) => {
  const inputValue = useRef();

  return (
    <div className="flex flex-row gap-2 justify-center my-2 items-center mx-2">
      <input
        className="border hover:border-gray-600 outline-none w-auto h-10 px-4 py-1 rounded-sm"
        type={"text"}
        ref={inputValue}
        placeholder="Enter a name to search"
      />
      <button
        onClick={() => {
          if (!inputValue.current?.value) {
            return;
          }
          HandleInputValue(inputValue.current?.value);
          inputValue.current.value = "";
        }}
        type={"button"}
        className="border border-gray-100 hover:border-gray-600 px-4 py-1 rounded-sm bg-blue-300"
      >
        {" "}
        Search{" "}
      </button>
    </div>
  );
};

export default SearchChatInput;
