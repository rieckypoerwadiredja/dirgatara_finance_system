import React, { ReactNode } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";

interface CardDasProps {
  children: ReactNode;
  title: string;
  icon: ReactNode;
  column: boolean;
  classa: string | null;
}

const CardDas: React.FC<CardDasProps> = ({
  children,
  title,
  icon,
  column = false,
  classa,
}) => {
  return (
    <Card className={`w-full p-5 mt-10 ${classa}`} color="white" placeholder="">
      <div className="flex gap-x-2 items-center border-b-[1px] border-gray-400 pb-3">
        <div className="p-1 bg-ungu rounded-md">{icon}</div>
        <Typography variant="h2" placeholder="" className="text-xl text-black">
          {title}
        </Typography>
      </div>
      <CardBody className={`flex p-0 ${column && "flex-col"}`} placeholder="">
        {children}
      </CardBody>
    </Card>
  );
};

export default CardDas;
