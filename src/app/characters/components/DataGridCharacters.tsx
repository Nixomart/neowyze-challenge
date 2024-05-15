import Loading from "@/app/components/Loading";
import Link from "next/link";
import React from "react";
import { FaCircle } from "react-icons/fa";

export default function DataGridCharacters({
  characters,
  currentPage,
}: {
  characters: Character[];
  currentPage: number;
}) {
  return characters.length == 0 ? (
    <Loading />
  ) : (
    <div className="grid  grid-cols-3 my-10 gap-3  ">
      {characters.map((character: Character, index) => (
        <div
          className="rounded-sm relative xl:h-96 bg-cover flex flex-col bg-center"
          style={{
            backgroundImage: `url('https://starwars-visualguide.com/assets/img/characters/${
              (index + 1) * currentPage
            }.jpg')`,
          }}
          key={index}
        >
          {character.name == "unknown" && (
            <p className="xl:text-4xl xl:text-center bg-slate-400">
              {character.name}
            </p>
          )}
          <div className="absolute rounded-xl opacity-0 hover:opacity-100 group-hover:bg-black/50 top-0 h-full text-center w-full  transition-all duration-300 ">
            <div className="texto_image absolute bottom-1/2 top-2/4  z-30 w-full h-40 flex flex-row text-center xl:px-10 px-3 justify-between items-center  transition-all duration-200 bg-black/50">
              <div className="group-hover:pr-20  w-full  transition-all duration-300">
                <h3 className="xl:text-3xl text-xl mb-4 italic">
                  {character.name}
                </h3>
                <h2 className="xl:text-2xl text-lg font-thin">
                  {character.birth_year !== "unknown" && (
                    <p>{character.birth_year}</p>
                  )}
                </h2>
                <Link
                  href={{
                    pathname: `/characters/${index + 1}`,
                    query: { search: character.url },
                  }}
                  key={index}
                  className=""
                >
                  <p className="hover:underline">Ver mas</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
