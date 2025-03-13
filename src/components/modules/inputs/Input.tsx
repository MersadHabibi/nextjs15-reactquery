"use client";

import { IEye, IEyeSlash } from "@/components/Icons";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";

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

  // Function to convert Persian numbers to English
  const convertPersianToEnglish = (str: string) => {
    const persianNumbers = [
      /۰/g,
      /۱/g,
      /۲/g,
      /۳/g,
      /۴/g,
      /۵/g,
      /۶/g,
      /۷/g,
      /۸/g,
      /۹/g,
    ];
    const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    let convertedStr = str;
    for (let i = 0; i < 10; i++) {
      convertedStr = convertedStr.replace(persianNumbers[i], englishNumbers[i]);
    }
    return convertedStr;
  };

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    target.value = convertPersianToEnglish(target.value); // Convert input value
    if (onInput) onInput(event);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = convertPersianToEnglish(event.target.value); // Convert input value
    if (onChange) onChange(event);
  };

  if (register) {
    return (
      <div className={cn("w-full", containerClassName)}>
        <div className="relative">
          <input
            accept={accept}
            type={
              defaultType === "password"
                ? isShow
                  ? "text"
                  : "password"
                : defaultType || "text"
            }
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
        type={defaultType || "text"}
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
