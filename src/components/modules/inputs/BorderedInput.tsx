"use client";

import { cn, formatNumber, unFormatNumber } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  type FieldError,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";

// Function to convert Persian numbers to English
const convertPersianToEnglish = (str: string) => {
  if (!str) return "";

  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/[۰-۹]/g, (match) => {
    return persianDigits.indexOf(match).toString();
  });
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

  // Use text type for all inputs but handle number validation separately
  const actualType = type === "number" ? "text" : type || "text";

  // Handle initial value
  useEffect(() => {
    if (isCurrency && (value || defaultValue)) {
      setDisplayValue(formatNumber(String(value || defaultValue)));
    }
  }, [value, defaultValue, isCurrency]);

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    let convertedValue = convertPersianToEnglish(target.value);

    // If original type was number, only allow digits (but don't restrict if it's a currency field)
    if (type === "number" && !isCurrency && convertedValue) {
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
    // Convert Persian digits to English first
    const convertedValue = convertPersianToEnglish(event.target.value);

    if (isCurrency) {
      const rawValue = unFormatNumber(convertedValue);
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
      if (convertedValue !== event.target.value) {
        event.target.value = convertedValue;
      }
      if (onChange) onChange(event);
    }
  };

  if (isCurrency && register) {
    const registration = register(name as any, { valueAsNumber });

    return (
      <div className={cn("w-full", containerClassName)}>
        <input
          dir={dir}
          type={actualType}
          id={name}
          placeholder={placeholder}
          className={cn(
            "bordered-input",
            className,
            error && "!border-[#ff0000]",
          )}
          value={displayValue}
          onClick={onClick}
          onInput={handleInput}
          onChange={(e) => {
            const convertedValue = convertPersianToEnglish(e.target.value);
            if (isCurrency) {
              if (setValue) setValue(name, unFormatNumber(convertedValue)); // Ensure react-hook-form gets the unformatted value
              handleChange(e);
            } else {
              if (setValue) setValue(name, convertedValue); // Ensure react-hook-form gets the unformatted value
            }
          }}
          onBlur={registration.onBlur}
          name={registration.name}
          ref={registration.ref}
          {...props}
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
    const registration = register(name as any, { valueAsNumber });
    return (
      <div className={cn("w-full", containerClassName)}>
        <input
          disabled={disable}
          dir={dir}
          type={actualType}
          id={name}
          placeholder={placeholder}
          className={cn(
            "bordered-input",
            className,
            error && "!border-[#ff0000]",
          )}
          {...(value !== undefined ? { value } : { defaultValue })}
          onClick={onClick}
          onInput={handleInput}
          onBlur={registration.onBlur}
          name={registration.name}
          ref={registration.ref}
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
        type={actualType}
        id={name}
        placeholder={placeholder}
        className={cn(
          "bordered-input",
          className,
          error && "!border-[#ff0000]",
        )}
        onClick={onClick}
        {...(value !== undefined ? { value } : { defaultValue })}
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
