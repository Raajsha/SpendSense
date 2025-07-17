import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useBudgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBudgets = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5001/budgets');
      setBudgets(response.data);
    } catch (error) {
      toast.error('Failed to fetch budgets');
      console.error('Error fetching budgets:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWarnings = async () => {
    try {
      const response = await axios.get('http://localhost:5001/budgets/warnings');
      setWarnings(response.data);
    } catch (error) {
      console.error('Error fetching warnings:', error);
    }
  };

  const addBudget = async (budgetData) => {
    try {
      const response = await axios.post('http://localhost:5001/budgets', budgetData);
      setBudgets(prev => [...prev, response.data]);
      toast.success('Budget added successfully');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add budget';
      toast.error(message);
      return { success: false, message };
    }
  };

  const updateBudget = async (id, budgetData) => {
    try {
      const response = await axios.put(`http://localhost:5001/budgets/${id}`, budgetData);
      setBudgets(prev => 
        prev.map(b => b._id === id ? response.data : b)
      );
      toast.success('Budget updated successfully');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update budget';
      toast.error(message);
      return { success: false, message };
    }
  };

  const deleteBudget = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/budgets/${id}`);
      setBudgets(prev => prev.filter(b => b._id !== id));
      toast.success('Budget deleted successfully');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete budget';
      toast.error(message);
      return { success: false, message };
    }
  };

  useEffect(() => {
    fetchBudgets();
    fetchWarnings();
  }, []);

  return {
    budgets,
    warnings,
    loading,
    fetchBudgets,
    fetchWarnings,
    addBudget,
    updateBudget,
    deleteBudget,
  };
};