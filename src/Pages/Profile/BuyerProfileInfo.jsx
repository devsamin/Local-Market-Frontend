import React from "react";

const BuyerProfileInfo = ({ profile }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-800 mb-4">ব্যক্তিগত তথ্য</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <InputField label="পূর্ণ নাম" value={profile.username} />
      <InputField label="ইমেইল" value={profile.email} />
      <InputField label="ফোন" value={profile.phone} />
      <InputField label="শহর" value={profile.city} />
      <InputField label="এরিয়া" value={profile.location} />
      <InputField
        label="ঠিকানা"
        value={profile.address}
        textarea
        fullWidth
      />
    </div>
  </div>
);

const InputField = ({ label, value, textarea, fullWidth }) => (
  <div className={fullWidth ? "sm:col-span-2" : ""}>
    <label className="block text-sm text-gray-500 mb-1">{label}</label>
    {textarea ? (
      <textarea
        value={value || ""}
        readOnly
        className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 h-20"
      />
    ) : (
      <input
        type="text"
        value={value || ""}
        readOnly
        className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2"
      />
    )}
  </div>
);

export default BuyerProfileInfo;
