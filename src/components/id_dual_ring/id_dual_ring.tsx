import "./id_dual_ring.css";

export default function LdDualRing({ show }: boolean) {
  return (
    <>
      {show && (
        <div className='modal-loading'>
          <div className='ldDualRing'></div>
        </div>
      )}
    </>
  );
}
