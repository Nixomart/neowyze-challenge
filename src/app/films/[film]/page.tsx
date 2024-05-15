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
  const { data, isFetched } = useFilms(search ?? undefined);
  useEffect(() => {
    setDataFilm(data);
  }, [data]);
  return isFetched == false ? (
    <div className="my-auto">
    <Loading />
    </div>
  ) : (
    <section className="min-h-screen bg-black text-white flex items-center justify-center ">
      <div className="max-w-md xl:max-w-full w-full xl:flex  shadow-lg">
        <img
          src={`https://starwars-visualguide.com/assets/img/films/${params.film}.jpg`}
          alt={dataFilm?.title}
          className="w-full xl:w-1/3 xl:object-cover rounded-lg"
        />
        <div className="mt-4 xl:w-full xl:mt-20 ">
          <h2 className="text-xl font-semibold text-center">{dataFilm?.title}</h2>
          <p className="xl:text-center">
            <strong>Director:</strong> {dataFilm?.director}
          </p>
          <p className="xl:text-center">
            <strong>Episode:</strong> {dataFilm?.episode_id}
          </p>
          <div className="mt-4 xl:max-h-44 xl:overflow-auto">
            <h3 className="text-lg font-semibold xl:text-center">Characters</h3>
            <ul className="mt-2 ">
              {dataFilm?.characters.map((character: Character, index) => (
                <div key={index} className="flex xl:justify-center ">
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
                    className="text-white "
                  >
                    {character.name}
                  </Link>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
