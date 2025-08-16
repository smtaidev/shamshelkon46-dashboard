"use client";

import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  placeholder: string;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export function CustomDropdown({
  options,
  placeholder,
  value,
  onChange,
  className,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    // console.log(`Selected: ${optionValue}`);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white  rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
      >
        <span className={cn("truncate", !selectedOption && "text-gray-500")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 ml-2 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg animate-in fade-in-0 zoom-in-95 duration-200">
          <div className="py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className="flex items-center justify-between w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 border-b border-background-secondary/10 last:border-b-0"
              >
                <span>{option.label}</span>
                {value === option.value && (
                  <Check className="w-4 h-4 text-purple-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
