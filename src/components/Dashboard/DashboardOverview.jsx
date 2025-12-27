import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, Users, TrendingUp, Clock, Package } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import { formatDistanceToNow } from 'date-fns';
import StatCard from './UI/StatCard';
import Chart from './UI/Chart';
import DataTable from './UI/DataTable';

const DashboardOverview = () => {
  const { statistics, orders, games, activityFeed } = useDashboard();

  // Generate sales data for last 7 days
  const salesData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      name: date.toLocaleDateString('id-ID', { weekday: 'short' }),
      value: Math.floor(Math.random() * 10000000) + 5000000
    };
  });

  // Recent orders (last 10)
  const recentOrders = orders.slice(0, 10);

  // Top selling games
  const gameSales = games
    .map(game => ({
      ...game,
      totalSales: Math.floor(Math.random() * 1000) + 100
    }))
    .sort((a, b) => b.totalSales - a.totalSales)
    .slice(0, 5);

  const orderColumns = [
    { 
      key: 'id', 
      label: 'Order ID',
      render: (value) => <span className="font-mono text-emerald-600">#{value}</span>
    },
    { key: 'userName', label: 'Customer' },
    { key: 'game', label: 'Game' },
    { 
      key: 'amount', 
      label: 'Amount',
      render: (value) => <span className="font-semibold">Rp {value.toLocaleString('id-ID')}</span>
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          value === 'paid' ? 'bg-emerald-100 text-emerald-700' :
          value === 'pending' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Statistics Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          icon={DollarSign}
          title="Total Sales"
          value={`Rp ${(statistics.totalSales / 1000000).toFixed(1)}M`}
          trend={statistics.trend.sales}
          color="emerald"
        />
        <StatCard
          icon={ShoppingCart}
          title="Orders Today"
          value={statistics.ordersToday}
          trend={statistics.trend.orders}
          color="blue"
        />
        <StatCard
          icon={Users}
          title="Active Users"
          value={statistics.activeUsers.toLocaleString()}
          trend={statistics.trend.users}
          color="purple"
        />
        <StatCard
          icon={TrendingUp}
          title="Revenue"
          value={`Rp ${(statistics.revenue / 1000000).toFixed(1)}M`}
          trend={statistics.trend.revenue}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2">
          <Chart 
            data={salesData} 
            type="area" 
            title="Sales Last 7 Days"
          />
        </div>

        {/* Live Activity Feed */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
            <h3 className="text-lg font-bold text-gray-900">Live Activity</h3>
          </div>
          
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {activityFeed.slice(0, 10).map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-emerald-50/50 transition-colors"
              >
                <Clock className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">{activity.message}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders & Top Games - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h3>
            <DataTable 
              data={recentOrders}
              columns={orderColumns}
              searchable={false}
              itemsPerPage={5}
            />
          </div>
        </div>

        {/* Top Selling Games */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Selling Games</h3>
          <div className="space-y-3">
            {gameSales.map((game, idx) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-lime-500 flex items-center justify-center text-white font-bold text-sm">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{game.name}</p>
                  <p className="text-xs text-gray-600">{game.totalSales} sales</p>
                </div>
                <Package className="w-5 h-5 text-emerald-600" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-gradient-to-br from-emerald-500 to-lime-500 rounded-2xl p-6 text-white shadow-xl">
          <Package className="w-8 h-8 mb-3 opacity-80" />
          <p className="text-emerald-100 text-sm">Total Games</p>
          <p className="text-3xl font-bold mt-1">{games.length}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl">
          <ShoppingCart className="w-8 h-8 mb-3 opacity-80" />
          <p className="text-blue-100 text-sm">Total Orders</p>
          <p className="text-3xl font-bold mt-1">{orders.length}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl">
          <TrendingUp className="w-8 h-8 mb-3 opacity-80" />
          <p className="text-purple-100 text-sm">Conversion Rate</p>
          <p className="text-3xl font-bold mt-1">23.4%</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
