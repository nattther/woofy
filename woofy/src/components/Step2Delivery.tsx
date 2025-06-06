// src/components/Step2Delivery.tsx
import React from "react";

interface ShippingMethod {
  id: string;
  name: string;
  priceWithTax: number;
  description?: string;
}

interface Props {
  shippingMethods: ShippingMethod[];
  selectedShippingMethodId: string;
  onSelectShippingMethod: (id: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const Step2Delivery: React.FC<Props> = ({
  shippingMethods,
  selectedShippingMethodId,
  onSelectShippingMethod,
  onNext,
  onPrev,
}) => (
  <div className="flex flex-col gap-6">
    <h2 className="text-xl font-bold mb-4 text-[#4A4A4A]">Choisissez votre mode de livraison</h2>
    <div className="flex flex-col gap-3">
      {shippingMethods.map((method) => (
        <label key={method.id} className="flex items-center gap-3 cursor-pointer font-semibold text-[#4A4A4A]">
          <input
            type="radio"
            className="appearance-none h-4 w-4 border-2 border-[#C1E1C1] rounded-full checked:bg-[#89CFF0] checked:border-[#89CFF0] focus:outline-none transition"
            checked={selectedShippingMethodId === method.id}
            onChange={() => onSelectShippingMethod(method.id)}
          />
          <span>
            {method.name}{" "}
            <span className="text-[#89CFF0]">
              ({(method.priceWithTax / 100).toFixed(2)} €)
            </span>
          </span>
          {method.description && (
            <span className="text-xs text-gray-500">- {method.description}</span>
          )}
        </label>
      ))}
    </div>
    <div className="flex justify-between mt-6">
      <button
        type="button"
        className="border border-[#C1E1C1] text-[#4A4A4A] font-semibold rounded-lg py-2 px-5 bg-white hover:bg-[#C1E1C1]/40 transition"
        onClick={onPrev}
      >
        ← Retour
      </button>
      <button
        type="button"
        className="bg-[#89CFF0] text-white font-bold rounded-lg py-2 px-6 shadow hover:bg-[#77bfe0] transition disabled:opacity-50"
        onClick={onNext}
        disabled={!selectedShippingMethodId}
      >
        Continuer →
      </button>
    </div>
  </div>
);

export default Step2Delivery;
