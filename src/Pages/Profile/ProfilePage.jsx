import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import { useNavigate } from "react-router-dom";
import ProfileLayout from "./ProfileLayout";
import BuyerProfileInfo from "./BuyerProfileInfo";
import SellerProfileInfo from "./SellerProfileInfo";

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access");
        if (!token) return navigate("/login");

        const res = await axios.get("http://127.0.0.1:8000/api/users/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (error) {
        console.error(error);
        logout();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [logout, navigate]);

  if (loading) return <div className="text-center py-10">লোড হচ্ছে...</div>;

  return (
    <ProfileLayout profile={profile}>
      {profile?.role === "seller" ? (
        <SellerProfileInfo profile={profile} />
      ) : (
        <BuyerProfileInfo profile={profile} />
      )}
    </ProfileLayout>
  );
};

export default ProfilePage;
