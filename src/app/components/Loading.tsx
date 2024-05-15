import React from "react";
import { ImSpinner8 } from "react-icons/im";

export default function Loading() {
  return (
    <div >
      <ImSpinner8 className="text-xl animate-spin" />
    </div>
  );
}
