"use client";

import React, { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

// Extend the default ImageProps to include our custom props
interface ImageWithSkeletonProps extends Omit<ImageProps, "onLoadingComplete"> {
  skeletonClassName?: string;
  containerClassName?: string;
  onLoad?: () => void;
}

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  skeletonClassName = "",
  containerClassName = "",
  onLoad,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn("relative size-full", containerClassName)}>
      {isLoading && (
        <div
          className={cn(
            "skeleton-box absolute inset-0 z-[1] size-full animate-pulse rounded-none bg-[#37a99052] transition-all dark:bg-[#37A9901A]",
            skeletonClassName,
          )}
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "size-full object-cover transition-opacity duration-300",
          className,
          isLoading ? "opacity-0" : "opacity-100",
        )}
        onLoad={() => {
          if (onLoad) onLoad();
          setIsLoading(false);
        }}
        {...rest}
      />
    </div>
  );
};

export default ImageWithSkeleton;
