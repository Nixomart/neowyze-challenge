/* eslint-disable @next/next/no-img-element */
"use client";
import { useCharacter } from "@/api/useCharacter";
import Loading from "@/app/components/Loading";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page({params}:any) {
  const [dataFilm, setDataFilm] = useState<Character | null>(null);
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const { data } = useCharacter(search ?? undefined, null);
  useEffect(() => {
    setDataFilm(data);
  }, [data]);
  return dataFilm == null ? (
    <Loading />
  ) : (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-900 p-8 rounded-lg shadow-lg">
        <img
          src={`https://starwars-visualguide.com/assets/img/characters/${params.character}.jpg`}
          alt={dataFilm.name}
          className="w-full rounded-lg mb-4"
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold">{dataFilm.name == "n/a"  || dataFilm.name == "unknown" ? "":  dataFilm.name}</h2>
            <p><strong>Eye color:</strong> {dataFilm.eye_color == "n/a"  || dataFilm.eye_color == "unknown" ? "":  dataFilm.eye_color}</p>
            <p><strong>Birth year:</strong> {dataFilm.birth_year == "n/a"  || dataFilm.birth_year == "unknown" ? "":  dataFilm.birth_year}</p>
          </div>
          <div>
            <p><strong>Hair color:</strong> {dataFilm.hair_color == "n/a"  || dataFilm.hair_color == "unknown" ? "":  dataFilm.hair_color}</p>
            <p><strong>Skin color:</strong> {dataFilm.skin_color == "n/a"  || dataFilm.skin_color == "unknown" ? "":  dataFilm.skin_color}</p>
            <p><strong>Mass:</strong> {dataFilm.mass == "n/a"  || dataFilm.mass == "unknown" ? "":  dataFilm.mass}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
