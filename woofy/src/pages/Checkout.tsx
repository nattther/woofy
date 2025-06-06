/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import Step1PersonalInfo from "../components/Step1PersonalInfo";
import Step2Delivery from "../components/Step2Delivery";
import Step3Payment from "../components/Step3Payment";
import Step4Confirmation from "../components/Step4Confirmation";
import type { CheckoutPersonalInfo } from "../type/checkout";
import { useNavigate } from "react-router-dom";
import { vendureFetch } from "../api/vendure";

// --- GraphQL queries/mutations ---
const INITIAL_PERSONAL: CheckoutPersonalInfo = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  phone: "",
};

const stepLabels = ["Infos", "Livraison", "Paiement", "Confirmation"];

const SET_CUSTOMER = `
mutation SetCustomerForOrder($input: CreateCustomerInput!) {
  setCustomerForOrder(input: $input) {
    ... on Order { id }
    ... on ErrorResult { message }
  }
}`;

const SET_ADDRESS = `
mutation SetOrderShippingAddress($input: CreateAddressInput!) {
  setOrderShippingAddress(input: $input) {
    ... on Order {
      id
      state
      shippingAddress {
        fullName
        company
        streetLine1
        streetLine2
        city
        province
        postalCode
        countryCode
        phoneNumber
        customFields
      }
      billingAddress {
        fullName
        company
        streetLine1
        streetLine2
        city
        province
        postalCode
        countryCode
        phoneNumber
        customFields
      }
    }
    ... on ErrorResult {
      errorCode
      message
    }
  }
}`;

const TRANSITION_TO_ARRANGING_SHIPPING = `
mutation TransitionToArrangingShipping {
  transitionOrderToNextState {
    ... on Order {
      id
      state
      shippingAddress {
        fullName
        company
        streetLine1
        streetLine2
        city
        province
        postalCode
        countryCode
        phoneNumber
      }
    }
    ... on OrderStateTransitionError {
      errorCode
      message
      transitionError
    }
  }
}`;

const GET_SHIPPING = `
query {
  eligibleShippingMethods {
    id
    name
    priceWithTax
    description
  }
}`;

const SET_SHIPPING = `
mutation SetOrderShippingMethod($shippingMethodId: [ID!]!) {
  setOrderShippingMethod(shippingMethodId: $shippingMethodId) {
    ... on Order { id state }
    ... on ErrorResult { message }
  }
}`;

const GET_ACTIVE_ORDER_STATE = `
query {
  activeOrder {
    id
    state
  }
}`;

const TRANSITION_TO_PAYMENT = `
mutation TransitionToPayment {
  transitionOrderToNextState {
    ... on Order { 
      id 
      state 
    }
    ... on OrderStateTransitionError { 
      errorCode
      message 
      transitionError
    }
  }
}`;

const ADD_PAYMENT = `
mutation AddPaymentToOrder($input: PaymentInput!) {
  addPaymentToOrder(input: $input) {
    ... on Order { id code }
    ... on ErrorResult { message }
  }
}`;

const GET_ORDER_BY_CODE = `
query GetOrderByCode($code: String!) {
  orderByCode(code: $code) {
    id
    code
    state
    totalWithTax
    lines {
      productVariant { name }
      quantity
      linePriceWithTax
    }
  }
}`;

