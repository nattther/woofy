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

const stepLabels = [
  "Infos",
  "Livraison",
  "Paiement",
  "Confirmation",
];

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

  // Montants
  const productsTotal = getTotalPrice() / 100;
  const shippingCost = delivery.shippingCost;
  const totalOrder = productsTotal + shippingCost;

  const handleConfirmation = () => {
    clearCart();
  };

  return (
    <div className="min-h-screen bg-[#F5F0E6] py-10 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 border border-[#C1E1C1]">
        {/* Stepper modernisé */}
        <div className="flex items-center justify-between mb-8 px-2">
          {stepLabels.map((title, i) => (
            <div key={title} className="flex-1 flex flex-col items-center relative">
              <div
                className={`
                  flex items-center justify-center w-8 h-8 rounded-full border-2
                  ${step === i + 1
                    ? "bg-[#89CFF0] border-[#89CFF0] text-white font-bold shadow"
                    : step > i + 1
                      ? "bg-[#C1E1C1] border-[#C1E1C1] text-[#4A4A4A]"
                      : "bg-gray-100 border-[#C1E1C1] text-[#89CFF0]"}
                  transition
                `}
              >
                {i + 1}
              </div>
              <span className={`mt-2 text-xs font-semibold ${step === i + 1 ? "text-[#89CFF0]" : "text-[#4A4A4A]"}`}>
                {title}
              </span>
              {i < stepLabels.length - 1 && (
                <span className="absolute top-4 left-full w-1/2 h-px bg-[#C1E1C1]"></span>
              )}
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
            onSuccess={goToNext}
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
