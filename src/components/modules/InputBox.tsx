import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { ICheck } from "../Icons";

const InputBox = ({
  onChange,
  children,
  className,
  inputClassName,
  modalClassName,
  onSubmit,
  title,
  present,
}: {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  className?: string;
  inputClassName?: string;
  modalClassName?: string;
  onSubmit?: (height: string) => void;
  title?: string;
  present?: boolean;
}) => {
  const ref = useRef(null);
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useOnClickOutside(ref as unknown as React.RefObject<HTMLDivElement>, () =>
    setIsOpen(false),
  );

  return (
    <div ref={ref} className="relative">
      <div
        title={title}
        className={cn(
          "flex cursor-pointer items-center justify-center rounded-md transition-all hover:bg-neutral-100 [&.active]:!bg-primary [&.active]:text-white",
          isOpen && "active",
          className,
        )}
        onClick={toggleDropdown}>
        {children}
      </div>
      {isOpen && (
        <div
          className={cn(
            "custom-scrollbar absolute z-[1] mt-2 flex h-10 w-28 shrink-0 items-center overflow-hidden rounded-md border border-primary-border bg-white p-1 text-sm shadow-lg outline-none",
            modalClassName,
          )}>
          <div className="relative w-full">
            <input
              type="text"
              value={value}
              onChange={(event) => {
                setValue(event.currentTarget.value);
                if (onChange) onChange(event);
              }}
              className={cn(
                "h-full w-full border-none bg-transparent pr-2 outline-none",
                inputClassName,
              )}
            />
            {present ? (
              <p className="absolute left-2 top-0 text-sm text-text-100">%</p>
            ) : null}
          </div>
          <button
            className="flex aspect-square h-full shrink-0 items-center justify-center rounded-md bg-primary-green text-white"
            onClick={() => {
              if (onSubmit) onSubmit(value);
            }}>
            <ICheck className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default InputBox;
