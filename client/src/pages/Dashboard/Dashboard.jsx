import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTransactions } from '../../hooks/useTransactions';
import { useBudgets } from '../../hooks/useBudgets';
import Card from '../../components/UI/Card';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Calendar,
  PieChart,
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { transactions, loading: transactionsLoading } = useTransactions();
  const { warnings, loading: budgetsLoading } = useBudgets();
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
  });

  useEffect(() => {
    if (transactions.length > 0) {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      const monthlyIncome = transactions
        .filter(t => {
          const date = new Date(t.date);
          return t.type === 'income' && 
                 date.getMonth() === currentMonth && 
                 date.getFullYear() === currentYear;
        })
        .reduce((sum, t) => sum + t.amount, 0);

      const monthlyExpenses = transactions
        .filter(t => {
          const date = new Date(t.date);
          return t.type === 'expense' && 
                 date.getMonth() === currentMonth && 
                 date.getFullYear() === currentYear;
        })
        .reduce((sum, t) => sum + t.amount, 0);

      setStats({
        totalIncome,
        totalExpenses,
        balance: totalIncome - totalExpenses,
        monthlyIncome,
        monthlyExpenses,
      });
    }
  }, [transactions]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const recentTransactions = transactions.slice(0, 5);
  const budgetWarnings = warnings.filter(w => w.warning);

  if (transactionsLoading || budgetsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.username}!
        </h1>
        <p className="text-primary-100">
          Here's your financial overview for today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-success-50 to-success-100 border-success-200">
          <div className="flex items-center">
            <div className="bg-success-500 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-success-600">Total Income</p>
              <p className="text-2xl font-bold text-success-900">
                {formatCurrency(stats.totalIncome)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-error-50 to-error-100 border-error-200">
          <div className="flex items-center">
            <div className="bg-error-500 p-3 rounded-lg">
              <TrendingDown className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-error-600">Total Expenses</p>
              <p className="text-2xl font-bold text-error-900">
                {formatCurrency(stats.totalExpenses)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
          <div className="flex items-center">
            <div className="bg-primary-500 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-primary-600">Balance</p>
              <p className={`text-2xl font-bold ${stats.balance >= 0 ? 'text-success-900' : 'text-error-900'}`}>
                {formatCurrency(stats.balance)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-warning-50 to-warning-100 border-warning-200">
          <div className="flex items-center">
            <div className="bg-warning-500 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-warning-600">This Month</p>
              <p className="text-lg font-bold text-warning-900">
                {formatCurrency(stats.monthlyIncome - stats.monthlyExpenses)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Transactions */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          
          {recentTransactions.length > 0 ? (
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{transaction.category}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'income' ? 'text-success-600' : 'text-error-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>
                    <p className="text-sm text-gray-500 capitalize">{transaction.type}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No transactions yet</p>
          )}
        </Card>

        {/* Budget Warnings */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Budget Alerts</h2>
            <AlertTriangle className="h-5 w-5 text-warning-500" />
          </div>
          
          {budgetWarnings.length > 0 ? (
            <div className="space-y-3">
              {budgetWarnings.map((warning, index) => (
                <div key={index} className="p-3 bg-warning-50 border border-warning-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-warning-800">{warning.category}</p>
                      <p className="text-sm text-warning-600">
                        {formatCurrency(warning.spent)} of {formatCurrency(warning.budget)} spent
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-warning-800">
                        {Math.round((warning.spent / warning.budget) * 100)}%
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 bg-warning-200 rounded-full h-2">
                    <div
                      className="bg-warning-500 h-2 rounded-full"
                      style={{ width: `${Math.min((warning.spent / warning.budget) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="bg-success-100 p-3 rounded-full w-12 h-12 mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-success-600" />
              </div>
              <p className="text-gray-500">All budgets are on track!</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;