import React from 'react'
import DashBoardHeader from '../../components/Shop/Layout/DashBoardHeader'
import DashboardSidebar from '../../components/Shop/Layout/DashboardSidebar'
import AllCoupons from "../../components/Shop/AllCoupons"

const ShopAllCoupons = () => {
  return (
    <div>
    <DashBoardHeader/>
    <div className='flex  justify-between w-full'>
        <div className='w-[80px] 800px:w-[330px]'>
            <DashboardSidebar active={9}/>
        </div>
        <div className="w-full justify-center flex">
            <AllCoupons />
        </div>
    </div>
</div>
  )
}

export default ShopAllCoupons