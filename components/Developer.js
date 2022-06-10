import {
  FiAlertCircle,
  FiGithub,
  FiLink,
  FiMail,
  FiTwitter,
} from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import { SiMedium } from "react-icons/si";
import ReactMarkdown from "react-markdown";
function Developer({ d }) {
  const { name, company, socialMedia, description, workStatus, connections } =
    d;
  let twitterMatches = connections.find((c) =>
    c?.match(/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/)
  );
  let githubMatches = connections.find((c) =>
    c?.match(/github\.com\/([a-zA-Z0-9_]+)/)
  );

  let image = twitterMatches
    ? "https://unavatar.io/" + twitterMatches?.split(".com/")[1]
    : githubMatches
    ? "https://unavatar.io/github/" + githubMatches?.split(".com/")[1]
    : "gopher-" + [1, 2, 3, 4, 5, 6, 7][Math.floor(Math.random() * 7)] + ".png";

  let lookingForJobs = workStatus?.toUpperCase() === "EVET";
  return (
    <div
      className={`dev-card w-full ${
        lookingForJobs && "looking-for-jobs"
      } flex items-center flex-col content-between grid`}
    >
      <img
        className="w-32 h-32 rounded-full mx-auto border-2 border-dashed border-go"
        src={image}
      />
      <h3 className="text-xl text-center py-2">{name}</h3>
      <p className="text-lg text-center py-2">{company}</p>
      <ReactMarkdown>{description}</ReactMarkdown>
      <div className="flex items-center justify-center text-2xl text-center py-2 text-go gap-4 mt-4 justify-flex-end ">
        {connections &&
          connections.map((connection) => {
            if (
              connection.match(
                /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
              )
            ) {
              return (
                <a href={`mailto:${connection}`} target={"_blank"}>
                  <FiMail />
                </a>
              );
            } else {
              if (connection.includes("twitter.com")) {
                return (
                  <a href={connection} target={"_blank"}>
                    <FiTwitter />
                  </a>
                );
              } else if (connection.includes("github.com")) {
                return (
                  <a href={connection} target={"_blank"}>
                    <FiGithub />
                  </a>
                );
              } else if (connection.includes("medium.com")) {
                return (
                  <a href={connection} target={"_blank"}>
                    <SiMedium />
                  </a>
                );
              } else if (connection.includes("linkedin.com")) {
                return (
                  <a href={connection} target={"_blank"}>
                    <FaLinkedin />
                  </a>
                );
              } else {
                return (
                  <a href={connection} target={"_blank"}>
                    <FiLink />
                  </a>
                );
              }
            }
          })}
      </div>

      {lookingForJobs && (
        <div className="flex items-center justify-center text-xl text-center py-2 text-go">
          <FiAlertCircle className="text-go mx-2 text-4xl" />{" "}
          <span>İş Arıyor</span>
        </div>
      )}
    </div>
  );
}

export default function RenderDevelopers({ data }) {
  return data.map((d, key) => <Developer d={d} key={key} />);
}
