import React, { useState } from "react";

interface Props {
  total: number;
  onSuccess: () => void;
  onPrev: () => void;
}

const Step3Payment: React.FC<Props> = ({ total, onSuccess, onPrev }) => {
  const [loading, setLoading] = useState(false);

  // Simulate payment success
  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1200);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Paiement</h2>
      <div className="mb-4 text-lg">
        Montant à régler : <b>{total.toFixed(2)} €</b>
      </div>
      <div className="flex justify-between">
        <button type="button" className="btn-secondary" onClick={onPrev}>
          Retour
        </button>
        <button
          type="button"
          className="btn-primary"
          onClick={handlePay}
          disabled={loading}
        >
          {loading ? "Paiement en cours..." : "Payer (test)"}
        </button>
      </div>
      <div className="text-xs text-gray-500 mt-2">
        * Pour la prod, connecte Stripe Checkout (contacte-moi si tu veux le code complet côté serveur/Next.js/Express !)
      </div>
    </div>
  );
};

export default Step3Payment;
