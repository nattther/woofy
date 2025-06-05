import React, { useState } from "react";

import { useCart } from "../context/CartContext";
import Step1PersonalInfo from "../components/Step1PersonalInfo";
import Step2Delivery from "../components/Step2Delivery";
import Step3Payment from "../components/Step3Payment";
import Step4Confirmation from "../components/Step4Confirmation";
import type { CheckoutPersonalInfo, DeliveryMethod } from "../type/checkout";

const INITIAL_PERSONAL: CheckoutPersonalInfo = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  phone: "",
};

const Checkout: React.FC = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);

  const [personalInfo, setPersonalInfo] = useState<CheckoutPersonalInfo>(INITIAL_PERSONAL);
  const [delivery, setDelivery] = useState<{ method: DeliveryMethod; shippingCost: number }>({
    method: "STANDARD",
    shippingCost: 4.99,
  });

  const goToNext = () => setStep((s) => s + 1);
  const goToPrev = () => setStep((s) => Math.max(1, s - 1));

  // Montant total commande
  const productsTotal = getTotalPrice() / 100;
  const shippingCost = delivery.shippingCost;
  const totalOrder = productsTotal + shippingCost;

  // Reset cart et state à la confirmation
  const handleConfirmation = () => {
    clearCart();
  };

  return (
    <div className="min-h-screen bg-[#F5F0E6] py-12 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8">
        {/* Stepper simple */}
        <div className="flex justify-between mb-8">
          {["Infos", "Livraison", "Paiement", "Confirmation"].map((title, i) => (
            <div
              key={title}
              className={`flex-1 text-center font-bold py-2 rounded 
                ${step === i + 1 ? "bg-[#89CFF0] text-white" : "bg-gray-200 text-gray-700"}
              `}
            >
              {i + 1}. {title}
            </div>
          ))}
        </div>
        {/* Steps */}
        {step === 1 && (
          <Step1PersonalInfo
            data={personalInfo}
            onChange={setPersonalInfo}
            onNext={goToNext}
          />
        )}
        {step === 2 && (
          <Step2Delivery
            productsTotal={productsTotal}
            data={delivery}
            onChange={setDelivery}
            onNext={goToNext}
            onPrev={goToPrev}
          />
        )}
        {step === 3 && (
          <Step3Payment
            total={totalOrder}
            onSuccess={() => {
              goToNext();
            }}
            onPrev={goToPrev}
          />
        )}
        {step === 4 && (
          <Step4Confirmation
            personalInfo={personalInfo}
            cart={cart}
            shipping={shippingCost}
            total={totalOrder}
            onEnd={handleConfirmation}
          />
        )}
      </div>
    </div>
  );
};

export default Checkout;
