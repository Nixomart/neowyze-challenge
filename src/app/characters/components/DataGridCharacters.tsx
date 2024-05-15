import Loading from "@/app/components/Loading";
import Link from "next/link";
import React from "react";
import { FaCircle } from "react-icons/fa";

export default function DataGridCharacters({
  characters,
  currentPage
}: {
  characters: Character[],
  currentPage: number;

}, ) {
  return characters.length == 0 ? (
    <Loading />
  ) : (
    <section className="grid grid-cols-3 my-10 gap-3 h-screen">
      
      {characters.map((character: Character, index) => (
        <div
          className="rounded-sm bg-cover flex flex-col bg-center"
          style={{
            backgroundImage: `url('https://starwars-visualguide.com/assets/img/characters/${
              (index + 1 )* currentPage
            }.jpg')`,
          }}
          key={index}
        >
          {
            character.name == "unknown" &&
          <p className="xl:text-4xl xl:text-center bg-slate-400">{character.name}</p>
          }
          <div className="mt-auto">

          <Link
            href={{
              pathname: `/characters/${index + 1}`,
              query: { search: character.url },
            }}
            key={index}
            className="text-gray-700 "
          >
            <p className="bg-gray-500 text-white xl:text-4xl">Ver mas</p>
          </Link>
          </div>
          {
            character.birth_year !== "unknown" &&
          <p>{character.birth_year}</p>
          }
        </div>
      ))}
    </section>
  );
}
