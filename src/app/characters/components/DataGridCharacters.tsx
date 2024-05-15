import Loading from "@/app/components/Loading";
import Link from "next/link";
import React from "react";
import { FaCircle } from "react-icons/fa";

export default function DataGridCharacters({
  characters,
}: {
  characters: Character[];
}) {
  return characters.length == 0 ? (
    <Loading />
  ) : (
    <section className="grid grid-cols-3 my-10 gap-3 h-screen">
      
      {characters.map((character: Character, index) => (
        <div
          className="rounded-sm bg-cover bg-center"
          style={{
            backgroundImage: `url('https://starwars-visualguide.com/assets/img/characters/${
              index + 1
            }.jpg')`,
          }}
          key={index}
        >
          <p>{character.name}</p>
          <Link
            href={{
              pathname: `/characters/${index + 1}`,
              query: { search: character.url },
            }}
            key={index}
            className="text-gray-700"
          >
            <p>Ver mas</p>
          </Link>
          <p>{character.birth_year}</p>
        </div>
      ))}
    </section>
  );
}
