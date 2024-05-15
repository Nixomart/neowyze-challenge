import Loading from "@/app/components/Loading";
import Link from "next/link";
import React from "react";

export default function DataGridFilms({ films }: { films: Film[] }) {
  return films.length == 0 ? (
    <Loading />
  ) : (
    <section className="grid px-5 grid-cols-3 py-20  text-white bg-black gap-3 ">
      {films.map((film: Film, index) => (
        <div
          className="rounded-sm relative flex flex-col bg-cover bg-top h-96"
          style={{
            backgroundImage: `url('https://starwars-visualguide.com/assets/img/films/${
              index + 1
            }.jpg')`,
          }}
          key={index}
        >
          <div className="absolute rounded-xl opacity-0 hover:opacity-100 group-hover:bg-black/50 top-0 h-full text-center w-full  transition-all duration-300 ">
            <div className="texto_image absolute bottom-1/2 top-2/4  z-30 w-full h-40 flex flex-row text-center xl:px-10 px-3 justify-between items-center  transition-all duration-200 bg-black/50">
              <div className="group-hover:pr-20  w-full  transition-all duration-300">
                <h3 className="xl:text-3xl text-xl mb-4 italic">
                  {film.title}
                </h3>
                <h2 className="xl:text-2xl text-lg font-thin">
                  {film.director}
                </h2>
                <Link
                  href={{
                    pathname: `/films/${index + 1}`,
                    query: { search: film.url },
                  }}
                  key={index}
                  className="text-gray-700"
                >
                  <p className="text-white hover:underline">Ver mas</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
