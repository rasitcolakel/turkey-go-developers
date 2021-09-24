import { FiAlertCircle } from "react-icons/fi";
function Developer({ d }) {
  const [, name, company, socialMedia, description, workStatus] = d;
 
  let twitterMatches = socialMedia?.match(
    /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/
  );
  let githubMatches = socialMedia?.match(
    /github\.com\/([a-zA-Z0-9_]+)/
  );
  let image = twitterMatches
    ? "https://unavatar.io/" + twitterMatches[1]
    : (githubMatches 
       ? "https://unavatar.io/github/" + githubMatches[1] 
       : "gopher-" + [1, 2, 3, 4, 5, 6, 7][Math.floor(Math.random() * 7)] + ".png");

  let lookingForJobs = workStatus?.toUpperCase() === "EVET";
  return (
    <div className={`dev-card w-full ${lookingForJobs && "looking-for-jobs"}`}>
      <img
        className="w-32 h-32 rounded-full mx-auto border-2 border-dashed border-go"
        src={image}
      />
      <h3 className="text-xl text-center py-2">{name}</h3>
      <p className="text-lg text-center py-2">{company}</p>
      <p className="text-sm text-center py-2 ">{description}</p>

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
  return data.map((d, key) => <Developer d={d} />);
}
