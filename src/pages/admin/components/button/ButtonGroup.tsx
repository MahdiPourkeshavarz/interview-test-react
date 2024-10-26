import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../../../context/store";

export function ButtonGroup() {
  const { activeNav, setActiveNav } = useStore();
  const [selected, setSelected] = useState(activeNav);

  const options = [
    { label: "Main", value: "" },
    { label: "Result", value: "results" },
    { label: "Questions", value: "questions" },
  ];

  return (
    <div className="inline-flex rounded-lg shadow-sm" role="group">
      {options.map((option, index) => (
        <Link
          key={option.value}
          to={option.value ? `/admin/${option.value}` : "/admin"}
          className={`font-normal px-4 py-2 transition-colors duration-150 focus:outline-none sm:text-xs md:px-5 md:py-2 md:text-base lg:px-6 lg:py-2 lg:text-lg lg:font-semibold ${
            selected === option.value
              ? "bg-blue-600 text-white"
              : "bg-[#fafdff0e] text-gray-400 hover:bg-gray-200"
          } ${index === 0 ? "rounded-l-lg" : ""} ${
            index === options.length - 1 ? "rounded-r-lg" : ""
          }`}
          onClick={() => {
            setActiveNav(option.value);
            setSelected(option.value);
          }}
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}
