import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import Budget from '../models/Budget.js';
import mongoose from 'mongoose';

export const getAdminStats = async (req, res) => {
  try {
    // Get total users count
    const totalUsers = await User.countDocuments();
    
    // Get active users (users who have made transactions in the last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const activeUserIds = await Transaction.distinct('user', {
      createdAt: { $gte: thirtyDaysAgo }
    });
    const activeUsers = activeUserIds.length;
    
    // Get total transactions
    const totalTransactions = await Transaction.countDocuments();
    
    // Get total transaction amount
    const totalAmountResult = await Transaction.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);
    const totalAmount = totalAmountResult[0]?.totalAmount || 0;
    
    // Get recent users (last 5)
    const recentUsers = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.status(200).json({
      totalUsers,
      activeUsers,
      totalTransactions,
      totalAmount,
      recentUsers,
      systemHealth: 'good'
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ message: 'Failed to fetch admin statistics' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });
    
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role } = req.body;
    
    // Validate input
    if (!username || !email || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Check if email is already taken by another user
    const existingUser = await User.findOne({ 
      email, 
      _id: { $ne: id } 
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, role },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update user' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Don't allow admin to delete themselves
    if (id === req.user.id) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }
    
    // Delete user and all related data
    await Promise.all([
      User.findByIdAndDelete(id),
      Transaction.deleteMany({ user: id }),
      Budget.deleteMany({ user: id })
    ]);
    
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

export const suspendUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { suspended } = req.body;
    
    // Don't allow admin to suspend themselves
    if (id === req.user.id) {
      return res.status(400).json({ message: 'Cannot suspend your own account' });
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { suspended },
      { new: true }
    ).select('-password');
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ message: 'Failed to update user status' });
  }
};

export const getSystemAnalytics = async (req, res) => {
  try {
    const { timeRange = '6months' } = req.query;
    
    // Calculate date range
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
    
    // User growth data
    const userGrowth = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          users: { $sum: 1 }
        }
      },
      {
        $project: {
          month: {
            $concat: [
              { $toString: '$_id.year' },
              '-',
              {
                $cond: {
                  if: { $lt: ['$_id.month', 10] },
                  then: { $concat: ['0', { $toString: '$_id.month' }] },
                  else: { $toString: '$_id.month' }
                }
              }
            ]
          },
          users: 1
        }
      },
      { $sort: { month: 1 } }
    ]);
    
    // Transaction volume data
    const transactionVolume = await Transaction.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          transactions: { $sum: 1 }
        }
      },
      {
        $project: {
          month: {
            $concat: [
              { $toString: '$_id.year' },
              '-',
              {
                $cond: {
                  if: { $lt: ['$_id.month', 10] },
                  then: { $concat: ['0', { $toString: '$_id.month' }] },
                  else: { $toString: '$_id.month' }
                }
              }
            ]
          },
          transactions: 1
        }
      },
      { $sort: { month: 1 } }
    ]);
    
    // Category breakdown
    const categoryBreakdown = await Transaction.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$category',
          value: { $sum: 1 }
        }
      },
      {
        $project: {
          name: '$_id',
          value: 1,
          _id: 0
        }
      },
      { $sort: { value: -1 } },
      { $limit: 10 }
    ]);
    
    // Revenue data (total transaction amounts)
    const revenueData = await Transaction.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          revenue: { $sum: '$amount' }
        }
      },
      {
        $project: {
          month: {
            $concat: [
              { $toString: '$_id.year' },
              '-',
              {
                $cond: {
                  if: { $lt: ['$_id.month', 10] },
                  then: { $concat: ['0', { $toString: '$_id.month' }] },
                  else: { $toString: '$_id.month' }
                }
              }
            ]
          },
          revenue: 1
        }
      },
      { $sort: { month: 1 } }
    ]);
    
    // Summary statistics
    const totalUsers = await User.countDocuments();
    const totalTransactions = await Transaction.countDocuments({
      createdAt: { $gte: startDate }
    });
    
    const totalRevenueResult = await Transaction.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$amount' }
        }
      }
    ]);
    
    const totalRevenue = totalRevenueResult[0]?.totalRevenue || 0;
    const avgTransactionValue = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;
    
    res.status(200).json({
      userGrowth,
      transactionVolume,
      categoryBreakdown,
      revenueData,
      summary: {
        totalUsers,
        totalTransactions,
        totalRevenue,
        avgTransactionValue
      }
    });
  } catch (error) {
    console.error('Error fetching system analytics:', error);
    res.status(500).json({ message: 'Failed to fetch system analytics' });
  }
};

export const exportData = async (req, res) => {
  try {
    const { type } = req.params;
    
    let data;
    let filename;
    
    switch (type) {
      case 'users':
        data = await User.find().select('-password');
        filename = 'users_export.json';
        break;
      case 'transactions':
        data = await Transaction.find().populate('user', 'username email');
        filename = 'transactions_export.json';
        break;
      case 'budgets':
        data = await Budget.find().populate('user', 'username email');
        filename = 'budgets_export.json';
        break;
      default:
        return res.status(400).json({ message: 'Invalid export type' });
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error exporting data:', error);
    res.status(500).json({ message: 'Failed to export data' });
  }
};