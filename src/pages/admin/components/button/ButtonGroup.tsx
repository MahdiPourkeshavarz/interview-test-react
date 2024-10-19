import { useState } from "react";
import { Link } from "react-router-dom";

export function ButtonGroup() {
  const [selected, setSelected] = useState("");

  const options = [
    { label: "صفحه اصلی", value: "" },
    { label: "نتایج", value: "results" },
    { label: "سوالات", value: "questions" },
  ];

  return (
    <div className="inline-flex rounded-lg shadow-sm" role="group">
      {options.map((option, index) => (
        <Link
          key={option.value}
          to={option.value ? `/admin/${option.value}` : "/admin"}
          className={`font-normal border border-gray-500 px-2 py-1 transition-colors duration-150 focus:outline-none sm:text-xs md:px-3 md:py-1 md:text-base lg:px-6 lg:py-2 lg:text-lg lg:font-semibold ${
            selected === option.value
              ? "bg-blue-600 text-white"
              : "bg-[#fafdff0e] text-gray-400 hover:bg-gray-200"
          } ${index === 0 ? "rounded-r-lg" : ""} ${
            index === options.length - 1 ? "rounded-l-lg" : ""
          }`}
          onClick={() => {
            setSelected(option.value);
          }}
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}
