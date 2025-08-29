import React from 'react'
import DashBoardHeader from '../../components/Shop/Layout/DashBoardHeader'
import DashboardSidebar from '../../components/Shop/Layout/DashboardSidebar'
import AllProducts from "../../components/Shop/AllProducts.jsx"

const ShopAllProducts = () => {
  return (
    <div>
    <DashBoardHeader/>
    <div className='flex  justify-between w-full'>
        <div className='w-[80px] 800px:w-[330px]'>
            <DashboardSidebar active={3} />
        </div>
        <div className="w-full justify-center flex">
            <AllProducts />
        </div>
    </div>
</div>
  )
}

export default ShopAllProducts