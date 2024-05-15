import { getNamedRouteRegex } from "next/dist/shared/lib/router/utils/route-regex";
import Link from "next/link";
import React from "react";
import { FaCircle } from "react-icons/fa";

type Props = {
  setCurrentEyesToFilter: (value: string) => void;
  setCurrentGenderToFilter: (value: string | null) => void;
  setCurrentPage: (value: number) => void;
  refetch: any;
};
const eyesArray = [
  { name: "blue", element: <FaCircle className="text-blue-500 text-4xl" /> },
  {
    name: "yellow",
    element: <FaCircle className="text-yellow-500 text-4xl " />,
  },
  { name: "red", element: <FaCircle className="text-red-500 text-4xl" /> },
  { name: "brown", element: <FaCircle className="text-amber-900 text-4xl" /> },
  {
    name: "blue-gray",
    element: <FaCircle className="text-gray-500 text-4xl " />,
  },
];
export const Filter: React.FC<Props> = ({
  setCurrentEyesToFilter,
  setCurrentGenderToFilter,
  setCurrentPage,
  refetch,
}) => {
  const handleFilterByEyesColor = (colorEye: string) => {
    setCurrentEyesToFilter(colorEye);
    setCurrentGenderToFilter(null);
    refetch();
    setCurrentPage(1);
  };
  const handleFilterByGender = (colorEye: string) => {
    setCurrentGenderToFilter(colorEye);
    refetch();
    setCurrentEyesToFilter("");
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col space-y-5">
      <div className="mx-auto space-y-5">
        <p className="text-center">Filtrar por color de ojos</p>
        <div className="space-x-5">
          {eyesArray.map((ele, index) => (
           /*  <Link
              key={index}
              href={{
                pathname: "/characters",
                query: { eyes_color: ele.name },
              }}
            > */
              <button key={index} onClick={() => handleFilterByEyesColor(ele.name)}>
                {ele.element}
              </button>
           /*  </Link> */
          ))}
        </div>
      </div>
      <div className="mx-auto space-y-5">
        <p className="text-center ">Filtrar por genero</p>
        <div className="space-x-5  text-yellow-200">
         {/*  <Link
            href={{
              pathname: "/characters",
              query: { gender: "male" },
            }}
          > */}
            <button
              className=" py-2 px-3 border-2  rounded-xl border-yellow-200"
              onClick={() => handleFilterByGender("male")}
            >
              Masculino
            </button>
        {/*   </Link>
          <Link
            href={{
              pathname: "/characters",
              query: { gender: "female" },
            }}
          > */}
            <button
              className=" py-2 px-3 border-2  rounded-xl border-yellow-200"
              onClick={() => handleFilterByGender("female")}
            >
              Femenino
            </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};
