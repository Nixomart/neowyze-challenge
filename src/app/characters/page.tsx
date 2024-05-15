"use client";
import { useCharacter } from "@/api/useCharacter";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import DataGridCharacters from "./components/DataGridCharacters";
import { FaCircle } from "react-icons/fa";
const eyesArray = [
  { name: "blue", element: <FaCircle className="text-blue-500 text-4xl"  /> },
  { name: "yellow", element: <FaCircle className="text-yellow-500 text-4xl " /> },
  { name: "red", element: <FaCircle className="text-red-500 text-4xl"  /> },
  { name: "brown", element: <FaCircle className="text-amber-900 text-4xl"  /> },
  { name: "blue-gray", element: <FaCircle className="text-gray-500 text-4xl " /> },
];
export default function Page() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isFetched, refetch, isRefetching } = useCharacter(
    null,
    currentPage
  );
  const [dataGridCharacters, setDataGridCharacters] = useState<
    Array<Character>
  >([]);
  const [currentEyesToFilter, setCurrentEyesToFilter] = useState<string>("");
  const [currentGenderToFilter, setCurrentGenderToFilter] = useState<
    null | string
  >(null);

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
  useEffect(() => {
    console.log("refeching");
  }, [isRefetching]);
  useEffect(() => {
    if (isFetched) {
      if (currentEyesToFilter != "") {
        setDataGridCharacters(
          data.results.filter(
            (character: Character) => character.eye_color == currentEyesToFilter
          )
        );
      } else if (currentGenderToFilter != null) {
        setDataGridCharacters(
          data.results.filter(
            (character: Character) => character.gender == currentGenderToFilter
          )
        );
      } else {
        setDataGridCharacters(data.results);
      }
    }
  }, [isRefetching]);
  useEffect(() => {
    if (isFetched) {
      console.log("PAGINA ACTUAL: ", currentPage);
      console.log("prevois: ", data.previous);
    }
  }, [currentPage]);
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    refetch();
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    refetch();
  };

  return isFetched == false && isRefetching == false ? (
    <Loading />
  ) : (
    <>
      <section className="py-10 bg-black text-white">
        <div className="flex flex-col space-y-5">
          <div className="mx-auto space-y-5">
            <p className="text-center">Filtrar por color de ojos</p>
            <div className="space-x-5">
              {eyesArray.map((ele, index) => (
                <button
                  key={index}
                  onClick={() => handleFilterByEyesColor(ele.name)}
                >
                  {ele.element}
                </button>
              ))}
            </div>
          </div>
          <div className="mx-auto space-y-5">
            <p className="text-center ">Filtrar por genero</p>
            <div className="space-x-5  text-yellow-200">
              <button
                className=" py-2 px-3 border-2  rounded-xl border-yellow-200"
                onClick={() => handleFilterByGender("male")}
              >
                Masculino
              </button>
              <button 
              className=" py-2 px-3 border-2  rounded-xl border-yellow-200"
              onClick={() => handleFilterByGender("female")}>
                Femenino
              </button>
            </div>
          </div>
        </div>

        <DataGridCharacters
          currentPage={currentPage}
          characters={dataGridCharacters}
        />
        <div className="bg-green-500">
          <button
            disabled={data.previous === null || currentPage == 1}
            onClick={handlePreviousPage}
          >
            Pagina anterior
          </button>
          <button disabled={data.next === null} onClick={handleNextPage}>
            Siguiente pagina
          </button>
        </div>
      </section>
    </>
  );
}
