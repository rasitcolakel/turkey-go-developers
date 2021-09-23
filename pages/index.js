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
export default function Post({ data }) {
  const [page, setPage] = React.useState(0);
  return (
    <div className="dev-container">
      <Head>
        <title>Türkiye Go Dili Geliştirici Listesi</title>
      </Head>
      <h1 className="text-2xl py-4">Türkiye Go Dili Geliştirici Listesi</h1>
      <div className="dev-grid">
        <RenderDevelopers data={data.slice(0 + page * 12, (page + 1) * 12)} />
      </div>
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}

function RenderDevelopers({ data }) {
  return data.map((d, key) => <Developer d={d} />);
}

function Developer({ d }) {
  const [, name, company, socialMedia] = d;

  let matches = socialMedia?.match(
    /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/
  );
  let image = matches ? matches[1] : "GoTurkiye_";
  console.log("123", image);
  return (
    <div className="dev-card w-full">
      <img
        className="w-1/2 rounded-full mx-auto"
        src={"https://unavatar.io/" + image}
      />
      <h3 className="text-xl text-center py-2">{name}</h3>
      <p className="text-lg text-center py-2">{company}</p>
    </div>
  );
}

function Pagination({ page, setPage }) {
  return (
    <div className="flex items-center pt-2">
      <button
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
      >
        <HiOutlineChevronRight />
      </button>
    </div>
  );
}
