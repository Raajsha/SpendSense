import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import DashBoard from './pages/DashBoard.jsx'
import Transactions from './pages/Transactions.jsx'
import AddTransaction from './pages/AddTransaction.jsx'
import Budgets from './pages/Budgets.jsx'
import EditTransaction from './pages/EditTransaction.jsx'
import AddBudget from './pages/AddBudget.jsx'
import EditBudget from './pages/EditBudget.jsx'
import BudgetDetails from './pages/BudgetDetails.jsx'
import Analytics from './pages/Analytics.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'



const App = () => {
  return (
    <div className='min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950'>
        <Navbar />
        <Routes>
            <Route path = '/' element={<Login />} />
            <Route path = '/signup' element = {<SignUp />} />
            <Route 
              path = '/home' 
              element = {
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            } />

            <Route 
              path = '/transactions'
              element = {
              <ProtectedRoute>
                <Transactions/>
              </ProtectedRoute>
            } />

            <Route 
              path = '/budgets' 
              element = {
              <ProtectedRoute>
                <Budgets />
              </ProtectedRoute>
            } />

            <Route 
              path = '/add-transaction' 
              element = {
              <ProtectedRoute>
                <AddTransaction />
              </ProtectedRoute>
            } />

            <Route 
              path = '/edit-transaction/:id' 
              element = {
              <ProtectedRoute>
                <EditTransaction />
              </ProtectedRoute>
            } />

            <Route 
              path = '/add-budget' 
              element = {
              <ProtectedRoute>
                <AddBudget />
              </ProtectedRoute>
            } />
            
            <Route 
              path = '/edit-budget/:id' 
              element = {
              <ProtectedRoute>
                <EditBudget />
              </ProtectedRoute>
            } />

            <Route 
              path = '/budgets/:id' 
              element = {
              <ProtectedRoute>
                <BudgetDetails/>
              </ProtectedRoute>
            } />

            <Route 
              path ='/analytics' 
              element = {
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            } />
            
        </Routes>
    </div>
  )
}

export default App
