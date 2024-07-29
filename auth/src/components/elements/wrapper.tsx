import { cn } from "@/lib/utils";
import React from "react";

type WrapperProps = {
  children: React.ReactNode;
  classname?: string;
};

const Wrapper: React.FC<WrapperProps> = ({ children, classname }) => {
  return (
    <div
      className={cn(
        "max-w-[1400px] mx-auto px-6 sm:px-8 md:px-10 lg:px-16 py-6 sm:py-10",
        classname
      )}
    >
      {children}
    </div>
  );
};

export default Wrapper;
