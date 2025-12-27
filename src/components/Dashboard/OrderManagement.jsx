import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Download, Eye, CheckCircle, XCircle } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import DataTable from './UI/DataTable';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';

const OrderManagement = () => {
  const { orders, updateOrderStatus } = useDashboard();
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(o => o.status === filterStatus);

  const stats = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    paid: orders.filter(o => o.status === 'paid').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  };

  const columns = [
    { 
      key: 'id', 
      label: 'Order ID', 
      sortable: true,
      render: (value) => <span className="font-mono text-emerald-600 font-semibold">#{value}</span>
    },
    { key: 'userName', label: 'Customer', sortable: true },
    { key: 'game', label: 'Game', sortable: true },
    { key: 'package', label: 'Package' },
    { 
      key: 'amount', 
      label: 'Amount', 
      sortable: true,
      render: (value) => <span className="font-semibold">Rp {value.toLocaleString('id-ID')}</span>
    },
    { key: 'paymentMethod', label: 'Payment' },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          value === 'paid' ? 'bg-emerald-100 text-emerald-700' :
          value === 'pending' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
    {
      key: 'createdAt',
      label: 'Time',
      render: (value) => (
        <span className="text-sm text-gray-600">
          {formatDistanceToNow(new Date(value), { addSuffix: true })}
        </span>
      )
    }
  ];

  const handleStatusUpdate = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    toast.success(`Order #${orderId} status updated to ${newStatus}`);
    setSelectedOrder(null);
  };

  const handleExport = () => {
    const csv = [
      ['Order ID', 'Customer', 'Game', 'Package', 'Amount', 'Payment', 'Status', 'Date'],
      ...filteredOrders.map(o => [
        o.id, o.userName, o.game, o.package, o.amount, o.paymentMethod, o.status, o.createdAt
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${new Date().toISOString()}.csv`;
    a.click();
    toast.success('Orders exported successfully');
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'All Orders', value: stats.all, filterValue: 'all', color: 'blue' },
          { label: 'Pending', value: stats.pending, filterValue: 'pending', color: 'yellow' },
          { label: 'Paid', value: stats.paid, filterValue: 'paid', color: 'emerald' },
          { label: 'Cancelled', value: stats.cancelled, filterValue: 'cancelled', color: 'red' }
        ].map((stat) => (
          <button
            key={stat.filterValue}
            onClick={() => setFilterStatus(stat.filterValue)}
            className={`p-4 rounded-xl border-2 transition-all ${
              filterStatus === stat.filterValue
                ? `border-${stat.color}-500 bg-${stat.color}-50`
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </button>
        ))}
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            Showing {filteredOrders.length} orders
          </span>
        </div>
        
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-lime-500 text-white rounded-xl hover:shadow-lg transition-all"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Orders Table */}
      <DataTable
        data={filteredOrders}
        columns={columns}
        searchPlaceholder="Search by ID, customer, or game..."
        onRowClick={setSelectedOrder}
      />

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setSelectedOrder(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Order Details</h3>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-mono text-lg font-semibold text-emerald-600">#{selectedOrder.id}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Customer</p>
                      <p className="font-semibold">{selectedOrder.userName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payment</p>
                      <p className="font-semibold">{selectedOrder.paymentMethod}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Game</p>
                    <p className="font-semibold">{selectedOrder.game}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Package</p>
                    <p className="font-semibold">{selectedOrder.package}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Amount</p>
                    <p className="text-2xl font-bold text-gray-900">
                      Rp {selectedOrder.amount.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Current Status</p>
                    <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                      selectedOrder.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                      selectedOrder.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </span>
                  </div>
                </div>

                {selectedOrder.status === 'pending' && (
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => handleStatusUpdate(selectedOrder.id, 'paid')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-lime-500 text-white rounded-xl hover:shadow-lg transition-all"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Mark as Paid
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(selectedOrder.id, 'cancelled')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-xl hover:shadow-lg transition-all"
                    >
                      <XCircle className="w-5 h-5" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderManagement;
