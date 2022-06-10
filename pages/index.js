import axios from "axios";
import React from "react";
import Head from "next/head";
import Pagination from "../components/Pagination";
import Developer from "../components/Developer";
import Switch from "../components/Switch";

export async function getServerSideProps({ req }) {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const baseUrl = req ? `${protocol}://${req.headers.host}` : "";
  let response = await axios.get(`${baseUrl}/api/developers`);
  return { props: { data: response.data } };
}

export default function Post({ data }) {
  const [developers, setDevelopers] = React.useState(data);
  const [page, setPage] = React.useState(0);
  const [lookingForJobs, setLookingForJobs] = React.useState(false);
  React.useEffect(() => {
    setPage(0);
    if (!lookingForJobs) setDevelopers([...data]);
    else setDevelopers([...data.filter((d) => d[5]?.toUpperCase() === "EVET")]);
  }, [lookingForJobs]);
  return (
    <div className="dev-container">
      <Head>
        <title>Türkiye Go Dili Geliştirici Listesi</title>
      </Head>
      <h1 className="text-xl lg:text-3xl py-4">
        Türkiye Go Dili Geliştirici Listesi
      </h1>
      <div className="flex items-center flex-col">
        <h1 className="text-lg lg:text-2xl py-2 text-gray-500">
          Sensiz şu anda{" "}
          <span className="text-go font-bold">{data.length}</span> kişiyiz.
        </h1>
        <h1 className="text-lg lg:text-2xl py-2 mb-3 text-gray-500">
          Aramıza,{" "}
          <a
            href="https://docs.google.com/spreadsheets/d/1loR_i7d4NvUYvRv9SwCL-FsmV9c2OgefGGJamejCcUs/edit?usp=sharing"
            className={"border-dashed border-b-2 border-go text-go pb-1"}
            target={"_blank"}
          >
            buraya
          </a>{" "}
          tıklayarak katılabilirsin :)
        </h1>
        <button></button>
      </div>
      {/* <div>
        <Switch
          checked={lookingForJobs}
          setChecked={setLookingForJobs}
          title={"Sadece İş arayanlar"}
        />
      </div> */}
      <div className="dev-grid">
        <Developer
          data={
            developers &&
            developers.slice(0 + page * 12 * 300, (page + 1) * 12 * 300)
          }
        />
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        maxPage={Math.ceil(developers.length / 12)}
      />
    </div>
  );
}
