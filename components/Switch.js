import React from "react";

export default function Switch({ checked, setChecked, title }) {
  return (
    <div className="flex items-center mb-2">
      <div class="relative w-12 mr-2 inline-block align-middle select-none transition duration-200 ease-in">
        <input
          type="checkbox"
          name="toggle"
          id="toggle"
          class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          onClick={() => setChecked(!checked)}
        />
        <label
          for="toggle"
          class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
        ></label>
      </div>
      <label for="toggle" class="text-sm text-gray-700">
        {title}
      </label>
    </div>
  );
}
