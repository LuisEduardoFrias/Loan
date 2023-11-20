import "../styles/ld_dual_ring.css";

let defaultShadow1: string = "#7ab1ff",
  defaultShadow2: string = "#7ab1ff",
  defusltBorderColor: string = "blue";

export default function LdDualRing({
  show,
  shadow1,
  shadow2,
  borderColor,
}: {
  show: boolean;
  shadow1?: string;
  shadow2?: string;
  borderColor?: string;
}) {
  const LdStyles = {
    boxShadow: `0 0 2px 1px ${shadow1 ?? defaultShadow1} inset, 0 0 2px 1px ${shadow2 ?? defaultShadow2}`,
    borderColor: `${borderColor ?? defusltBorderColor} transparent`,
  };

  return (
    <>
      {show && (
        <div className='modal-loading'>
          <div style={LdStyles} className='ldDualRing'></div>
        </div>
      )}
    </>
  );
}

export function useColorLoading(
  shadow1: string,
  shadow2: string,
  borderColor: string,
) {
  defaultShadow1 = shadow1;
  defaultShadow2 = shadow2;
  defusltBorderColor = borderColor;
}
