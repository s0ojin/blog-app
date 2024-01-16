import { useEffect, useState } from "react";

export default function Carousel() {
  const [curImg, setCurImg] = useState(0);
  const moveStyle = {
    0: "translate-x-0",
    1: "translate-x-[-100vw]",
    2: "translate-x-[-200vw]",
    3: "translate-x-[-300vw]",
    4: "translate-x-[-400vw]",
    5: "translate-x-[-500vw]",
    6: "translate-x-[-600vw]",
    7: "translate-x-[-700vw]",
    8: "translate-x-[-800vw]",
    9: "translate-x-[-900vw]",
    10: "translate-x-[-1000vw]",
  };

  const imageList = [
    "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=3511&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1503424886307-b090341d25d1?q=80&w=3576&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1549558549-415fe4c37b60?q=80&w=3519&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurImg((prev) => {
        if (prev === imageList.length - 1) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[300px] bg-slate-300 overflow-hidden">
      <div className={`flex ${moveStyle[curImg]} transition`}>
        {imageList.map((image, idx) => (
          <img key={idx} src={image} className="object-fit" />
        ))}
      </div>
      <ul className="absolute bottom-4 flex w-full justify-center gap-4">
        {imageList.map((_, idx) => (
          <li
            key={idx}
            className={`h-[14px] w-[14px] rounded-full bg-white ${
              idx === curImg ? "opacity-100" : "opacity-60"
            }`}
            onClick={() => setCurImg(idx)}
          />
        ))}
      </ul>
    </div>
  );
}
