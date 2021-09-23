import axios from "axios";
import React from "react";
import Head from "next/head";
export async function getServerSideProps({ req }) {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const baseUrl = req ? `${protocol}://${req.headers.host}` : "";
  let response = await axios.get(`${baseUrl}/api/developers`);
  return { props: { data: response.data } };
}

import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { FiAlertCircle } from "react-icons/fi";
export default function Post({ data }) {
  const [page, setPage] = React.useState(0);
  return (
    <div className="dev-container">
      <Head>
        <title>Türkiye Go Dili Geliştirici Listesi</title>
      </Head>
      <h1 className="text-3xl py-4">Türkiye Go Dili Geliştirici Listesi</h1>
      <div>
        <h1 className="text-2xl py-3 text-gray-500">
          Sensiz şu anda {data.length} kişiyiz. Aramıza,{" "}
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

      <div className="dev-grid">
        <RenderDevelopers data={data.slice(0 + page * 12, (page + 1) * 12)} />
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        maxPage={Math.ceil(data.length / 12)}
      />
    </div>
  );
}

function RenderDevelopers({ data }) {
  return data.map((d, key) => <Developer d={d} />);
}

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

function Pagination({ page, setPage, maxPage }) {
  return (
    <div className="flex items-center pt-2">
      <button
        disabled={page === 0}
        type="button"
        className="pagination-button"
        onClick={() => setPage(page - 1)}
      >
        <HiOutlineChevronLeft />
      </button>
      <button
        type="button"
        className="pagination-button"
        onClick={() => setPage(page + 1)}
        disabled={page === maxPage - 1}
      >
        <HiOutlineChevronRight />
      </button>
    </div>
  );
}
