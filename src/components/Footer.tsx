/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="grid grid-cols-3 text-white bg-black h-max py-10 text-center  gap-5">
      <div>Challenge Neowyze</div>
      <div className="mx-auto">
      <Link href={"/"}>

        <img
          className="w-20"
          src="https://1000marcas.net/wp-content/uploads/2019/12/logo-StarWars.png"
          alt=""
          />
          </Link>
      </div>
      <div>Nicolas Martinez</div>
    </footer>
  );
}
