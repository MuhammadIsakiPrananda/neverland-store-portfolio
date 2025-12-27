import React from 'react';
import { motion } from 'framer-motion';
import { Shield, UserCog } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import DataTable from './UI/DataTable';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';

const UserManagement = () => {
  const { users, updateUserRole } = useDashboard();

  const handleRoleChange = (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    updateUserRole(userId, newRole);
    toast.success(`User role updated to ${newRole}`);
  };

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (value) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          value === 'admin' 
            ? 'bg-purple-100 text-purple-700' 
            : 'bg-gray-100 text-gray-700'
        }`}>
          {value === 'admin' ? '👑 Admin' : '👤 User'}
        </span>
      )
    },
    {
      key: 'totalOrders',
      label: 'Orders',
      sortable: true,
      render: (value) => <span className="font-semibold">{value}</span>
    },
    {
      key: 'totalSpent',
      label: 'Total Spent',
      sortable: true,
      render: (value) => <span className="font-semibold text-emerald-600">Rp {value.toLocaleString('id-ID')}</span>
    },
    {
      key: 'lastActive',
      label: 'Last Active',
      render: (value) => (
        <span className="text-sm text-gray-600">
          {formatDistanceToNow(new Date(value), { addSuffix: true })}
        </span>
      )
    },
    {
      key: 'id',
      label: 'Actions',
      render: (value, row) => (
        <button
          onClick={() => handleRoleChange(row.id, row.role)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm hover:shadow-lg transition-all"
        >
          <UserCog className="w-4 h-4" />
          Toggle Role
        </button>
      )
    }
  ];

  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    regularUsers: users.filter(u => u.role === 'user').length,
    activeToday: users.filter(u => {
      const lastActive = new Date(u.lastActive);
      const today = new Date();
      return lastActive.toDateString() === today.toDateString();
    }).length
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl">
          <Shield className="w-8 h-8 mb-3 opacity-80" />
          <p className="text-blue-100 text-sm">Total Users</p>
          <p className="text-3xl font-bold mt-1">{stats.total}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl">
          <UserCog className="w-8 h-8 mb-3 opacity-80" />
          <p className="text-purple-100 text-sm">Admins</p>
          <p className="text-3xl font-bold mt-1">{stats.admins}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-lime-500 rounded-2xl p-6 text-white shadow-xl">
          <Shield className="w-8 h-8 mb-3 opacity-80" />
          <p className="text-emerald-100 text-sm">Regular Users</p>
          <p className="text-3xl font-bold mt-1">{stats.regularUsers}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-6 text-white shadow-xl">
          <Shield className="w-8 h-8 mb-3 opacity-80" />
          <p className="text-orange-100 text-sm">Active Today</p>
          <p className="text-3xl font-bold mt-1">{stats.activeToday}</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-4">All Users</h3>
        <DataTable
          data={users}
          columns={columns}
          searchPlaceholder="Search users by name or email..."
        />
      </div>
    </div>
  );
};

export default UserManagement;
