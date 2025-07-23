
import {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'
const DashBoard = () => {
  const {isAdmin} = useAuth()
  const navigate = useNavigate()
  return (
    <div className="max-w-full mx-auto">
      <div className="mx-auto max-w-2xl text-center p-4">
          <h1 className="text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-white via-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Welcome to Spend Sense 
            </span>
          </h1>
          <div className="text-xl mt-4 text-white">A place where you can take control of your spending. Monitor your transctions and budgets</div>
      </div>
      <div className="mb-16 overflow-hidden rounded-2xl shadow-lg">
        <div className="flex items-center justify-center p-6">
              <span className="text-white text-lg font-medium mx-8">
                💰 Track Your Expenses in Real-Time
              </span>
              <span className="text-white text-lg font-medium mx-8 ">
                📊 Get Detailed Analytics and Insights
              </span>
              <span className="text-white text-lg font-medium mx-8">
                🔔 Set Spending Alerts
              </span>
              <span className="text-white text-lg font-medium mx-8">
                🎯 Achieve Your Financial Goals
              </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Link to = '/transactions'>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl hover:shadow-blue-500 transition-shadow duration-300 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-600">
            <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
            <p className="text-gray-600">View and manage your transactions.</p>
          </div>
        </Link>
        <Link to = '/budgets'>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl hover:shadow-blue-500 transition-shadow duration-300 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-600">
            <h2 className="text-2xl font-semibold mb-4">Budgets</h2>
            <p className="text-gray-600">Decide your own limits</p>
          </div>
        </Link>
        <Link to = '/analytics'>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl hover:shadow-blue-500 transition-shadow duration-300 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-600">
            <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
            <p className="text-gray-600">Analyze areas of improvement in your spending</p>
          </div>
        </Link>
        {isAdmin ? (
        <Link to = '/admin'>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl hover:shadow-blue-500 transition-shadow duration-300 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-600">
            <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
            <p className="text-gray-600">More privileges for you</p>
          </div>
        </Link>
        ): (
        <Link to = '/home'>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-600">
            <h2 className="text-2xl font-semibold mb-4">Stay Tuned</h2>
            <p className="text-gray-600">More features coming soon</p>
          </div>
        </Link>
        )}
      </div>
    </div>
  )
}

export default DashBoard;