import "/slide.css";
import LdDualRing from "cp/id_dual_ring/id_dual_ring";

interface ISlideProps {
  img: string;
  ulr: string;
}

export default function Slide({ imageData }: ISlideProps) {
  return (
    <div className='container-slide'>
      {imageData
        ? imageData.map((e, i) => (
            <Link key={i} href={e.url} className={"link-img"}>
              <img src={e.img} />
            </Link>
          ))
        : <LdDualRing error={false} />}
    </div>
  );
}
