"use client";

import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { useEffect } from "react";
import { UseFormHandleSubmit } from "react-hook-form";

type TClassnames = {
  background: string;
  box: string;
  header: string;
  closeButton: string;
  closeButtonIcon: string;
  title: string;
};

type ModalProps = {
  children: React.ReactNode;
  classNames?: Partial<TClassnames>;
  isOpen: boolean;
  title?: string;
  size?: "full";
  handleSubmit?: UseFormHandleSubmit<any, undefined>;
  onClickOutside?: () => void;
  onCloseModal?: () => void;
  onSubmit?: (data: FormData | any) => void;
};

export default function Modal({
  children,
  classNames,
  isOpen,
  title,
  size,
  handleSubmit,
  onClickOutside,
  onCloseModal,
  onSubmit,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) document.body.classList.add("!overflow-hidden");
    else document.body.classList.remove("!overflow-hidden");

    return () => {
      document.body.classList.remove("!overflow-hidden");
    };
  }, [isOpen]);

  return (
    <div
      className={cn(
        "modal !pointer-events-auto max-h-full overflow-y-auto p-4",
        isOpen
          ? "visible z-10 !bg-black/30 opacity-100 backdrop-blur-sm"
          : "invisible -z-10 opacity-0",
        size === "full" && "p-0",
        classNames?.background,
      )}
      onClick={() => {
        if (onClickOutside) onClickOutside();
      }}>
      <form
        onSubmit={
          handleSubmit && onSubmit
            ? handleSubmit(onSubmit)
            : onSubmit
              ? (event) => onSubmit(event)
              : (event) => {
                  event.preventDefault();
                }
        }
        className={cn(
          "modal-box scale-100 !overflow-y-visible bg-white p-0",
          !size &&
            "h-fit max-h-60 w-full max-w-md sm:h-80 sm:max-h-full sm:max-w-xl md:max-w-2xl",
          size === "full" &&
            "h-full max-h-none w-full max-w-none rounded-none md:max-h-[95%] md:max-w-4xl md:rounded-2xl",
          classNames?.box,
        )}
        onClick={(event) => {
          event.stopPropagation();
        }}>
        <div
          className={cn(
            "flex items-center justify-between border-b border-primary-border px-6 py-5",
            classNames?.header,
          )}>
          <p className={cn("font-medium", classNames?.title)}>{title}</p>
          <button
            type="button"
            onClick={onCloseModal}
            className={cn(classNames?.closeButton)}>
            <XIcon
              className={cn(
                "text-text-300 size-6",
                classNames?.closeButtonIcon,
              )}
            />
          </button>
        </div>
        {children}
      </form>
    </div>
  );
}
