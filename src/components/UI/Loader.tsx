import { HTMLProps } from "react";

function Loader({
  className,
}: {
  className?: HTMLProps<HTMLElement>["className"];
}) {
  return (
    <div
      className={`  flex flex-col justify-center items-center bg-base-100 text-center ${className}`}
    >
      <div className="loading  loading-bars loading-sm md:loading-lg text-primary"></div>
      <p className="text-lg text-gray-500 mt-4">Loading, please wait...</p>
    </div>
  );
}

export default Loader;
