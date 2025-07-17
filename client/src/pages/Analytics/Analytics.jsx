import { useState, useEffect } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import Card from '../../components/UI/Card';
import Select from '../../components/UI/Select';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
} from 'lucide-react';

const Analytics = () => {
  const { transactions, loading } = useTransactions();
  const [timeRange, setTimeRange] = useState('6months');
  const [analyticsData, setAnalyticsData] = useState({
    monthlyData: [],
    categoryData: [],
    trendData: [],
    summary: {
      totalIncome: 0,
      totalExpenses: 0,
      avgMonthlyIncome: 0,
      avgMonthlyExpenses: 0,
    },
  });

  const COLORS = [
    '#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6',
    '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1',
  ];

  useEffect(() => {
    if (transactions.length > 0) {
      processAnalyticsData();
    }
  }, [transactions, timeRange]);

  const processAnalyticsData = () => {
    const now = new Date();
    let startDate;

    switch (timeRange) {
      case '3months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        break;
      case '6months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
        break;
      case '1year':
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), 1);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
    }

    const filteredTransactions = transactions.filter(
      t => new Date(t.date) >= startDate
    );

    // Monthly data for bar chart
    const monthlyMap = {};
    filteredTransactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyMap[monthKey]) {
        monthlyMap[monthKey] = { month: monthKey, income: 0, expenses: 0 };
      }
      
      if (transaction.type === 'income') {
        monthlyMap[monthKey].income += transaction.amount;
      } else {
        monthlyMap[monthKey].expenses += transaction.amount;
      }
    });

    const monthlyData = Object.values(monthlyMap).sort((a, b) => a.month.localeCompare(b.month));

    // Category data for pie chart (expenses only)
    const categoryMap = {};
    filteredTransactions
      .filter(t => t.type === 'expense')
      .forEach(transaction => {
        if (!categoryMap[transaction.category]) {
          categoryMap[transaction.category] = 0;
        }
        categoryMap[transaction.category] += transaction.amount;
      });

    const categoryData = Object.entries(categoryMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);

    // Trend data for line chart
    const trendData = monthlyData.map(item => ({
      month: item.month,
      balance: item.income - item.expenses,
    }));

    // Summary calculations
    const totalIncome = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const monthsCount = monthlyData.length || 1;

    setAnalyticsData({
      monthlyData,
      categoryData,
      trendData,
      summary: {
        totalIncome,
        totalExpenses,
        avgMonthlyIncome: totalIncome / monthsCount,
        avgMonthlyExpenses: totalExpenses / monthsCount,
      },
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatMonth = (monthStr) => {
    const [year, month] = monthStr.split('-');
    return new Date(year, month - 1).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
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
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <Select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="mt-4 sm:mt-0 w-full sm:w-auto"
        >
          <option value="3months">Last 3 Months</option>
          <option value="6months">Last 6 Months</option>
          <option value="1year">Last Year</option>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-success-50 to-success-100 border-success-200">
          <div className="flex items-center">
            <div className="bg-success-500 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-success-600">Total Income</p>
              <p className="text-2xl font-bold text-success-900">
                {formatCurrency(analyticsData.summary.totalIncome)}
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
                {formatCurrency(analyticsData.summary.totalExpenses)}
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
              <p className="text-sm font-medium text-primary-600">Avg Monthly Income</p>
              <p className="text-2xl font-bold text-primary-900">
                {formatCurrency(analyticsData.summary.avgMonthlyIncome)}
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
              <p className="text-sm font-medium text-warning-600">Avg Monthly Expenses</p>
              <p className="text-2xl font-bold text-warning-900">
                {formatCurrency(analyticsData.summary.avgMonthlyExpenses)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Income vs Expenses */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Income vs Expenses</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  tickFormatter={formatMonth}
                  fontSize={12}
                />
                <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} fontSize={12} />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), '']}
                  labelFormatter={formatMonth}
                />
                <Bar dataKey="income" fill="#22c55e" name="Income" />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Expense Categories */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Expense Categories</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analyticsData.categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [formatCurrency(value), 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Balance Trend */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Balance Trend</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analyticsData.trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tickFormatter={formatMonth}
                fontSize={12}
              />
              <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} fontSize={12} />
              <Tooltip 
                formatter={(value) => [formatCurrency(value), 'Balance']}
                labelFormatter={formatMonth}
              />
              <Line 
                type="monotone" 
                dataKey="balance" 
                stroke="#0ea5e9" 
                strokeWidth={2}
                dot={{ fill: '#0ea5e9' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;