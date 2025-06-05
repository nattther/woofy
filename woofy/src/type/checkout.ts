export interface CheckoutPersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
}

export type DeliveryMethod = "STANDARD" | "FREE";

export interface CheckoutDelivery {
  method: DeliveryMethod;
  shippingCost: number;
}

export interface CheckoutPayment {
  // Tu pourras rajouter id de paiement stripe, etc.
  status: "INIT" | "PAID";
}

export interface CheckoutState {
  step: number;
  personalInfo: CheckoutPersonalInfo;
  delivery: CheckoutDelivery;
  payment: CheckoutPayment;
}
