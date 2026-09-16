import CardLoader from "../../components/ui/CardLoader";

export default function Loading() {
  return (
    <div className="container mx-auto my-3 md:my-10 px-5 md:px-10">
      <div className="sticky top-0  py-2 ">
        <h1 className="text-center text-3xl font-bold mb-5 ">Projects</h1>
      </div>
      <div className="py-4 md:py-8">
        <CardLoader />
      </div>
    </div>
  );
}
