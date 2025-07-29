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



const App = () => {
  return (
    <div className='min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950'>
        <Navbar />
        <Routes>
            <Route path = '/' element={<Login />} />
            <Route path = '/signup' element = {<SignUp />} />
            <Route path = '/home' element = {<DashBoard />} />
            <Route path = '/transactions' element = {<Transactions/>} />
            <Route path = '/budgets' element = {<Budgets />} />
            <Route path = '/add-transaction' element = {<AddTransaction />} />
            <Route path = '/edit-transaction/:id' element = {<EditTransaction />} />
            <Route path = '/add-budget' element = {<AddBudget />} />
            <Route path = '/edit-budget/:id' element = {<EditBudget />} />
            <Route path = '/budgets/:id' element = {<BudgetDetails/>} />
        </Routes>
    </div>
  )
}

export default App
