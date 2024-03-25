import React from 'react'
import DashboardBarChart from '../../components/DashboardBarChart/DashboardBarChart.jsx';
import OrdersLineChart from '../../components/OrdersLineChart/OrdersLineChart.jsx'

export default function PanelControl() {
  return (
    <div>
      <DashboardBarChart/>
      <OrdersLineChart/>
    </div>
  )
}
