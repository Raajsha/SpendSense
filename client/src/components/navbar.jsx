import { LogOut,User } from "lucide-react"
import { useNavigate, Link } from "react-router-dom"
import  { useAuth }  from "../context/AuthContext.jsx"
const Navbar = () => {
    const {user,logout, isAuthenticated} = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }
  return (
    <div className="sticky top-0 bg-white border-b border-gray-200 shadow-lg ">
      <div className="container mx-auto px-4 ">
        <div className="flex justify-between items-center min-h-16">
            <Link to ='/home'
              className = 'flex items-center space-x-2 justify-right text-2xl font-bold transition-colors bg-gradient-to-r from-teal-200 via-cyan-400 to-blue-600 bg-clip-text text-transparent'>
                <span>Spend Sense</span>
            </Link>

            <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                    <>
                        <div className="flex items-center space-x-1">
                            <Link 
                            to = '/transactions'
                            className = 'flex items-center space-x-1 px-4 py-2'>
                                <span>Transactions</span>
                            </Link>

                            <Link 
                            to = '/budgets'
                            className = 'flex items-center space-x-1 px-4 py-2'>
                                <span>Budgets</span>
                            </Link>

                            <Link 
                            to = '/analytics'
                            className = 'flex items-center space-x-1 px-4 py-2'>
                                <span>Analytics</span>
                            </Link>

                            {user.role === 'admin' && (
                                <Link 
                                to = '/'
                                className = 'flex items-center space-x-1 px-4 py-2'>
                                    <span>Admin Panel</span>
                                </Link>
                            )}
                        </div>

                        <div className="flex items-center space-x-4">
                            <Link 
                            to = '/profile'
                            className = 'flex items-center space-x-1 px-4 py-2'>
                                <User size ={ 12 } />
                                <span>{user.username}</span>
                            </Link>

                            <button 
                            onClick={handleLogout}
                            className="relative group flex items-center space-x-1 transition-colors">
                                <LogOut size = { 16 } />
                            </button>
                        </div>
                    </>
                ): (
                    <>
                        <Link 
                        to = '/signup'
                        className = 'flex items-center  text-xl space-x-1 px-4 py-2'>
                            <span>Sign Up</span>
                        </Link>

                        <Link 
                        to = '/'
                        className = 'flex items-center text-xl space-x-1 px-4 py-2'>
                            <span>Login</span>
                        </Link>    
                    </>
                )}
              </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
