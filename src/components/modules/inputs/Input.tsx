"use client";

import { IEye, IEyeSlash } from "@/components/Icons";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { type UseFormRegister } from "react-hook-form";

// Function to convert Persian numbers to English
const convertPersianToEnglish = (str: string) => {
  if (!str) return "";

  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/[۰-۹]/g, (match) => {
    return persianDigits.indexOf(match).toString();
  });
};

export default function Input({
  type: defaultType,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  className,
  containerClassName,
  value,
  defaultValue,
  onInput,
  // hasHideShowBtn,
  onChange,
  onClick,
  accept,
  ...props
}: {
  accept?: string;
  type?: string;
  placeholder?: string;
  name: string;
  register?: UseFormRegister<any>;
  error?: any;
  valueAsNumber?: boolean;
  className?: string;
  containerClassName?: string;
  value?: string;
  defaultValue?: any;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  // hasHideShowBtn?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [isShow, setIsShow] = useState(false);

  // Use text type for all inputs but handle number validation separately
  const actualType =
    defaultType === "number"
      ? "text"
      : defaultType === "password"
        ? isShow
          ? "text"
          : "password"
        : defaultType || "text";

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    let convertedValue = convertPersianToEnglish(target.value);

    // If original type was number, only allow digits
    if (defaultType === "number" && convertedValue) {
      convertedValue = convertedValue.replace(/[^0-9]/g, "");
      target.value = convertedValue;
    }

    // Only update if conversion actually changed something
    if (convertedValue !== target.value) {
      target.value = convertedValue;
    }

    if (onInput) onInput(event);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let convertedValue = convertPersianToEnglish(event.target.value);

    // If original type was number, only allow digits
    if (defaultType === "number" && convertedValue) {
      convertedValue = convertedValue.replace(/[^0-9]/g, "");
      event.target.value = convertedValue;
    }

    // Only update if conversion actually changed something
    if (convertedValue !== event.target.value) {
      event.target.value = convertedValue;
    }

    if (onChange) onChange(event);
  };

  if (register) {
    return (
      <div className={cn("w-full", containerClassName)}>
        <div className="relative">
          <input
            accept={accept}
            type={actualType}
            id={name}
            defaultValue={defaultValue}
            placeholder={placeholder}
            className={cn(
              "input",
              className,
              error && "border !border-[#ff0000]",
            )}
            value={value}
            onClick={onClick}
            onInput={handleInput}
            // onChange={(event) => onChange && onChange(event)}
            {...register(name as any, { valueAsNumber })}
            {...props}
          />
          <button
            type="button"
            className={cn(
              "invisible absolute left-5 top-4 hidden fill-text-200",
              defaultType === "password" && "visible block",
            )}
            onClick={() => setIsShow(!isShow)}>
            {isShow ? (
              <IEyeSlash className="size-[26px]" />
            ) : (
              <IEye className="size-6" />
            )}
          </button>
        </div>
        {error ? (
          <p className="pt-1 text-start text-xs text-[#ff0000]">
            {error?.message}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn("w-full", containerClassName)}>
      <input
        accept={accept}
        type={actualType}
        id={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={cn("input", className, error && "border !border-[#ff0000]")}
        onClick={onClick}
        value={value}
        onInput={handleInput}
        onChange={handleChange}
        {...props}
      />
      {error ? (
        <p className="pt-1 text-start text-xs text-[#ff0000]">
          {error?.message}
        </p>
      ) : null}
    </div>
  );
}
