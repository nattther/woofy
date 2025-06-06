import React, { useState } from "react";
import type { CheckoutPersonalInfo } from "../type/checkout";

interface Props {
  data: CheckoutPersonalInfo;
  onChange: (data: CheckoutPersonalInfo) => void;
  onNext: () => void;
}

const inputClass =
  "w-full rounded-lg border border-[#C1E1C1] px-4 py-2 mt-1 text-[#4A4A4A] bg-white focus:outline-none focus:border-[#89CFF0] shadow-sm transition";

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
        <label className="font-semibold text-[#4A4A4A]">Prénom</label>
        <input
          value={data.firstName}
          onChange={e => onChange({ ...data, firstName: e.target.value })}
          className={inputClass}
        />
        {errors.firstName && <div className="text-red-500 text-xs mt-1">{errors.firstName}</div>}
      </div>
      <div>
        <label className="font-semibold text-[#4A4A4A]">Nom</label>
        <input
          value={data.lastName}
          onChange={e => onChange({ ...data, lastName: e.target.value })}
          className={inputClass}
        />
        {errors.lastName && <div className="text-red-500 text-xs mt-1">{errors.lastName}</div>}
      </div>
      <div>
        <label className="font-semibold text-[#4A4A4A]">Email</label>
        <input
          value={data.email}
          onChange={e => onChange({ ...data, email: e.target.value })}
          className={inputClass}
        />
        {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
      </div>
      <div>
        <label className="font-semibold text-[#4A4A4A]">Adresse</label>
        <input
          value={data.address}
          onChange={e => onChange({ ...data, address: e.target.value })}
          className={inputClass}
        />
        {errors.address && <div className="text-red-500 text-xs mt-1">{errors.address}</div>}
      </div>
      <div>
        <label className="font-semibold text-[#4A4A4A]">Téléphone</label>
        <input
          value={data.phone}
          onChange={e => onChange({ ...data, phone: e.target.value })}
          className={inputClass}
          placeholder="0123456789"
        />
        {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
      </div>
      <button
        type="submit"
        className="bg-[#89CFF0] text-white font-bold rounded-lg py-2 mt-4 shadow hover:bg-[#77bfe0] transition"
      >
        Continuer
      </button>
    </form>
  );
};

export default Step1PersonalInfo;
