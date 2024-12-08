import { createFileRoute } from "@tanstack/react-router";
import { useGetProjectById } from "../../services/queries/projectQueries";
import frontEndImage from "../../assets/frontend.png";
import backEndImage from "../../assets/backend.png";
import { LuBadgeCheck } from "react-icons/lu";
import Loader from "../../components/UI/Loader";

export const Route = createFileRoute("/projects/$projectId")({
  component: RouteComponent,
});

function RouteComponent() {
  const projectId = Route.useParams().projectId;
  const {
    data: project,
    isLoading,
    isError,
    error,
  } = useGetProjectById(projectId);
  console.log(project);

  if (isLoading) {
    return <Loader className="h-screen" />;
  }
  if (!project || isError) {
    return <div>Error</div>;
  }

  return (
    <div className="container mx-auto my-3 md:my-10 px-5 md:px-10">
      <div>
        <img
          src={
            project.image && typeof project.image === "string"
              ? project.image
              : ""
          }
          alt={project.title}
          className="w-full h-52 md:h-80 lg:h-96 object-cover rounded-xl"
        />
      </div>
      <div className="my-5">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold font-Montserrat mb-2">
          {project.title}
        </h1>
        <p className="mb-4 text-sm md:text-base lg:text-lg text-gray-600">
          {project.summary}
        </p>
        <h3 className="text-base md:text-xl lg:text-2xl font-bold text-gray-900">
          Details
        </h3>
        <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-6">
          {/* {project.projectDetails} */}
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero debitis
          quaerat fugit ipsum amet illo. Quisquam praesentium illum
          reprehenderit necessitatibus sed aliquam distinctio saepe corporis
          eveniet. Consectetur eum autem omnis. Quos totam magni numquam sequi
          libero illum voluptatum atque, deleniti maxime suscipit quia
          repellendus, labore sit pariatur quidem sed, doloremque quasi
          officiis! Porro perspiciatis fuga, necessitatibus ea illum laboriosam
          et corporis officiis earum dolorum repellat architecto veritatis
          magnam? Officia nesciunt animi laborum corporis maiores tenetur ullam
          reprehenderit ex ea quidem, modi aliquid quo pariatur ratione? Ab quo
          consequatur dolorum ipsa, nulla assumenda harum veniam nisi suscipit
          iste dolorem, itaque consectetur, unde impedit et excepturi ipsum
          distinctio. Ipsam ab consequuntur, nobis eos tempora architecto
          possimus earum quis, laudantium asperiores nesciunt consequatur,
          officia perspiciatis nulla officiis voluptatibus dolore cupiditate ut
          iure! Consectetur ut eaque aperiam, blanditiis ipsam praesentium totam
          modi accusamus saepe excepturi nostrum animi ipsum nisi quo quisquam
          iste? Aliquid exercitationem impedit ut excepturi quisquam explicabo
          illo itaque voluptates iusto velit enim eaque minima sed odio,
          necessitatibus accusantium nobis quo quaerat praesentium similique?
          Odio adipisci provident ullam corrupti impedit ratione pariatur hic
          commodi modi eius corporis unde velit aspernatur nesciunt cupiditate,
          vero cum neque harum? Rem, totam? Veniam doloremque molestias quia
          quasi aperiam illum omnis, id dicta nemo recusandae voluptate saepe
          obcaecati nulla quas dolores beatae similique aliquid explicabo
          corrupti labore. Impedit quo quibusdam voluptate laboriosam excepturi
          obcaecati voluptatibus, maxime ratione id? Et placeat eos dolores!
          Suscipit molestiae minus nobis assumenda pariatur omnis consectetur?
          Facilis, voluptatibus saepe! Dignissimos neque ducimus mollitia
          eligendi delectus tempora, voluptas sed earum odio iure soluta,
          temporibus ratione aliquam consequatur sapiente laborum iusto
          repudiandae labore enim aut voluptatem. Dolor provident similique
          perferendis doloremque odio explicabo laboriosam animi blanditiis
          aliquam quos, reiciendis delectus nostrum at mollitia neque id.
          Impedit amet non deleniti cumque assumenda reprehenderit iste,
          molestiae dolore.
        </p>
        <h3 className="text-base md:text-xl lg:text-2xl font-bold text-gray-900 my-2">
          Front-End Technologies
        </h3>
        {Array.isArray(project.frontEndTech) &&
          project.frontEndTech.map((tech, index) => (
            <div className="flex items-center gap-2 px-2" key={index}>
              <LuBadgeCheck />
              <span className="text-sm md:text-base lg:text-lg">{tech}</span>
            </div>
          ))}
        <h3 className="text-base md:text-xl lg:text-2xl font-bold text-gray-900 my-2">
          Back-End Technologies
        </h3>
        {Array.isArray(project.backEndTech) &&
          project.backEndTech.map((tech, index) => (
            <div className="flex items-center gap-2 px-2" key={index}>
              <LuBadgeCheck />
              <span className="text-sm md:text-base lg:text-lg">{tech}</span>
            </div>
          ))}
        <div className="my-4 flex gap-2 md:gap-5 flex-wrap">
          <a
            href={project.liveLink}
            className="btn btn-sm md:btn-md  btn-outline "
          >
            Live Site
          </a>
          <a
            href={project.frontEndRepo}
            className="btn btn-sm md:btn-md  btn-outline btn-primary"
          >
            Frontend Repo
          </a>
          <a
            href={project.backEndRepo}
            className="btn btn-sm md:btn-md  btn-outline btn-secondary"
          >
            Backend Repo
          </a>
        </div>
      </div>
    </div>
  );
}
