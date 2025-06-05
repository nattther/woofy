import React, { useState } from "react";
import type { CheckoutPersonalInfo } from "../type/checkout";


interface Props {
  data: CheckoutPersonalInfo;
  onChange: (data: CheckoutPersonalInfo) => void;
  onNext: () => void;
}

const Step1PersonalInfo: React.FC<Props> = ({ data, onChange, onNext }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!data.firstName) errs.firstName = "Prénom requis";
    if (!data.lastName) errs.lastName = "Nom requis";
    if (!/\S+@\S+\.\S+/.test(data.email)) errs.email = "Email invalide";
    if (!data.address) errs.address = "Adresse requise";
    if (!/^0[1-9]\d{8}$/.test(data.phone)) errs.phone = "Téléphone invalide";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label>Prénom</label>
        <input
          value={data.firstName}
          onChange={e => onChange({ ...data, firstName: e.target.value })}
          className="input"
        />
        {errors.firstName && <div className="text-red-500">{errors.firstName}</div>}
      </div>
      <div>
        <label>Nom</label>
        <input
          value={data.lastName}
          onChange={e => onChange({ ...data, lastName: e.target.value })}
          className="input"
        />
        {errors.lastName && <div className="text-red-500">{errors.lastName}</div>}
      </div>
      <div>
        <label>Email</label>
        <input
          value={data.email}
          onChange={e => onChange({ ...data, email: e.target.value })}
          className="input"
        />
        {errors.email && <div className="text-red-500">{errors.email}</div>}
      </div>
      <div>
        <label>Adresse</label>
        <input
          value={data.address}
          onChange={e => onChange({ ...data, address: e.target.value })}
          className="input"
        />
        {errors.address && <div className="text-red-500">{errors.address}</div>}
      </div>
      <div>
        <label>Téléphone</label>
        <input
          value={data.phone}
          onChange={e => onChange({ ...data, phone: e.target.value })}
          className="input"
          placeholder="0123456789"
        />
        {errors.phone && <div className="text-red-500">{errors.phone}</div>}
      </div>
      <button type="submit" className="btn-primary mt-4">
        Continuer
      </button>
    </form>
  );
};

export default Step1PersonalInfo;
