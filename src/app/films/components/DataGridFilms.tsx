import Loading from "@/app/components/Loading";
import Link from "next/link";
import React from "react";

export default function DataGridFilms({
  films,
}: {
  films: Film[];
}) {

  return films.length == 0 ? (
    <Loading />
  ) : (
    <section className="grid grid-cols-3 my-10 gap-3 h-screen">
      {films.map((film: Film, index) => (
        <div
          className="rounded-sm bg-cover bg-center"
          style={{
            backgroundImage: `url('https://starwars-visualguide.com/assets/img/films/${
              index + 1
            }.jpg')`,
          }}
          key={index}
        >
          <p>{film.title}</p>
          <Link
            href={{
              pathname: `/films/${index +1}`,
              query: { search: film.url },
            }}
            key={index}
            className="text-gray-700"
          >
            <p>Ver mas</p>
          </Link>
          <p>{film.director}</p>
        </div>
      ))}
    </section>
  );
}
