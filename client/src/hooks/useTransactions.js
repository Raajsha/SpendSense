import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async (filters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const response = await axios.get(`http://localhost:5001/transaction?${params}`);
      setTransactions(response.data);
    } catch (error) {
      toast.error('Failed to fetch transactions');
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transactionData) => {
    try {
      const response = await axios.post('http://localhost:5001/transaction/add', transactionData);
      setTransactions(prev => [response.data, ...prev]);
      toast.success('Transaction added successfully');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add transaction';
      toast.error(message);
      return { success: false, message };
    }
  };

  const updateTransaction = async (id, transactionData) => {
    try {
      const response = await axios.put(`http://localhost:5001/transaction/${id}`, transactionData);
      setTransactions(prev => 
        prev.map(t => t._id === id ? response.data : t)
      );
      toast.success('Transaction updated successfully');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update transaction';
      toast.error(message);
      return { success: false, message };
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/transaction/${id}`);
      setTransactions(prev => prev.filter(t => t._id !== id));
      toast.success('Transaction deleted successfully');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete transaction';
      toast.error(message);
      return { success: false, message };
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    loading,
    fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
};