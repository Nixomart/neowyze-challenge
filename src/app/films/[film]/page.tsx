/* eslint-disable @next/next/no-img-element */
"use client";
import { useCharacter } from "@/api/useCharacter";
import { useFilms } from "@/api/useFilms";
import Loading from "@/app/components/Loading";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page({ params }: any) {
  const [dataFilm, setDataFilm] = useState<Film | null>(null);

  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const { data } = useFilms(search ?? undefined);
  console.log("PARAMETROS FILM: ", params.film);

  useEffect(() => {
    setDataFilm(data);
  }, [data]);
  return dataFilm == null ? (
    <Loading />
  ) : (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <img
          src={`https://starwars-visualguide.com/assets/img/films/${params.film}.jpg`}
          alt={dataFilm.title}
          className="w-full rounded-lg"
        />
        <div className="mt-4">
          <h2 className="text-xl font-semibold">{dataFilm.title}</h2>
          <p>
            <strong>Director:</strong> {dataFilm.director}
          </p>
          <p>
            <strong>Episode:</strong> {dataFilm.episode_id}
          </p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Characters</h3>
            <ul className="mt-2">
              {dataFilm.characters.map((character: Character, index) => (
                <div key={index} className="flex">
                  <img
                    className="rounded-full w-5"
                    src={`https://starwars-visualguide.com/assets/img/characters/${index + 1}.jpg`}
                    alt=""
                  />
                  <Link
                    href={{
                      pathname: `/characters/${index + 1}`,
                      query: { search: character.url },
                    }}
                    key={index}
                    className="text-gray-700"
                  >
                    {character.name}
                  </Link>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
