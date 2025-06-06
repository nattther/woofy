import React from "react";
import type { DeliveryMethod } from "../type/checkout";

interface Props {
  productsTotal: number;
  data: { method: DeliveryMethod; shippingCost: number };
  onChange: (data: { method: DeliveryMethod; shippingCost: number }) => void;
  onNext: () => void;
  onPrev: () => void;
}

const radioBase =
  "appearance-none h-4 w-4 border-2 border-[#C1E1C1] rounded-full checked:bg-[#89CFF0] checked:border-[#89CFF0] focus:outline-none transition";
const labelBase = "flex items-center gap-3 cursor-pointer font-semibold text-[#4A4A4A]";
const Step2Delivery: React.FC<Props> = ({ productsTotal, data, onChange, onNext, onPrev }) => {
  const isFree = productsTotal >= 50;

  const handleSelect = (method: DeliveryMethod) => {
    onChange({
      method,
      shippingCost: method === "FREE" ? 0 : 4.99,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-[#4A4A4A]">Choisissez votre mode de livraison</h2>
      <div className="flex flex-col gap-3 mb-6">
        <label className={labelBase}>
          <input
            type="radio"
            className={radioBase}
            checked={data.method === "STANDARD"}
            onChange={() => handleSelect("STANDARD")}
            disabled={isFree}
          />
          Livraison standard <span className="text-[#89CFF0]">(4,99&nbsp;€)</span>
        </label>
        <label className={labelBase}>
          <input
            type="radio"
            className={radioBase}
            checked={data.method === "FREE"}
            onChange={() => handleSelect("FREE")}
            disabled={!isFree}
          />
          Livraison gratuite {isFree ? <span className="text-[#C1E1C1]">(+50€ d'achat)</span> : <span className="text-xs text-gray-400">(Dès 50€)</span>}
        </label>
      </div>
      <div className="mb-4 text-[#4A4A4A] font-medium">
        <b>Frais de livraison : </b>{data.shippingCost.toFixed(2)} €
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          className="border border-[#C1E1C1] text-[#4A4A4A] font-semibold rounded-lg py-2 px-5 bg-white hover:bg-[#C1E1C1]/40 transition"
          onClick={onPrev}
        >
          Retour
        </button>
        <button
          type="button"
          className="bg-[#89CFF0] text-white font-bold rounded-lg py-2 px-6 shadow hover:bg-[#77bfe0] transition"
          onClick={onNext}
        >
          Continuer
        </button>
      </div>
    </div>
  );
};

export default Step2Delivery;
