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
  useEffect(() => {
    const page = searchParams.get("page");
    const gender = searchParams.get("gender");
    const eyesColor = searchParams.get("eyes_color");
    
    if (page != null) {
      setCurrentPage(+page)
    }
  }, []);
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
  /*   useEffect(() => {
    if (isFetched) {
      console.log("PAGINA ACTUAL: ", currentPage);
      console.log("prevois: ", data.previous);
    }
  }, [currentPage]); */

  return isFetched == false && isRefetching == false ? (
    <Loading />
  ) : (
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
