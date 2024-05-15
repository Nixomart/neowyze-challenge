import React from "react";

export default function Footer() {
  return (
    <footer className="grid grid-cols-3 text-white bg-black h-56 text-center  gap-5">
      <div>Challenger Neowyze</div>
      <div className="mx-auto">
        <img
          className="w-20"
          src="https://1000marcas.net/wp-content/uploads/2019/12/logo-StarWars.png"
          alt=""
        />
      </div>
      <div>Nicolas Martinez</div>
    </footer>
  );
}