// --- Composant principal de Checkout ---
const Checkout: React.FC = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [personalInfo, setPersonalInfo] = useState<CheckoutPersonalInfo>(INITIAL_PERSONAL);
  const [shippingMethods, setShippingMethods] = useState<any[]>([]);
  const [selectedShippingMethodId, setSelectedShippingMethodId] = useState<string>("");
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [orderCode, setOrderCode] = useState<string | null>(null);
  const [orderSummary, setOrderSummary] = useState<any>(null);

  const navigate = useNavigate();
  const productsTotal = getTotalPrice() / 100;
  const totalOrder = productsTotal + shippingCost;

  const goToNext = () => setStep((s) => s + 1);
  const goToPrev = () => setStep((s) => Math.max(1, s - 1));

  // -------- STEP 1 : setCustomerForOrder + setOrderShippingAddress + transition --------
  const handleStep1Next = async () => {
    try {
      // 1) Vérifier le panier
      const { activeOrder } = await vendureFetch(`
        query {
          activeOrder {
            id
            state
            lines { id }
          }
        }
      `);
      
      if (!activeOrder?.lines.length) {
        alert("Votre panier est vide.");
        return;
      }

      console.log("État initial de la commande:", activeOrder.state);

      // 2) Vérifier/créer le client
      const customerSession: any = await vendureFetch(`query { activeCustomer { id } }`);
      if (!customerSession.activeCustomer) {
        const res: any = await vendureFetch(SET_CUSTOMER, {
          input: {
            emailAddress: personalInfo.email,
            firstName: personalInfo.firstName,
            lastName: personalInfo.lastName,
          },
        });
        if (res.setCustomerForOrder?.message) {
          throw new Error(res.setCustomerForOrder.message);
        }
      }

      // 3) Définir l'adresse de livraison
      const addressRes: any = await vendureFetch(SET_ADDRESS, {
        input: {
          fullName: `${personalInfo.firstName} ${personalInfo.lastName}`,
          company: "MonEntreprise",
          streetLine1: personalInfo.address,
          streetLine2: "",
          city: "Paris",
          province: "Île-de-France",
          postalCode: "75002",
          countryCode: "FR",
          phoneNumber: personalInfo.phone,
          defaultShippingAddress: true,
          defaultBillingAddress: false,
        },
      });

      if (addressRes.setOrderShippingAddress?.message) {
        throw new Error(addressRes.setOrderShippingAddress.message);
      }

      console.log("État après adresse:", addressRes.setOrderShippingAddress.state);

      // 4) Transition vers ArrangingShipping si nécessaire
      const currentState = addressRes.setOrderShippingAddress.state;
      if (currentState === "AddingItems") {
        const transitionRes: any = await vendureFetch(TRANSITION_TO_ARRANGING_SHIPPING);
        
        if (transitionRes.transitionOrderToNextState?.message || 
            transitionRes.transitionOrderToNextState?.errorCode) {
          throw new Error(
            transitionRes.transitionOrderToNextState.message || 
            "Erreur lors de la transition vers ArrangingShipping"
          );
        }

        console.log("État après transition:", transitionRes.transitionOrderToNextState.state);
      }

      // 5) Tout est OK → passer à l'étape 2
      goToNext();
    } catch (err: any) {
      console.error("Erreur Step 1:", err);
      alert("Erreur lors de la configuration de la commande : " + (err?.message || "Inconnue"));
    }
  };

  // -------- STEP 2 : récupérer et enregistrer le shipping --------
  useEffect(() => {
    if (step === 2) {
      vendureFetch(GET_SHIPPING).then((data) => {
        const methods = data.eligibleShippingMethods || [];
        setShippingMethods(methods);
        if (methods.length > 0) {
          setSelectedShippingMethodId(methods[0].id);
          setShippingCost(methods[0].priceWithTax / 100);
        }
      }).catch(err => {
        console.error("Erreur lors de la récupération des méthodes de livraison:", err);
      });
    }
  }, [step]);

  const handleStep2Next = async () => {
    if (!selectedShippingMethodId) {
      alert("Aucune méthode de livraison sélectionnée");
      return;
    }

    try {
      // 1. Appliquer le shipping method
      const res: any = await vendureFetch(SET_SHIPPING, { 
        shippingMethodId: [selectedShippingMethodId] 
      });
      
      if (res.setOrderShippingMethod?.message) {
        throw new Error(res.setOrderShippingMethod.message);
      }

      console.log("État après shipping method:", res.setOrderShippingMethod.state);
      goToNext();
    } catch (err: any) {
      console.error("Erreur Step 2:", err);
      alert("Erreur lors de la sélection de la livraison : " + (err?.message || "Inconnue"));
    }
  };

  // -------- STEP 3 : transition → paiement --------
  const handleStep3Pay = async () => {
    try {
      // 1. Vérifier l'état actuel
      const stateCheck: any = await vendureFetch(GET_ACTIVE_ORDER_STATE);
      if (!stateCheck.activeOrder) {
        alert("Votre commande a expiré ou la session a été perdue.");
        return;
      }

      console.log("État avant paiement:", stateCheck.activeOrder.state);

      // 2. Transition vers ArrangingPayment
      const transitionRes: any = await vendureFetch(TRANSITION_TO_PAYMENT);
      
      if (transitionRes.transitionOrderToNextState?.message || 
          transitionRes.transitionOrderToNextState?.errorCode) {
        throw new Error(
          transitionRes.transitionOrderToNextState.message || 
          "Erreur lors de la transition vers le paiement"
        );
      }

      console.log("État après transition vers paiement:", transitionRes.transitionOrderToNextState.state);

      // 3. Ajout du paiement
      const paymentRes: any = await vendureFetch(ADD_PAYMENT, {
        input: {
          method: "standard-payment",
          metadata: {},
        },
      });
      
      if (paymentRes.addPaymentToOrder?.message) {
        throw new Error(paymentRes.addPaymentToOrder.message);
      }

      setOrderCode(paymentRes.addPaymentToOrder.code);
      goToNext();
    } catch (err: any) {
      console.error("Erreur Step 3:", err);
      alert("Erreur lors du paiement : " + (err?.message || "Inconnue"));
    }
  };

  // -------- STEP 4 : fetch du résumé --------
  useEffect(() => {
    if (step === 4 && orderCode) {
      vendureFetch(GET_ORDER_BY_CODE, { code: orderCode })
        .then((data) => {
          setOrderSummary(data.orderByCode);
        })
        .catch(err => {
          console.error("Erreur lors de la récupération du résumé:", err);
        });
    }
  }, [step, orderCode]);

  // -------- Confirmation finale --------
  const handleConfirmation = async () => {
    await clearCart();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#F5F0E6] py-10 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 border border-[#C1E1C1]">
        {/* Étape 1–4 : indicateur visuel */}
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

        {/* --- Rendu des étapes --- */}
        {step === 1 && (
          <Step1PersonalInfo data={personalInfo} onChange={setPersonalInfo} onNext={handleStep1Next} />
        )}

        {step === 2 && (
          <Step2Delivery
            shippingMethods={shippingMethods}
            selectedShippingMethodId={selectedShippingMethodId}
            onSelectShippingMethod={(id) => {
              setSelectedShippingMethodId(id);
              const m = shippingMethods.find((m) => m.id === id);
              setShippingCost(m ? m.priceWithTax / 100 : 0);
            }}
            onNext={handleStep2Next}
            onPrev={goToPrev}
          />
        )}

        {step === 3 && (
          <Step3Payment total={totalOrder} onSuccess={handleStep3Pay} onPrev={goToPrev} />
        )}

        {step === 4 && (
          <Step4Confirmation
            personalInfo={personalInfo}
            cart={cart}
            shipping={shippingCost}
            total={totalOrder}
            onEnd={handleConfirmation}
            orderSummary={orderSummary}
          />
        )}
      </div>
    </div>
  );
};

export default Checkout;