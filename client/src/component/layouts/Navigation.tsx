import React from "react";
import { Navbar, Typography } from "@material-tailwind/react";
import { getFormattedDate } from "../../utils/GetFormatDate";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { AiOutlineBank } from "react-icons/ai";
// Image
import logo_img from "../../assets/dirgantara_indonesia_logo.png";

function Navigation() {
  const navLinkCssClasses = ({ isActive }: any): string =>
    `text-sm items-center flex font-medium text-gray-700 duration-300 hover:text-blue-500 !h-full w-fit border-b-4 border-transparent hover:border-blue-500 !order-spacing-5 pb-0 mb-0 ${
      isActive ? "text-blue-500 border-blue-500" : ""
    }`;

  return (
    <>
      <Navbar
        placeholder=""
        className="shadow-none border-gray-200 border-b-2 h-20 overflow-hidden flex justify-between items-center sticky top-0 z-10 max-w-full rounded-none px-14 py-4"
      >
        <img className="!object-contain h-full" src={logo_img} alt="" />
        <Typography
          placeholder=""
          variant="paragraph"
          className="text-gray-600 font-medium h-fit"
        >
          Date Now: <span className="font-semibold">{getFormattedDate()}</span>
        </Typography>
      </Navbar>
      <Navbar
        placeholder=""
        className="border-b-2 shadow-sm border-gray-200 h-10 w-full overflow-hidden flex gap-x-6 pb-0 mb-0 items-start sticky top-20 z-10 max-w-full rounded-none px-14"
      >
        <NavLink className={navLinkCssClasses} to="/">
          <MdDashboard className="text-xl mr-2" />
          Dashboard
        </NavLink>
        <NavLink className={navLinkCssClasses} to="/admin">
          <GoPeople className="text-xl mr-2" />
          People
        </NavLink>
        <NavLink className={navLinkCssClasses} to="/BGs">
          <AiOutlineBank className="text-xl mr-2" />
          Bank Garansi
        </NavLink>
      </Navbar>
    </>
  );
}

export default Navigation;
