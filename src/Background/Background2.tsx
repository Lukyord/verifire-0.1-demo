import React from "react";

export default function Background2() {
  return (
    <div className="-z-10 fixed top-0 left-0 w-full h-full overflow-y-hidden overflow-x-hidden">
      <div className="bg-white h-2/5"></div>
      <div className="bg-gradient-to-b from-white to-purple-200 h-1/5"></div>
      <div className="bg-gradient-to-b from-purple-200 to-purple-400  h-2/5"></div>
    </div>
  );
}
