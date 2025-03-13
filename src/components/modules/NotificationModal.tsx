"use client";

import BorderedButton from "@/components/modules/buttons/BorderedButton";
import Button from "@/components/modules/buttons/Button";
import Modal from "@/components/modules/Modal";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { createPortal } from "react-dom";

type TProps = {
  title: string;
  description: string;
  onSubmit: () => Promise<boolean>;
  actionName?: string;
  actionClassName?: string;
  className?: string;
  children: React.ReactNode;
};

export default function NotificationModal({
  description,
  title,
  onSubmit,
  actionName = "حذف",
  actionClassName,
  className,
  children,
}: TProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <button
        type="button"
        className={cn("text-xs text-primary-blue", className)}
        onClick={() => setIsOpenModal(true)}>
        {children}
      </button>
      {createPortal(
        <Modal
          isOpen={isOpenModal}
          title={title}
          classNames={{
            background: "z-50 !py-0 !px-4",
            box: "!max-w-lg !max-h-[95%] rounded-none overflow-x-hidden !h-fit flex flex-col justify-between rounded-xl",
            header: "!py-4",
          }}
          onCloseModal={() => setIsOpenModal(false)}
          onClickOutside={() => setIsOpenModal(false)}>
          <div className="px-6 pb-7 pt-6">
            <p className="font-medium">{description}</p>
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
                const res = await onSubmit();
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
