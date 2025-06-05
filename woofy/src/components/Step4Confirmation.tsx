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
    onEnd();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Merci pour votre commande !</h2>
      <div className="mb-4">Un email de confirmation sera envoyé à <b>{personalInfo.email}</b></div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Résumé :</h3>
        <ul className="mb-2">
          {cart.items.map(item => (
            <li key={item.product.id}>
              {item.product.name} x {item.quantity} — {((item.product.variants[0]?.priceWithTax ?? 0) / 100).toFixed(2)} €
            </li>
          ))}
        </ul>
        <div>Livraison : {shipping.toFixed(2)} €</div>
        <div className="font-bold">Total : {total.toFixed(2)} €</div>
      </div>
      <div className="text-lg">À bientôt chez Woofy! 🐶</div>
    </div>
  );
};

export default Step4Confirmation;
