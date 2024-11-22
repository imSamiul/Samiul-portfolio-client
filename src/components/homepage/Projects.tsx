import keeper from "../../assets/keeper.png";
import ProjectPay from "../../assets/project-pay.png";
import BariVara from "../../assets/bari-vara.png";

function Projects() {
  return (
    <div className="my-5 md:my-10">
      <h1 className="text-xl md:text-3xl font-bold font-Montserrat mb-5">
        Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="card card-compact bg-base-100  shadow-xl">
          <figure>
            <img src={keeper} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Keeper</h2>
            <p>It is a to-do list full stack website</p>
            <div className="card-actions justify-end mt-5">
              <button className="btn btn-primary">Live Site</button>
              <button className="btn btn-primary">Learn More</button>
            </div>
          </div>
        </div>
        <div className="card card-compact bg-base-100  shadow-xl">
          <figure>
            <img src={ProjectPay} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Project Pay</h2>
            <p>
              A website to manage project, its budget between client and project
              manager.
            </p>
            <div className="card-actions justify-end mt-5">
              <button className="btn btn-primary">Live Site</button>
              <button className="btn btn-primary">Learn More</button>
            </div>
          </div>
        </div>
        <div className="card card-compact bg-base-100  shadow-xl">
          <figure>
            <img src={BariVara} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Bari-Vara</h2>
            <p>A house rental management website</p>
            <div className="card-actions justify-end mt-5">
              <button className="btn btn-primary">Live Site</button>
              <button className="btn btn-primary">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
