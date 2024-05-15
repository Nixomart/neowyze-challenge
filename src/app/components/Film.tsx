import Link from "next/link";
import React from "react";

type Props = {};

export default function Film(film: Film, key: any) {
  return (
    <div
    style={{
      backgroundImage: `url('https://starwars-visualguide.com/assets/img/characters/${
        key + 1
      }.jpg')`,
    }}
      className=" mt rounded-lg relative  bg-cover bg-center "
    >
      <h1 className="text-center">{film.title}</h1>
      <h1 className="text-center">{film.director}</h1>
      <h1 className="text-center">{film.episode_id}</h1>
      {/* {film.characters.map((char: Character, index)=>(
      <p key={index}>{char.name}</p>
    ))} */}
      <div className="mx-auto w-max p-2 bg-gray-400 rounded-xl">
        <Link
          href={{
            pathname: `/films/${film.episode_id}`,
            query: { search: film.url },
          }}
        >
          <p>Ver mas..ss</p>
        </Link>
      </div>
    </div>
  );
}
