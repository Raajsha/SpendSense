import { useState } from 'react';
import { useBudgets } from '../../hooks/useBudgets';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import BudgetForm from './BudgetForm';
import {
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Target,
} from 'lucide-react';

const Budgets = () => {
  const {
    budgets,
    warnings,
    loading,
    addBudget,
    updateBudget,
    deleteBudget,
  } = useBudgets();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const handleAddBudget = async (budgetData) => {
    setFormLoading(true);
    const result = await addBudget(budgetData);
    if (result.success) {
      setIsModalOpen(false);
      setEditingBudget(null);
    }
    setFormLoading(false);
  };

  const handleUpdateBudget = async (budgetData) => {
    setFormLoading(true);
    const result = await updateBudget(editingBudget._id, budgetData);
    if (result.success) {
      setIsModalOpen(false);
      setEditingBudget(null);
    }
    setFormLoading(false);
  };

  const handleDeleteBudget = async (id) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      await deleteBudget(id);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getBudgetStatus = (category) => {
    const warning = warnings.find(w => w.category === category);
    if (!warning) return { status: 'unknown', spent: 0, percentage: 0 };
    
    const percentage = (warning.spent / warning.budget) * 100;
    let status = 'good';
    
    if (percentage >= 100) status = 'exceeded';
    else if (percentage >= 80) status = 'warning';
    
    return {
      status,
      spent: warning.spent,
      percentage: Math.min(percentage, 100),
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'good':
        return 'bg-success-500';
      case 'warning':
        return 'bg-warning-500';
      case 'exceeded':
        return 'bg-error-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="h-5 w-5 text-success-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-warning-600" />;
      case 'exceeded':
        return <AlertTriangle className="h-5 w-5 text-error-600" />;
      default:
        return <Target className="h-5 w-5 text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Budgets</h1>
        <Button
          onClick={() => {
            setEditingBudget(null);
            setIsModalOpen(true);
          }}
          className="mt-4 sm:mt-0"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Budget
        </Button>
      </div>

      {/* Budget Overview */}
      {warnings.length > 0 && (
        <Card className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-primary-900">Budget Overview</h2>
              <p className="text-primary-700">
                {warnings.filter(w => w.warning).length} of {warnings.length} budgets need attention
              </p>
            </div>
            <Target className="h-8 w-8 text-primary-600" />
          </div>
        </Card>
      )}

      {/* Budgets Grid */}
      {budgets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget) => {
            const status = getBudgetStatus(budget.category);
            
            return (
              <Card key={budget._id} className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(status.status)}
                    <h3 className="text-lg font-semibold text-gray-900">
                      {budget.category}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingBudget(budget);
                        setIsModalOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="error"
                      size="sm"
                      onClick={() => handleDeleteBudget(budget._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Budget</span>
                    <span className="font-medium">{formatCurrency(budget.budget)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Spent</span>
                    <span className={`font-medium ${
                      status.status === 'exceeded' ? 'text-error-600' : 
                      status.status === 'warning' ? 'text-warning-600' : 'text-success-600'
                    }`}>
                      {formatCurrency(status.spent)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Remaining</span>
                    <span className={`font-medium ${
                      budget.budget - status.spent < 0 ? 'text-error-600' : 'text-success-600'
                    }`}>
                      {formatCurrency(Math.max(0, budget.budget - status.spent))}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Progress</span>
                      <span>{status.percentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getStatusColor(status.status)}`}
                        style={{ width: `${status.percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Status Message */}
                  {status.status === 'exceeded' && (
                    <div className="bg-error-50 border border-error-200 rounded-md p-2">
                      <p className="text-xs text-error-700">
                        Budget exceeded by {formatCurrency(status.spent - budget.budget)}
                      </p>
                    </div>
                  )}
                  
                  {status.status === 'warning' && (
                    <div className="bg-warning-50 border border-warning-200 rounded-md p-2">
                      <p className="text-xs text-warning-700">
                        Approaching budget limit
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <div className="text-center py-12">
            <div className="bg-gray-100 p-3 rounded-full w-12 h-12 mx-auto mb-4">
              <Target className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No budgets set</h3>
            <p className="text-gray-500 mb-4">Create your first budget to start tracking your spending.</p>
            <Button
              onClick={() => {
                setEditingBudget(null);
                setIsModalOpen(true);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Budget
            </Button>
          </div>
        </Card>
      )}

      {/* Budget Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingBudget(null);
        }}
        title={editingBudget ? 'Edit Budget' : 'Add Budget'}
      >
        <BudgetForm
          budget={editingBudget}
          onSubmit={editingBudget ? handleUpdateBudget : handleAddBudget}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingBudget(null);
          }}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
};

export default Budgets;