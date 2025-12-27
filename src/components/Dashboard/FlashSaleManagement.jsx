import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Plus, Edit, Trash2, X, Save, Clock, MessageSquare, Package } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const FlashSaleManagement = () => {
  const { flashSales, games, createFlashSale, updateFlashSale, deleteFlashSale } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFlashSale, setEditingFlashSale] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    discount: '',
    startTime: '',
    endTime: '',
    selectedGames: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const flashSaleData = {
      name: formData.name,
      discount: parseInt(formData.discount),
      startTime: new Date(formData.startTime).toISOString(),
      endTime: new Date(formData.endTime).toISOString(),
      gameIds: formData.selectedGames
    };

    if (editingFlashSale) {
      // Use id or _id depending on what's available
      const flashSaleId = editingFlashSale.id || editingFlashSale._id;
      updateFlashSale(flashSaleId, flashSaleData);
      toast.success('Flash sale updated successfully');
    } else {
      createFlashSale(flashSaleData);
      toast.success('Flash sale created successfully');
    }
    
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingFlashSale(null);
    setFormData({
      name: '',
      discount: '',
      startTime: '',
      endTime: '',
      selectedGames: []
    });
  };

  const handleEdit = (flashSale) => {
    setEditingFlashSale(flashSale);
    setFormData({
      name: flashSale.name || '',
      discount: flashSale.discount.toString(),
      startTime: new Date(flashSale.startTime).toISOString().slice(0, 16),
      endTime: new Date(flashSale.endTime).toISOString().slice(0, 16),
      selectedGames: flashSale.gameIds || []
    });
    setIsModalOpen(true);
  };

  const handleDelete = (flashSale) => {
    // Get ID (handle both id and _id for MongoDB)
    const flashSaleId = flashSale.id || flashSale._id;
    
    // Better UX with toast confirmation
    const confirmDelete = () => {
      deleteFlashSale(flashSaleId);
      toast.success('Flash sale deleted successfully');
    };

    toast((t) => (
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-gray-900">Delete Flash Sale?</p>
        <p className="text-sm text-gray-600">This action cannot be undone.</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => {
              confirmDelete();
              toast.dismiss(t.id);
            }}
            className="flex-1 px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex-1 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  const toggleGameSelection = (gameId) => {
    setFormData(prev => ({
      ...prev,
      selectedGames: prev.selectedGames.includes(gameId)
        ? prev.selectedGames.filter(id => id !== gameId)
        : [...prev.selectedGames, gameId]
    }));
  };

  const activeFlashSales = flashSales.filter(fs => {
    const now = new Date();
    const start = new Date(fs.startTime);
    const end = new Date(fs.endTime);
    return now >= start && now <= end;
  });

  const scheduledFlashSales = flashSales.filter(fs => new Date(fs.startTime) > new Date());
  const pastFlashSales = flashSales.filter(fs => new Date(fs.endTime) < new Date());

  const FlashSaleCard = ({ flashSale, type }) => {
    const getStatusConfig = () => {
      if (type === 'active') return {
        gradient: 'from-emerald-500 to-lime-500',
        bgLight: 'bg-emerald-50',
        textColor: 'text-emerald-700',
        borderColor: 'border-emerald-200',
        badge: 'LIVE NOW',
        badgeIcon: '🔥',
        animation: 'animate-pulse'
      };
      if (type === 'scheduled') return {
        gradient: 'from-blue-500 to-cyan-500',
        bgLight: 'bg-blue-50',
        textColor: 'text-blue-700',
        borderColor: 'border-blue-200',
        badge: 'SCHEDULED',
        badgeIcon: '📅',
        animation: ''
      };
      return {
        gradient: 'from-gray-400 to-gray-500',
        bgLight: 'bg-gray-50',
        textColor: 'text-gray-700',
        borderColor: 'border-gray-200',
        badge: 'ENDED',
        badgeIcon: '⏰',
        animation: ''
      };
    };

    const config = getStatusConfig();

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        className={`relative bg-white rounded-2xl border-2 ${config.borderColor} p-6 shadow-xl hover:shadow-2xl transition-all overflow-hidden group`}
      >
        {/* Background Gradient Overlay */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${config.gradient} opacity-5 rounded-full blur-3xl`} />
        
        {/* Status Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${config.gradient} ${config.animation} shadow-lg`}>
            <span className="text-white font-bold text-sm flex items-center gap-2">
              <span>{config.badgeIcon}</span>
              {config.badge}
            </span>
          </div>
          
          <div className="flex gap-2">
            {type !== 'past' && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleEdit(flashSale)}
                className="p-2.5 rounded-xl hover:bg-blue-100 text-blue-600 transition-all shadow-sm hover:shadow-md border border-blue-200"
              >
                <Edit className="w-4 h-4" />
              </motion.button>
            )}
            {type !== 'past' && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDelete(flashSale)}
                className="p-2.5 rounded-xl hover:bg-red-100 text-red-600 transition-all shadow-sm hover:shadow-md border border-red-200"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Discount Badge - HUGE and Eye-catching */}
        <div className="flex items-center gap-4 mb-4">
          <div className={`relative bg-gradient-to-br ${config.gradient} p-6 rounded-2xl shadow-lg`}>
            <div className="text-center">
              <div className="text-4xl font-black text-white leading-none">
                {flashSale.discount}%
              </div>
              <div className="text-xs text-white/80 font-semibold mt-1">OFF</div>
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <Zap className="w-3 h-3 text-yellow-900" />
            </div>
          </div>
          
          <div className="flex-1">
            <h4 className="text-xl font-bold text-gray-900 mb-1">
              {flashSale.name || `Flash Sale ${flashSale.discount}%`}
            </h4>
            <p className={`text-sm font-semibold ${config.textColor}`}>
              Special Discount Event
            </p>
          </div>
        </div>

        {/* Time Information */}
        <div className={`space-y-3 p-4 rounded-xl ${config.bgLight} border ${config.borderColor} mb-4`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${config.gradient}`}>
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 font-medium">Start Time</p>
              <p className="text-sm font-bold text-gray-900">
                {format(new Date(flashSale.startTime), 'PPp')}
              </p>
            </div>
          </div>
          <div className="h-px bg-gray-200" />
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${config.gradient}`}>
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 font-medium">End Time</p>
              <p className="text-sm font-bold text-gray-900">
                {format(new Date(flashSale.endTime), 'PPp')}
              </p>
            </div>
          </div>
        </div>

        {/* Games Information */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-gray-900">
              🎮 Applicable Games
            </p>
            <span className={`px-3 py-1 rounded-full ${config.bgLight} ${config.textColor} text-xs font-bold`}>
              {flashSale.gameIds?.length || 0} Games
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {flashSale.gameIds?.slice(0, 4).map(gameId => {
              const game = games.find(g => g.id === gameId);
              return game ? (
                <motion.span
                  key={gameId}
                  whileHover={{ scale: 1.05 }}
                  className={`px-3 py-2 bg-gradient-to-r ${config.gradient} text-white rounded-lg text-xs font-semibold shadow-md`}
                >
                  {game.name}
                </motion.span>
              ) : null;
            })}
            {flashSale.gameIds?.length > 4 && (
              <span className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-xs font-bold">
                +{flashSale.gameIds.length - 4} more
              </span>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">Flash Sales Management</h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">Create and manage flash sales</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-lime-500 text-white rounded-xl hover:shadow-lg transition-all text-sm sm:text-base font-medium whitespace-nowrap"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          Create Flash Sale
        </button>
      </div>

      {/* Active Flash Sales */}
      <div>
        <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Active ({activeFlashSales.length})</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {activeFlashSales.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center py-8">No active flash sales</p>
          ) : (
            activeFlashSales.map(fs => <FlashSaleCard key={fs.id} flashSale={fs} type="active" />)
          )}
        </div>
      </div>

      {/* Scheduled Flash Sales */}
      <div>
        <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Scheduled ({scheduledFlashSales.length})</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {scheduledFlashSales.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center py-8">No scheduled flash sales</p>
          ) : (
            scheduledFlashSales.map(fs => <FlashSaleCard key={fs.id} flashSale={fs} type="scheduled" />)
          )}
        </div>
      </div>

      {/* Past Flash Sales */}
      <div>
        <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Past ({pastFlashSales.length})</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {pastFlashSales.slice(0, 6).map(fs => <FlashSaleCard key={fs.id} flashSale={fs} type="past" />)}
        </div>
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            >
              <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full my-8 overflow-hidden">
                {/* Header with Gradient */}
                <div className="bg-gradient-to-r from-emerald-500 to-lime-500 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl">
                        <Zap className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-2xl font-bold text-white">
                          {editingFlashSale ? '✏️ Edit Flash Sale' : '✨ Create New Flash Sale'}
                        </h3>
                        <p className="text-emerald-100 text-xs sm:text-sm mt-1">
                          {editingFlashSale ? 'Update flash sale details' : 'Set up an exciting discount event'}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={closeModal}
                      className="p-2 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                    >
                      <X className="w-6 h-6 text-white" />
                    </motion.button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {/* Section 1: Basic Info */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 border-blue-100">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                        <MessageSquare className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-900">📝 Basic Information</h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Flash Sale Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none text-gray-900 font-medium transition-all"
                          placeholder="e.g., Weekend Super Sale, Mega Discount Event"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          💰 Discount Percentage *
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            required
                            min="1"
                            max="99"
                            value={formData.discount}
                            onChange={(e) => setFormData({...formData, discount: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none text-gray-900 font-bold text-2xl transition-all"
                            placeholder="50"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-blue-600">%</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">💡 Enter a value between 1% and 99%</p>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Time Schedule */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 border-purple-100">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-900">⏰ Schedule</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          🚀 Start Time *
                        </label>
                        <input
                          type="datetime-local"
                          required
                          value={formData.startTime}
                          onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 outline-none text-gray-900 font-medium transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          🏁 End Time *
                        </label>
                        <input
                          type="datetime-local"
                          required
                          value={formData.endTime}
                          onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 outline-none text-gray-900 font-medium transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Select Games */}
                  <div className="bg-gradient-to-br from-emerald-50 to-lime-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 border-emerald-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-gradient-to-r from-emerald-500 to-lime-500 rounded-lg">
                          <Package className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="font-bold text-gray-900">🎮 Select Games</h4>
                      </div>
                      <span className="px-3 py-1 bg-emerald-200 text-emerald-800 rounded-full text-xs font-bold">
                        {formData.selectedGames.length} selected
                      </span>
                    </div>
                    
                    <div className="max-h-60 sm:max-h-80 overflow-y-auto border-2 border-emerald-200 rounded-xl p-3 sm:p-4 bg-white space-y-2 custom-scrollbar">
                      {games.map(game => {
                        const isSelected = formData.selectedGames.includes(game.id);
                        return (
                          <motion.label
                            key={game.id}
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-gradient-to-r from-emerald-500 to-lime-500 text-white shadow-lg'
                                : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleGameSelection(game.id)}
                              className="w-5 h-5 rounded-lg cursor-pointer"
                            />
                            <div className="flex-1">
                              <p className={`font-bold ${
                                isSelected ? 'text-white' : 'text-gray-900'
                              }`}>
                                {game.name}
                              </p>
                              <p className={`text-xs ${
                                isSelected ? 'text-emerald-100' : 'text-gray-600'
                              }`}>
                                {game.category} • {game.players} players
                              </p>
                            </div>
                            {isSelected && (
                              <div className="p-1 bg-white/20 rounded-lg">
                                <Zap className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </motion.label>
                        );
                      })}
                    </div>
                    <p className="text-xs text-gray-600 mt-3">💡 Select one or more games for this flash sale</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t-2 border-gray-100">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-lime-500 text-white rounded-xl sm:rounded-2xl hover:shadow-2xl hover:shadow-emerald-500/50 transition-all font-bold text-base sm:text-lg"
                    >
                      <Save className="w-5 h-5 sm:w-6 sm:h-6" />
                      {editingFlashSale ? '💾 Update Flash Sale' : '✨ Create Flash Sale'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={closeModal}
                      className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 bg-gray-200 text-gray-700 rounded-xl sm:rounded-2xl hover:bg-gray-300 transition-all font-bold text-base sm:text-lg"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlashSaleManagement;
