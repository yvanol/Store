import React from 'react'
import DashBoardHeader from '../../components/Shop/Layout/DashBoardHeader'
import DashboardSidebar from '../../components/Shop/Layout/DashboardSidebar'
import CreateEvent from "../../components/Shop/CreateEvent"

const ShopCreateEvents = () => {
  return (
    <div>
    <DashBoardHeader />
    <div className='flex items-center justify-between w-full'>
        <div className='w-[80px] 800px:w-[330px]'>
            <DashboardSidebar active={6} />
        </div>
        <div className="w-full justify-center flex">
            <CreateEvent />
        </div>
    </div>
</div>
  )
}

export default ShopCreateEvents