/* eslint-disable @next/next/no-img-element */
"use client"
import Link from "next/link";
import React, { useState } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

type Props = {
  setShowMenu: (value: boolean) => void;
};

export default function Header() {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  return (
    <header className="fixed top-0 w-full z-50 bg-black">
      {
        showMenu &&
      <Menu setShowMenu={setShowMenu} />
      }
      <nav className="flex">
        <img
          className="w-20"
          src="https://1000marcas.net/wp-content/uploads/2019/12/logo-StarWars.png"
          alt=""
        />
        <button onClick={()=>setShowMenu(true)} className="ml-auto text-white">
          <IoReorderThreeOutline className="text-3xl" />
        </button>
      </nav>
    </header>
  );
}
const Menu: React.FC<Props> =({setShowMenu})=> {
  return (
    <div className="backdrop-blur-md flex flex-col  bg-red-400 z-50 h-screen w-screen absolute top-0">

      <div className=" mr-10 mt-10 text-5xl absolute right-0 text-white">
        <button onClick={()=>setShowMenu(false)}>
        <RxCross1 />
        </button>
      </div>
      <div className="m-auto space-y-10 text-center text-5xl">
        <Link href="/characters">
        <h1>PERSONAJES</h1>
        </Link>
        <Link href={"/films"}>
        <h1>FILMS</h1>
        </Link>
      </div>
    </div>
  );
}
