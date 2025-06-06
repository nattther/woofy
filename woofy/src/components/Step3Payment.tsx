import React, { useState } from "react";

interface Props {
  total: number;
  onSuccess: () => void;
  onPrev: () => void;
}

const Step3Payment: React.FC<Props> = ({ total, onSuccess, onPrev }) => {
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1200);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-[#4A4A4A]">Paiement</h2>
      <div className="mb-6 text-lg text-[#4A4A4A]">
        Montant à régler : <b className="text-[#89CFF0]">{total.toFixed(2)} €</b>
      </div>
      <div className="flex justify-between gap-4 mb-2">
        <button
          type="button"
          className="border border-[#C1E1C1] text-[#4A4A4A] font-semibold rounded-lg py-2 px-6 bg-white hover:bg-[#C1E1C1]/40 transition"
          onClick={onPrev}
          disabled={loading}
        >
          Retour
        </button>
        <button
          type="button"
          className={`bg-[#89CFF0] text-white font-bold rounded-lg py-2 px-6 shadow-md hover:bg-[#77bfe0] transition flex items-center justify-center min-w-[120px] ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          onClick={handlePay}
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Paiement...
            </>
          ) : (
            <>Payer (test)</>
          )}
        </button>
      </div>
      <div className="text-xs text-gray-500 mt-3 text-center">
      </div>
    </div>
  );
};

export default Step3Payment;
