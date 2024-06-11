import React from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const SettingIcon = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-green-800 w-10 h-10 rounded-full flex justify-center items-center fixed bottom-0 end-0 m-12" onClick={() => navigate("/admin-options")}>
      <Icon icon="solar:settings-bold" className="text-2xl text-white" />
    </div>
  );
};

export default SettingIcon;
