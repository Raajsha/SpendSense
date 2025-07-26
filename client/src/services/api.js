import axios from 'axios'

const API_BASE_URL = 'http://localhost:5001'

const api = axios.create({
    baseURL : API_BASE_URL,
    headers: {
        'Content-Type' : 'application/json'
    },
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.request.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401){
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export const authAPI = {
    login: (credentials) => api.post('/auth/login',credentials),
    register : (userData) => api.post('/auth/register',userData)
}

export const budgetAPI = {
    addBudget : (budgetData) => api.post('/budgets',budgetData),
    updateBudget : (id,budgetData) => api.put(`/budgets/${id}`,budgetData),
    deleteBudget : (id) => api.delete(`/budgets/${id}`),
    getBudget : (params) => api.get('/budgets/get',{ params }),
    getWarnings : () => api.get('/budgets/warnings')
}

export const transactionAPI = {
    getTxn : () => api.get('/transaction'),
    getTxnById : (id) => api.get(`/transaction/${id}`),
    addTxn : (TxnData) => api.post('/transaction/add',TxnData),
    updateTxn : (id,TxnData) => api.put(`/transaction/${id}`,TxnData),
    deleteTxn : (id) => api.delete(`/transaction/${id}`)
}

export const userAPI = {
    getProfile : (id) => api.get(`/profile/${id}`),
    updateProfile : (id,userData) => api.put(`/profile/${id}`,userData),
    deleteProfile : (id) => api.delete(`/profile/${id}`)
}

export const adminAPI = {
    getStats : () => api.get('/admin/stats'),
    getAllUsers : () => api.get('/admin/users'),
    getUserById : (id) => api.get(`/admin/users/${id}`),
}

export default api