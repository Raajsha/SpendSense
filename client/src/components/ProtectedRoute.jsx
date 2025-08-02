import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({children}) => {
    const {isAuthenticated,loading} = useAuth()

    if(loading){
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
        )
    }

    return isAuthenticated ? children : <Navigate to ='/login' replace />
}

export default ProtectedRoute