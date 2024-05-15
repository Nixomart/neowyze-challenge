"use client";
import { useFilms } from "@/api/useFilms";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import Film from "./components/Film";
import Loading from "./components/Loading";
import DataGridFilms from "./films/components/DataGridFilms";
import DataGridCharacters from "./characters/components/DataGridCharacters";
import { useCharacter } from "@/api/useCharacter";
import Link from "next/link";
export default function Home() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const { data, isFetched } = useFilms(null);

  return isFetched == false ? (
    <Loading />
  ) : (
    <main className="h-auto  bg-black text-white">
      <section className="relative h-screen">
        <video
          autoPlay
          muted
          loop
          src="https://cdn.pixabay.com/video/2024/05/06/210859_tiny.mp4"
          className="absolute inset-0 w-full h-full object-cover"
        ></video>
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <div>
            <h1 className="text-4xl font-bold  mb-4">Bienvenidos a Swapi</h1>
            <p className="text-lg">
              Aca podrás ver las peliculas de la franquicia junto con sus
              personajes
            </p>
            <div className="space-x-10 mt-10">
              <Link href={"/films"} className="border-2 border-yellow-300 rounded-xl hover:bg-black hover:opacity-25 ease-in-out transition-all  px-3 py-2">
                Peliculas
              </Link>
              <Link href={"/characters"} className="border-2 border-yellow-300 rounded-xl hover:bg-black hover:opacity-25 ease-in-out transition-all px-3 py-2">
                Personajes
              </Link>
            </div>
          </div>
        </div>
      </section>
      <h2 className="text-4xl mt-5 mx-5">Capitulos</h2>
      <DataGridFilms films={data} />
    </main>
  );
}
