"use client";
import { useCharacter } from "@/api/useCharacter";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import DataGridCharacters from "./components/DataGridCharacters";
import { FaCircle } from "react-icons/fa";
const eyesArray = [
  { name: "blue", element: <FaCircle className="text-blue-500" /> },
  { name: "yellow", element: <FaCircle className="text-yellow-500" /> },
  { name: "red", element: <FaCircle className="text-red-500" /> },
  { name: "brown", element: <FaCircle className="text-amber-900" /> },
  { name: "blue-gray", element: <FaCircle className="text-gray-500" /> },
];
export default function Page() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isFetched, refetch, isRefetching } = useCharacter(null, currentPage);
  const [dataGridCharacters, setDataGridCharacters] = useState<
    Array<Character>
  >([]);
  const [currentEyesToFilter, setCurrentEyesToFilter] = useState<string>("");
  
  const handleFilterByEyesColor = (colorEye: string) => {
    setCurrentEyesToFilter(colorEye);
    refetch()
    setCurrentPage(1)
  };
  const handleFilterByGender = (colorEye: string) => {
    setCurrentEyesToFilter(colorEye);
    refetch()
    setCurrentPage(1)
  };
  useEffect(()=>{
    console.log("refeching");
    
  },[isRefetching])
  useEffect(()=>{
    console.log("USEE EFEFCT: ");
    
    if (isFetched) {
      if (currentEyesToFilter != "") {
        setDataGridCharacters(data.results.filter((character: Character)=> character.eye_color == currentEyesToFilter))

        console.log("a filtrar ", data.results.filter((character: Character)=> character.eye_color == currentEyesToFilter));
        
      }else{
        setDataGridCharacters(data.results)
      }
    }
  },[isRefetching])
  useEffect(()=>{
    if (isFetched) {
      console.log("PAGINA ACTUAL: ", currentPage);
      console.log("prevois: ", data.previous);
    }
    
  },[currentPage])
  const handlePreviousPage = () =>{
    setCurrentPage(currentPage - 1);
    refetch();
  }
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    refetch();
  };

  return isFetched == false && isRefetching == false ? (
    <Loading />
  ) : (
    <>
      <div>
        <p>Filtrar por color de ojos</p>
        {eyesArray.map((ele, index) => (
          <button key={index} onClick={() => handleFilterByEyesColor(ele.name)}>
            {ele.element}
          </button>
        ))}
      </div>
      <div>
        <p>Filtrar por color de ojos</p>
        {eyesArray.map((ele, index) => (
          <button key={index} onClick={() => handleFilterByGender(ele.name)}>
            {ele.element}
          </button>
        ))}
      </div>
      <DataGridCharacters currentPage={currentPage} characters={dataGridCharacters} />
      <div className="bg-green-500">
        <button disabled={data.previous === null || currentPage == 1} onClick={handlePreviousPage}>
          Pagina anterior
        </button>
        <button disabled={data.next === null } onClick={handleNextPage}>
          Siguiente pagina
        </button>
      </div>
    </>
  );
}
