import React, { type RefObject, useRef, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { useOnClickOutside } from "usehooks-ts";
import { type FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";

export type TOption = {
  key: string;
  title: string;
};

const ComboBox = ({
  options,
  value,
  onChange,
  error,
  className,
  containerClassName,
  dropDownClassName,
}: {
  options: TOption[];
  value?: string;
  onChange: (option: TOption) => void;
  error?:
    | FieldError
    | undefined
    | {
        message: string;
      };
  className?: string;
  containerClassName?: string;
  dropDownClassName?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  useOnClickOutside(ref as RefObject<HTMLDivElement>, () => setIsOpen(false));

  return (
    <div ref={ref} className={cn("relative", containerClassName)}>
      <div
        className={cn(
          "bg-background-color mt-1 flex h-12 cursor-pointer items-center justify-between gap-x-2 rounded-xl border border-primary-border px-3 text-sm text-text shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-black",
          isOpen && "border-neutral-600",
          error?.message && "border-[#ff0000]",
          className,
        )}
        onClick={toggleDropdown}>
        <span className="block truncate">{value || "انتخاب کنید"}</span>
        <ChevronDownIcon
          className={`h-5 w-5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      {error ? (
        <p className="pt-1 text-start text-xs text-[#ff0000]">
          {error?.message}
        </p>
      ) : null}
      {isOpen && (
        <div
          className={cn(
            "absolute z-[1] mt-1 max-h-48 w-fit overflow-auto rounded-md border border-primary-border bg-white py-1 text-base shadow-lg ring-opacity-5 focus:outline-none sm:text-sm",
            dropDownClassName,
          )}>
          {options?.map((option, index) => (
            <div
              key={index}
              className="shrink-0 cursor-pointer text-nowrap px-4 py-2 hover:bg-gray-100"
              onClick={() => handleOptionSelect(option)}>
              {option.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComboBox;
