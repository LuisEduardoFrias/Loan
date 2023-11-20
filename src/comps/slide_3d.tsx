"use client";

import { useEffect, useState } from "react";
import "../styles/slide_3d.css";
import LdDualRing from "./ld_dual_ring";
import Move from "./slide_3d_move.js";

export type Image = {
  src: string;
  alt?: string;
};

export interface ISlide3D {
  data: Image[] | null;
  handleClick: (image: Image) => void;
}

export default function Slide3D({ data, handleClick }: ISlide3D) {
  const [state, setState] = useState(data);

  useEffect(() => {
    if (state) Move("Slide3d-conten", "Slide3d-box");
  }, []);

  return (
    <div className='Slide3d-container'>
      <div className='Slide3d-conten'>
        <>
          {state ? (
            state?.slice(0, 4)?.map((image, i) => (
              <button
                key={i}
                className='Slide3d-box'
                onClick={() => handleClick(image)}
              >
                <img
                  src={image.src}
                  className='Slide3d-img'
                  alt={image.alt && "Image, slide"}
                />
              </button>
            ))
          ) : (
            <LdDualRing show={true} />
          )}
        </>
      </div>
    </div>
  );
}
