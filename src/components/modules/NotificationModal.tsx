"use client";

import BorderedButton from "@/components/modules/buttons/BorderedButton";
import Button from "@/components/modules/buttons/Button";
import Modal from "@/components/modules/Modal";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { createPortal } from "react-dom";
import BorderedInput from "./inputs/BorderedInput";

type TProps = {
  title: string;
  description: string;
  onSubmit: (value?: string) => Promise<boolean>;
  actionName?: string;
  actionClassName?: string;
  className?: string;
  children: React.ReactNode;
  variant?: "button" | "borderedButton";
  colorVariant?: "blue" | "red" | "green";
  isHaveNote?: boolean;
  noteTitle?: string;
};

export default function NotificationModal({
  description,
  title,
  onSubmit,
  actionName = "حذف",
  actionClassName,
  className,
  children,
  variant,
  colorVariant,
  isHaveNote,
  noteTitle,
}: TProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");

  return (
    <>
      {variant === "button" || colorVariant ? (
        <Button
          type="button"
          variant={colorVariant}
          className={cn(className)}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setIsOpenModal(true);
          }}>
          {children}
        </Button>
      ) : variant === "borderedButton" ? (
        <BorderedButton
          type="button"
          variant={colorVariant}
          className={cn(className)}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setIsOpenModal(true);
          }}>
          {children}
        </BorderedButton>
      ) : (
        <button
          type="button"
          className={cn(className)}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setIsOpenModal(true);
          }}>
          {children}
        </button>
      )}
      {createPortal(
        <Modal
          isOpen={isOpenModal}
          title={title}
          classNames={{
            background: "z-[60] !py-0 !px-4",
            box: "!max-w-lg !max-h-[95%] rounded-none overflow-x-hidden !h-fit flex flex-col justify-between rounded-xl",
            header: "!py-4",
          }}
          onCloseModal={() => setIsOpenModal(false)}
          onClickOutside={() => setIsOpenModal(false)}>
          <div className="px-6 pb-7 pt-6">
            <p className="font-medium">{description}</p>
            {isHaveNote ? (
              <div className="pt-4">
                <p className="text-sm text-text-300">{noteTitle}</p>
                <BorderedInput
                  name={"note" + noteTitle}
                  containerClassName="mt-1"
                  type="text"
                  value={value}
                  onInput={(event) => {
                    setValue(event.currentTarget.value);
                  }}
                />
              </div>
            ) : null}
          </div>
          <div className="flex items-center justify-end gap-x-4 px-6 pb-5">
            <Button
              type="button"
              isLoading={isLoading}
              disabled={isLoading}
              action="DELETE"
              className={cn("!px-7 sm:!px-10", actionClassName)}
              onClick={async () => {
                setIsLoading(true);
                const res = await onSubmit(value);
                setIsLoading(false);

                if (res) setIsOpenModal(false);
              }}>
              {actionName}
            </Button>
            <BorderedButton
              disabled={isLoading}
              type="button"
              className="!px-6 sm:!px-10"
              onClick={() => setIsOpenModal(false)}>
              لغو
            </BorderedButton>
          </div>
        </Modal>,
        document.body,
      )}
    </>
  );
}
