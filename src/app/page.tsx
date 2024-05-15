"use client";
import { useFilms } from "@/api/useFilms";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import Film from "./components/Film";
import Loading from "./components/Loading";
import DataGridFilms from "./films/components/DataGridFilms";
import DataGridCharacters from "./characters/components/DataGridCharacters";
import { useCharacter } from "@/api/useCharacter";
export default function Home() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const { data, isFetched } = useFilms(null);
 
  return isFetched == false  ?  (
    <Loading />
  ) : (
    <main className="h-auto bg-black">
      <DataGridFilms films={data} />
    </main>
  );
}
