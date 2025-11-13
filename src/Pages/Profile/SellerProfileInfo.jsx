import React from "react";
import BuyerProfileInfo from "./BuyerProfileInfo";

const SellerProfileInfo = ({ profile }) => (
  <div>
    <BuyerProfileInfo profile={profile} />

    <div className="mt-6 border-t pt-4">
      <h4 className="text-md font-semibold text-gray-700 mb-3">
        ব্যবসায়িক তথ্য
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="ব্যবসার নাম" value={profile.businessName} />
        <InputField label="NID নম্বর" value={profile.nidNumber} />
        <InputField label="ব্যাংক অ্যাকাউন্ট" value={profile.bankAccount} />
      </div>
    </div>
  </div>
);

const InputField = ({ label, value }) => (
  <div>
    <label className="block text-sm text-gray-500 mb-1">{label}</label>
    <input
      type="text"
      value={value || ""}
      readOnly
      className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2"
    />
  </div>
);

export default SellerProfileInfo;
