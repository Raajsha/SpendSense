import express from 'express';
import {
  getAdminStats,
  getAllUsers,
  updateUser,
  deleteUser,
  suspendUser,
  getSystemAnalytics,
  exportData,
} from '../controllers/adminController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();


// Admin dashboard stats
router.get('/stats', getAdminStats);

// User management
router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/suspend', suspendUser);

// System analytics
router.get('/analytics', getSystemAnalytics);

// Data export
router.get('/export/:type', exportData);

export default router;