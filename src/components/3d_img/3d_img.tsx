"use client";

import "./3d_img.css";
import Plate from "m/plate";
import Move from "./move.js";
import { useEffect, useState } from "react";
import LdDualRing from "cp/id_dual_ring/id_dual_ring";

interface ID3ImgProps {
  data: Plate[] | null;
  handleClick: (plate: Plate) => void;
}

export default function D3Img({ data, handleClick }: ID3ImgProps) {
  const [state, setState] = useState(data);

  useEffect(() => {
    if (state) Move("D3img-conten", "D3img-box");
  }, []);

  return (
    <div className='D3img-container'>
      <div className='D3img-conten'>
        <>
          {state ? (
            state?.slice(0, 4)?.map((plate, i) => (
              <botton
                key={i}
                className='D3img-box'
                onClick={() => handleClick(plate)}
              >
                <img
                  src={plate.img}
                  className='D3img-img'
                  alt='Image, plate more orderly'
                />
              </botton>
            ))
          ) : (
            <LdDualRing show={true} />
          )}
        </>
      </div>
    </div>
  );
}
