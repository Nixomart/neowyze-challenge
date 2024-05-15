"use client";
import { useCharacter } from "@/api/useCharacter";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import DataGridCharacters from "./components/DataGridCharacters";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaCircle,
} from "react-icons/fa";
import { Filter } from "../components/Filter";
import { ButtonsPagination } from "../components/ButtonsPagination";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const searchParams = useSearchParams();

  const { data, isFetched, refetch, isRefetching,  } = useCharacter(
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

  useEffect(() => {
    if (isFetched) {
     /*  const page = searchParams.get("page")
      const pageNumber = page ? +page : 1; // Si page es null, establece el número de página en 1

      console.log("PAGE: ", pageNumber);
      console.log("Is page null?: ", page === null);
      
      if (page !== null) {
        setCurrentPage(pageNumber)  
        refetch()
      } */
      setDataGridCharacters(data.results)
    }
  }, [isFetched]);
  useEffect(() => {
    console.log("IS REFETECHING", isRefetching);
    
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
  /*   useEffect(() => {
    if (isFetched) {
      console.log("PAGINA ACTUAL: ", currentPage);
      console.log("prevois: ", data.previous);
    }
  }, [currentPage]); */

  return isFetched == false && isRefetching == false ? (
    <Loading />
  ) : !data.hasOwnProperty("results") ? <p>No hay datos</p>:  (
    <>
      <section className="py-10 bg-black text-white">
        <Filter
          setCurrentEyesToFilter={setCurrentEyesToFilter}
          setCurrentGenderToFilter={setCurrentGenderToFilter}
          setCurrentPage={setCurrentPage}
          refetch={refetch}
        />

        <DataGridCharacters
          currentPage={currentPage}
          characters={dataGridCharacters}
        />
        <ButtonsPagination
          data={data}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          refetch={refetch}
        />
      </section>
    </>
  );
}
