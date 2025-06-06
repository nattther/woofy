import React, { useEffect } from "react";
import type { Cart } from "../type/cart";
import type { CheckoutPersonalInfo } from "../type/checkout";

interface Props {
  personalInfo: CheckoutPersonalInfo;
  cart: Cart;
  shipping: number;
  total: number;
  onEnd: () => void;
}

const Step4Confirmation: React.FC<Props> = ({
  personalInfo,
  cart,
  shipping,
  total,
  onEnd,
}) => {
  useEffect(() => {

  }, []);

  // Calculer le sous-total produits
  const productsTotal = cart.items.reduce(
    (acc, item) => acc + item.quantity * (item.product.variants[0]?.priceWithTax ?? 0),
    0
  ) / 100;

  return (
    <div className="text-center max-w-lg mx-auto">
      <div className="bg-[#89CFF0]/10 rounded-2xl shadow-lg px-6 py-8 mb-6 border border-[#C1E1C1]">
        <div className="flex flex-col items-center mb-4">
          <span className="text-4xl mb-2">🎉</span>
          <h2 className="text-2xl font-bold mb-1 text-[#4A4A4A]">
            Merci pour votre commande&nbsp;!
          </h2>
        </div>
        <div className="mb-3 text-[#4A4A4A]">
          Un email de confirmation sera envoyé à&nbsp;
          <b className="text-[#89CFF0]">{personalInfo.email}</b>
        </div>
        <div className="mb-6 bg-white rounded-lg p-4 border border-[#C1E1C1] text-left">
          <h3 className="text-lg font-semibold mb-3 text-[#4A4A4A]">Résumé de la commande</h3>
          <ul className="mb-3 space-y-1">
            {cart.items.map(item => (
              <li key={item.product.id} className="flex justify-between items-center">
                <span>
                  {item.product.name}
                  <span className="ml-2 text-[#C1E1C1] font-medium">× {item.quantity}</span>
                </span>
                <span className="text-[#89CFF0] font-semibold">
                  {((item.product.variants[0]?.priceWithTax ?? 0) * item.quantity / 100).toFixed(2)} €
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between text-[#4A4A4A] border-t pt-2 border-[#C1E1C1] mb-1">
            <span>Total produits :</span>
            <span>{productsTotal.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between text-[#4A4A4A] mb-1">
            <span>Livraison :</span>
            <span>
              {shipping === 0 ? (
                <span className="text-[#C1E1C1] font-semibold">Offert</span>
              ) : (
                `${shipping.toFixed(2)} €`
              )}
            </span>
          </div>
          <div className="flex justify-between text-[#4A4A4A] mb-2">
            <span>Paiement :</span>
            <span className="text-[#89CFF0] font-semibold">Carte bancaire (test)</span>
          </div>
          <div className="flex justify-between font-bold text-[#4A4A4A] mt-2 border-t border-[#C1E1C1] pt-2 text-lg">
            <span>Total à régler :</span>
            <span>{total.toFixed(2)} €</span>
          </div>
        </div>
        <div className="text-lg text-[#4A4A4A] font-medium mt-2">
          À bientôt chez Woofy&nbsp;! <span className="text-2xl">🐶</span>
        </div>
      </div>
      <button
  className="mt-4 bg-[#89CFF0] text-white font-bold rounded-lg py-2 px-6 shadow hover:bg-[#77bfe0] transition"
  onClick={onEnd}
>
  Retour à l’accueil
</button>

    </div>
  );
};

export default Step4Confirmation;
