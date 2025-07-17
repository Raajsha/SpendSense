import { useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import Modal from '../../components/UI/Modal';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import TransactionForm from './TransactionForm';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

const Transactions = () => {
  const {
    transactions,
    loading,
    fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    category: '',
    startDate: '',
    endDate: '',
  });

  const handleAddTransaction = async (transactionData) => {
    setFormLoading(true);
    const result = await addTransaction(transactionData);
    if (result.success) {
      setIsModalOpen(false);
      setEditingTransaction(null);
    }
    setFormLoading(false);
  };

  const handleUpdateTransaction = async (transactionData) => {
    setFormLoading(true);
    const result = await updateTransaction(editingTransaction._id, transactionData);
    if (result.success) {
      setIsModalOpen(false);
      setEditingTransaction(null);
    }
    setFormLoading(false);
  };

  const handleDeleteTransaction = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      await deleteTransaction(id);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    const filterParams = {};
    if (filters.type) filterParams.type = filters.type;
    if (filters.category) filterParams.category = filters.category;
    if (filters.startDate) filterParams.start = filters.startDate;
    if (filters.endDate) filterParams.end = filters.endDate;
    
    fetchTransactions(filterParams);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      type: '',
      category: '',
      startDate: '',
      endDate: '',
    });
    fetchTransactions();
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      return (
        transaction.category.toLowerCase().includes(searchTerm) ||
        (transaction.note && transaction.note.toLowerCase().includes(searchTerm))
      );
    }
    return true;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Salary',
    'Freelance',
    'Business',
    'Investment',
    'Gift',
    'Other',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <Button
          onClick={() => {
            setEditingTransaction(null);
            setIsModalOpen(true);
          }}
          className="mt-4 sm:mt-0"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              name="search"
              placeholder="Search transactions..."
              value={filters.search}
              onChange={handleFilterChange}
              className="pl-10"
            />
          </div>

          <Select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Select>

          <Select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>

          <Input
            name="startDate"
            type="date"
            value={filters.startDate}
            onChange={handleFilterChange}
            placeholder="Start Date"
          />

          <div className="flex space-x-2">
            <Input
              name="endDate"
              type="date"
              value={filters.endDate}
              onChange={handleFilterChange}
              placeholder="End Date"
            />
            <Button
              variant="outline"
              onClick={applyFilters}
              className="px-3"
            >
              <Filter className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              onClick={clearFilters}
              className="px-3"
            >
              Clear
            </Button>
          </div>
        </div>
      </Card>

      {/* Transactions List */}
      <Card>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <LoadingSpinner size="lg" />
          </div>
        ) : filteredTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Note
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {transaction.type === 'income' ? (
                          <TrendingUp className="h-4 w-4 text-success-500 mr-2" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-error-500 mr-2" />
                        )}
                        <span className={`text-sm font-medium capitalize ${
                          transaction.type === 'income' ? 'text-success-600' : 'text-error-600'
                        }`}>
                          {transaction.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className={
                        transaction.type === 'income' ? 'text-success-600' : 'text-error-600'
                      }>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {transaction.note || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingTransaction(transaction);
                            setIsModalOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="error"
                          size="sm"
                          onClick={() => handleDeleteTransaction(transaction._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-100 p-3 rounded-full w-12 h-12 mx-auto mb-4">
              <Plus className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
            <p className="text-gray-500 mb-4">Get started by adding your first transaction.</p>
            <Button
              onClick={() => {
                setEditingTransaction(null);
                setIsModalOpen(true);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Transaction
            </Button>
          </div>
        )}
      </Card>

      {/* Transaction Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
        }}
        title={editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
        size="lg"
      >
        <TransactionForm
          transaction={editingTransaction}
          onSubmit={editingTransaction ? handleUpdateTransaction : handleAddTransaction}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingTransaction(null);
          }}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
};

export default Transactions;