import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar';



export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('')
  useEffect(() =>{
    const urlParams = new URLSearchParams(location.search)
    const tabFormUrl = urlParams.get('tab')
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className=" md:w-56">
        {/* Sidebar */}
        <Sidebar/>
      </div>
        {/* profile... */}
        {tab === 'profile' && <DashProfile/>}
        {/* post */}
        {tab === 'post' && <DashPosts/>}
        {/* users */}
        {tab === 'users' && <DashUsers/>}
        {/* commets */}
        {tab === 'comments' && <DashComments/>}
        {/* dashboard component */}
        {tab === 'dash' && <DashboardComponent/>}
    </div>
  )
}
