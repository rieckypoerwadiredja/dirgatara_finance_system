import React from "react";
import { Typography } from "@material-tailwind/react";

import GetAllBG from "../component/layouts/LC/GetAllBG";

interface CardComponentTypeOne {
  highlight: string;
  title: string;
  desc: string;
}
export function CardComponentTypeOne({
  highlight,
  title,
  desc,
}: CardComponentTypeOne) {
  return (
    <div className="border-r-[1px] border-gray-400 w-1/4 p-4">
      <Typography
        className="text-xl font-semibold text-ungu"
        variant="paragraph"
        placeholder=""
      >
        {highlight}
      </Typography>
      <Typography
        variant="paragraph"
        placeholder=""
        className="font-semibold text-sm"
      >
        {title}
      </Typography>
      <Typography
        variant="paragraph"
        placeholder=""
        className="text-gray-600 font-medium text-sm"
      >
        {desc}
      </Typography>
    </div>
  );
}
interface CardComponentTypeTwoProps {
  title: string;
  desc: string;
}
export function CardComponentTypeTwo({
  title,
  desc,
}: CardComponentTypeTwoProps) {
  return (
    <div className="border-r-[1px] border-gray-400 w-1/6 p-4">
      <Typography
        variant="paragraph"
        placeholder=""
        className="font-semibold text-sm"
      >
        {title}
      </Typography>
      <Typography
        variant="paragraph"
        placeholder=""
        className="text-gray-600 font-medium text-sm"
      >
        {desc}
      </Typography>
    </div>
  );
}
function Dashboard() {
  return (
    <>
      <GetAllBG />
    </>
  );
}

export default Dashboard;
