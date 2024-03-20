import React from "react";
import TableAllBG from "../component/layouts/LC/TableAllBG";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
function TableBG() {
  return (
    <div className="flex flex-col items-end gap-y-4">
      <Link to="/addBG">
        <Button
          className="flex items-center text-sm"
          placeholder=""
          color="orange"
        >
          <IoIosAddCircleOutline className="text-2xl mr-2" />
          Add BG
        </Button>
      </Link>
      <TableAllBG />
    </div>
  );
}

export default TableBG;
