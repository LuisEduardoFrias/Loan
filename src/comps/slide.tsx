import "../styles/slide.css";
import LdDualRing from "./ld_dual_ring";
import Link from "next/link";

export interface ISlide {
  img: string;
  url: string;
}

export default function Slide({ imageData }: { imageData: ISlide[] }) {
  return (
    <div className='container-slide'>
      {imageData ? (
        imageData.map((e, i) => (
          <Link key={i} href={e.url} className={"link-img"}>
            <img src={e.img} />
          </Link>
        ))
      ) : (
        <LdDualRing show={true} />
      )}
    </div>
  );
}
