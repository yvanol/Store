import React from "react";
import ShopSettings from "../../components/Shop/ShopSettings.jsx";
import DashboardHeader from "../../components/Shop/Layout/DashBoardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSidebar";

const ShopSettingsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={11} />
        </div>
        <ShopSettings />
      </div>
    </div>
  );
};

export default ShopSettingsPage;
