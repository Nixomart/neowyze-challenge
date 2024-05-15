import Loading from "@/app/components/Loading";
import Link from "next/link";
import React from "react";

export default function DataGridFilms({ films }: { films: Film[] }) {
  return films.length == 0 ? (
    <Loading />
  ) : (
    <section className="grid grid-cols-3 py-10 text-white bg-black gap-3 h-screen">
      {films.map((film: Film, index) => (
        <div
          className="rounded-sm flex flex-col bg-cover bg-center"
          style={{
            backgroundImage: `url('https://starwars-visualguide.com/assets/img/films/${
              index + 1
            }.jpg')`,
          }}
          key={index}
        >
          <p>{film.title}</p>
          <div className="mt-auto w-max">
            <Link
              href={{
                pathname: `/films/${index + 1}`,
                query: { search: film.url },
              }}
              key={index}
              className="text-gray-700"
            >
              <p className="text-white bg-slate-600">Ver mas</p>
            </Link>
          </div>
          <p>{film.director}</p>
        </div>
      ))}
    </section>
  );
}
