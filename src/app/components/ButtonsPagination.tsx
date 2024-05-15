import Link from "next/link";
import React from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
type Props = {
  data: any;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  refetch: any;
};
export const ButtonsPagination: React.FC<Props> = ({
  data,
  currentPage,
  setCurrentPage,
  refetch,
}) => {
  const handlePreviousPage = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    refetch();
  };
  return (
    <div className=" flex mx-10">
      {/* 
      
      <Link
        href={{ pathname: "/characters", query: { page: currentPage - 1 } }}
      >
        <button onClick={handlePreviousPage}>Previous</button>
      </Link>
      */}

      {data.previous !== null && (
        <button className="text-4xl border-2 border-yellow-200 px-3 py-2 rounded-2xl" onClick={handlePreviousPage}>Previous</button>
      )}

      {/* 
      {data.next !== null && (
        <Link
          href={{ pathname: "/characters", query: { page: currentPage + 1 } }}
        >
          <button onClick={handleNextPage}>Next</button>
        </Link>
      )} */}
      {data.next !== null && <button className="ml-auto text-4xl border-2 border-yellow-200 px-3 py-2 rounded-2xl" onClick={handleNextPage}>Next</button>}
    </div>
  );
};
