import React from "react";
import type { DeliveryMethod } from "../type/checkout";

interface Props {
  productsTotal: number;
  data: { method: DeliveryMethod; shippingCost: number };
  onChange: (data: { method: DeliveryMethod; shippingCost: number }) => void;
  onNext: () => void;
  onPrev: () => void;
}

const Step2Delivery: React.FC<Props> = ({ productsTotal, data, onChange, onNext, onPrev }) => {
  // Si +50€, livraison gratuite
  const isFree = productsTotal >= 50;

  const handleSelect = (method: DeliveryMethod) => {
    onChange({
      method,
      shippingCost: method === "FREE" ? 0 : 4.99,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Choisissez votre mode de livraison</h2>
      <div className="flex flex-col gap-3 mb-6">
        <label className="flex items-center gap-3">
          <input
            type="radio"
            checked={data.method === "STANDARD"}
            onChange={() => handleSelect("STANDARD")}
            disabled={isFree}
          />
          Livraison standard (4,99&nbsp;€)
        </label>
        <label className="flex items-center gap-3">
          <input
            type="radio"
            checked={data.method === "FREE"}
            onChange={() => handleSelect("FREE")}
            disabled={!isFree}
          />
          Livraison gratuite {isFree ? "(+50€ d'achat)" : <span className="text-xs text-gray-500">(Dès 50€)</span>}
        </label>
      </div>
      <div className="mb-4">
        <b>Frais de livraison : </b>{data.shippingCost.toFixed(2)} €
      </div>
      <div className="flex justify-between">
        <button type="button" className="btn-secondary" onClick={onPrev}>
          Retour
        </button>
        <button type="button" className="btn-primary" onClick={onNext}>
          Continuer
        </button>
      </div>
    </div>
  );
};

export default Step2Delivery;
