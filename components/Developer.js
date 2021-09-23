import { FiAlertCircle } from "react-icons/fi";
function Developer({ d }) {
  const [, name, company, socialMedia, description, workStatus] = d;
  let matches = socialMedia?.match(
    /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/
  );
  let image = matches ? matches[1] : "GoTurkiye_";
  let lookingForJobs = workStatus?.toUpperCase() === "EVET";
  return (
    <div className={`dev-card w-full ${lookingForJobs && "looking-for-jobs"}`}>
      <img
        className="w-1/2 rounded-full mx-auto"
        src={"https://unavatar.io/" + image}
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
