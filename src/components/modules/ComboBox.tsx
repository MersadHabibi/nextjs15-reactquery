import React, { type RefObject, useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    // Check if screen is smaller than sm breakpoint (640px in Tailwind by default)
    const isMobile = window.innerWidth < 640;

    if (isOpen && isMobile) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <div ref={ref} className={cn("relative", containerClassName)}>
      <div
        className={cn(
          "bg-background-color flex h-12 cursor-pointer items-center justify-between gap-x-2 rounded-xl border border-primary-border px-3 text-sm text-text shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-black",
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
        <>
          <div
            className="fixed inset-0 z-40 block size-full bg-black/30 backdrop-blur-sm sm:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={cn(
              "fixed bottom-0 left-0 right-0 z-50 mt-1 size-full max-h-64 w-fit overflow-auto border border-primary-border bg-white py-1 text-base shadow-lg ring-opacity-5 focus:outline-none sm:absolute sm:!inset-auto sm:z-[1] sm:h-auto sm:max-h-48 sm:rounded-md sm:text-sm",
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
        </>
      )}
    </div>
  );
};

export default ComboBox;
