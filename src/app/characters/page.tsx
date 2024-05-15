"use client";
import { useCharacter } from "@/api/useCharacter";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import DataGridCharacters from "./components/DataGridCharacters";
import { FaCircle } from "react-icons/fa";
const eyesArray = [
  {name: "azul", element:           <FaCircle className="text-blue-500" />
}
]
export default function Page() {
  const { data, isFetched, refetch } = useCharacter(null, 1);
  const [dataGridCharacters, setDataGridCharacters] = useState<Array<Character>>([])
  const [currentEyesToFilter, setCurrentEyesToFilter] = useState<string>("")
  const handleFilter = (colorEye:string) =>{
    setCurrentEyesToFilter(colorEye)
  }
  const handleNextPage = () =>{
    if (data && data.next) {
      // Refetch los datos utilizando la URL de la siguiente página
      refetch();
      
    }
  }
 
  return isFetched == false ? (
    <Loading />
  ) : (
    <>
      <div>
        <p>Filtrar por color de ojos</p>
        {
          eyesArray.map((ele, index)=>(
            <button key={index} onClick={()=>handleFilter(ele.name)}>
            {ele.element}
            </button>
          ))
        }
      </div>
      <DataGridCharacters characters={data} />
      <div className="bg-green-500">
        <button
        onClick={handleNextPage}
        >Siguiente pagina</button>
      </div>
    </>
  
  );
}
