function CardLoader() {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-between flex-wrap gap-5">
      {Array.from({ length: 4 }).map((_, index) => (
        <div className="flex w-full flex-col gap-4" key={index}>
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ))}
    </div>
  );
}

export default CardLoader;
