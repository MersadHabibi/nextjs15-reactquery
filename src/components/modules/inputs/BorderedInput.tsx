"use client";

import { cn, unFormatNumber } from "@/lib/utils";
import { useEffect, useState } from "react";
import { FieldError, UseFormRegister, UseFormSetValue } from "react-hook-form";

// Helper function to format number with thousand separators
const formatNumber = (value: string) => {
  // Remove any non-digit characters except decimal point
  const cleanValue = value.replace(/[^\d.]/g, "");

  // Split number into integer and decimal parts
  const [integerPart, decimalPart] = cleanValue.split(".");

  // Add thousand separators to integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Return formatted number with decimal part if it exists
  return decimalPart !== undefined
    ? `${formattedInteger}.${decimalPart}`
    : formattedInteger;
};

export default function BorderedInput({
  type,
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
  onChange,
  onClick,
  dir,
  disable,
  isCurrency = false,
  setValue,
  ...props
}: {
  type?: string;
  placeholder?: string;
  name: string;
  register?: UseFormRegister<any>;
  error?:
    | FieldError
    | undefined
    | {
        message: string;
      };
  valueAsNumber?: boolean;
  className?: string;
  containerClassName?: string;
  value?: string;
  defaultValue?: any;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  dir?: "rtl" | "ltr" | "auto";
  disable?: boolean;
  isCurrency?: boolean;
  setValue?: UseFormSetValue<any>;
} & React.ComponentProps<"input">) {
  const [displayValue, setDisplayValue] = useState("");

  // Handle initial value
  useEffect(() => {
    if (isCurrency && (value || defaultValue)) {
      setDisplayValue(formatNumber(String(value || defaultValue)));
    }
  }, [value, defaultValue, isCurrency]);

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
    if (isCurrency) {
      const rawValue = unFormatNumber(event.target.value);
      const formattedValue = formatNumber(rawValue);
      setDisplayValue(formattedValue);

      // Create a synthetic event with unformatted value for form handling
      const syntheticEvent = {
        ...event,
        target: {
          ...event.target,
          value: rawValue,
        },
      };

      if (onChange)
        onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
    } else {
      event.target.value = convertPersianToEnglish(event.target.value); // Convert input value
      if (onChange) onChange(event);
    }
  };

  if (isCurrency && register) {
    const registration = register(name as any, { valueAsNumber });

    return (
      <div className={cn("w-full", containerClassName)}>
        <input
          dir={dir}
          type={type || "text"}
          id={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={cn(
            "bordered-input",
            className,
            error && "!border-[#ff0000]",
          )}
          value={displayValue}
          onClick={onClick}
          onInput={(event) => onInput && onInput(event)}
          onChange={(e) => {
            if (isCurrency) {
              if (setValue)
                setValue(name, e.currentTarget.value.replace(/,/g, "")); // Ensure react-hook-form gets the unformatted value
              handleChange(e);
            } else {
              if (setValue)
                setValue(name, e.currentTarget.value.replace(/,/g, "")); // Ensure react-hook-form gets the unformatted value
            }
          }}
          onBlur={registration.onBlur}
          name={registration.name}
          ref={registration.ref}
        />
        {error ? (
          <p className="m-0 pt-1 text-start text-xs text-[#ff0000]">
            {error?.message}
          </p>
        ) : null}
      </div>
    );
  }

  if (register) {
    return (
      <div className={cn("w-full", containerClassName)}>
        <input
          disabled={disable}
          dir={dir}
          type={type || "text"}
          id={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={cn(
            "bordered-input",
            className,
            error && "!border-[#ff0000]",
          )}
          value={value}
          onClick={onClick}
          onInput={handleInput}
          {...register(name as any, { valueAsNumber })}
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

  return (
    <div className={cn("w-full", containerClassName)}>
      <input
        disabled={disable}
        dir={dir}
        type={type || "text"}
        id={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={cn(
          "bordered-input",
          className,
          error && "!border-[#ff0000]",
        )}
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
