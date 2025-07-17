"use client";

import useSearchQueries from "@/hooks/useSearchQueries";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export type TPageInfo = {
  currentPage?: number | null;
  pageSize?: number | null;
  totalPages?: number | null;
};

type TProps = {
  pageInfo?: TPageInfo;
};

export default function Pagination(props: TProps) {
  const setSearchParams = useSearchQueries();

  const navigate = (target: string) => {
    setSearchParams(["page"], [target]);
  };

  if (!props.pageInfo?.totalPages) return null;

  return (
    <div className="flex items-end justify-center gap-x-2 py-5">
      {/* next page */}
      <button
        className="hover:bg-primary-100 disabled:hover:!bg-background-color flex size-9 items-center justify-center rounded-md border border-primary-border transition-colors disabled:cursor-not-allowed disabled:opacity-70 [&.active]:!bg-primary"
        disabled={
          !(
            props?.pageInfo?.currentPage &&
            Number(props?.pageInfo?.currentPage) <
              Number(props?.pageInfo?.totalPages)
          )
        }
        onClick={() =>
          navigate(String(Number(props.pageInfo?.currentPage) + 1))
        }>
        <ChevronRightIcon className="size-6" />
      </button>

      {/* Last page */}
      {Number(props?.pageInfo?.currentPage) + 1 <
      Number(props.pageInfo.totalPages) ? (
        <>
          <button
            className="hover:bg-primary-100 flex size-9 items-center justify-center rounded-md border border-primary-border pt-0.5 transition-colors disabled:opacity-70 [&.active]:!bg-primary [&.active]:!text-white"
            onClick={() =>
              navigate(String(Number(props.pageInfo?.totalPages)))
            }>
            {Number(props?.pageInfo?.totalPages)}
          </button>
          <button
            disabled
            className="flex size-9 items-center justify-center rounded-md border border-primary-border pt-0.5 opacity-70 transition-colors disabled:opacity-70 [&.active]:!bg-primary [&.active]:!text-white">
            <span className="opacity-70">...</span>
          </button>
        </>
      ) : null}

      {/* 2 next page */}
      {/* {props?.pageInfo?.currentPage &&
      Number(props?.pageInfo?.currentPage + 1) <
        Number(props?.pageInfo?.totalPages) ? (
        <button
          className="flex size-9 items-center justify-center rounded-md border border-primary-border pt-0.5 transition-colors hover:bg-primary-100 disabled:opacity-70 [&.active]:!bg-primary [&.active]:!text-white"
          onClick={() =>
            navigate(String(Number(props.pageInfo?.currentPage) + 2))
          }>
          {Number(props?.pageInfo?.currentPage) + 2}
        </button>
      ) : null} */}

      {/* 1 next page */}
      {props?.pageInfo?.currentPage &&
      Number(props?.pageInfo?.currentPage) <
        Number(props?.pageInfo?.totalPages) ? (
        <button
          className="hover:bg-primary-100 flex size-9 items-center justify-center rounded-md border border-primary-border pt-0.5 transition-colors disabled:opacity-70 [&.active]:!bg-primary [&.active]:!text-white"
          onClick={() =>
            navigate(String(Number(props.pageInfo?.currentPage) + 1))
          }>
          {Number(props?.pageInfo?.currentPage) + 1}
        </button>
      ) : null}

      {/* current page */}
      <button className="active hover:bg-primary-100 flex size-9 items-center justify-center rounded-md border border-primary-border pt-0.5 transition-colors disabled:opacity-70 [&.active]:!bg-primary [&.active]:!text-white">
        {props?.pageInfo?.currentPage || 1}
      </button>

      {/* 1 prev page */}
      {Number(props?.pageInfo?.currentPage) > 1 ? (
        <button
          className="hover:bg-primary-100 flex size-9 items-center justify-center rounded-md border border-primary-border pt-0.5 transition-colors disabled:opacity-70 [&.active]:!bg-primary [&.active]:!text-white"
          onClick={() =>
            navigate(String(Number(props.pageInfo?.currentPage) - 1))
          }>
          {Number(props?.pageInfo?.currentPage) - 1}
        </button>
      ) : null}

      {/* 2 prev page */}
      {/* {Number(props?.pageInfo?.currentPage) - 1 > 1 ? (
        <button
          className="flex size-9 items-center justify-center rounded-md border border-primary-border pt-0.5 transition-colors hover:bg-primary-100 disabled:opacity-70 [&.active]:!bg-primary [&.active]:!text-white"
          onClick={() =>
            navigate(String(Number(props.pageInfo?.currentPage) - 2))
          }>
          {Number(props?.pageInfo?.currentPage) - 2}
        </button>
      ) : null} */}

      {/* First page */}
      {Number(props?.pageInfo?.currentPage) - 1 > 1 ? (
        <>
          <button
            disabled
            className="flex size-9 items-center justify-center rounded-md border border-primary-border pt-0.5 opacity-70 transition-colors disabled:opacity-70 [&.active]:!bg-primary [&.active]:!text-white">
            <span className="opacity-70">...</span>
          </button>
          <button
            className="hover:bg-primary-100 flex size-9 items-center justify-center rounded-md border border-primary-border pt-0.5 transition-colors disabled:opacity-70 [&.active]:!bg-primary [&.active]:!text-white"
            onClick={() => navigate(String(Number(1)))}>
            1
          </button>
        </>
      ) : null}

      {/* prev page */}
      <button
        className="hover:bg-primary-100 disabled:hover:!bg-background-color flex size-9 items-center justify-center rounded-md border border-primary-border transition-colors disabled:cursor-not-allowed disabled:opacity-70 [&.active]:!bg-primary"
        disabled={!(Number(props?.pageInfo?.currentPage) > 1)}
        onClick={() =>
          navigate(String(Number(props.pageInfo?.currentPage) - 1))
        }>
        <ChevronLeftIcon className="size-6" />
      </button>
    </div>
  );
}
