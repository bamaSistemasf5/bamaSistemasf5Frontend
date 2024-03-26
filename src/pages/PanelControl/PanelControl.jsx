import React from 'react'
import DashboardBarChart from '../../components/DashboardBarChart/DashboardBarChart.jsx';
import OrdersLineChart from '../../components/OrdersLineChart/OrdersLineChart.jsx'
import DashboardPieChart from '../../components/DashboardPieChart/DashboardPieChart.jsx';
import DashboardOrdersTable from '../../components/DashboarOrdersTable/DashboardOrdersTable.jsx';

export default function PanelControl() {
  return (
    <div>
      <div>
        <DashboardBarChart/>
      </div>
      <div>
        <OrdersLineChart/>
      </div>
      <div>
      <DashboardPieChart />
      </div>
      <div>
        <DashboardOrdersTable/>
      </div>
      
    </div>
  )
}
