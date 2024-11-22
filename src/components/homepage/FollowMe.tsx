import GithubImage from "../../assets/github.png";
import LinkedinImage from "../../assets/linkedin.png";
import FacebookImage from "../../assets/facebook.png";

function FollowMe() {
  return (
    <div className="md:my-5">
      <h1 className="text-xl md:text-3xl font-bold font-Montserrat mb-5 text-center">
        Follow Me
      </h1>
      <div className="flex items-center justify-center gap-5 mt-12">
        <div className="flex  justify-center gap-5">
          <img
            src={GithubImage}
            alt="github-image"
            className="h-10 w-10 md:h-12 md:w-12 "
          />
          <img
            src={LinkedinImage}
            alt="linkedin-image"
            className="h-10 w-10 md:h-12 md:w-12 "
          />
          <img
            src={FacebookImage}
            alt="facebook-image"
            className="h-10 w-10 md:h-12 md:w-12"
          />
        </div>
      </div>
    </div>
  );
}

export default FollowMe;
