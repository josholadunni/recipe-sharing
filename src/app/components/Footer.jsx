import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <div className="flex justify-center py-10">
      <div className="flex flex-col justify-center w-full text-center pt-6 border-t-[1.5px] border-b-[#E4E4E7]">
        © Josh Oladunni
        <Link href="www.josholadunni.com">www.josholadunni.com</Link>
      </div>
    </div>
  );
}

export default Footer;
