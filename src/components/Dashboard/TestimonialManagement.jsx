import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Star, Plus, Edit, Trash2, X, Save } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import DataTable from './UI/DataTable';
import toast from 'react-hot-toast';

const TestimonialManagement = () => {
  const { testimonials, games, addTestimonial, updateTestimonial, deleteTestimonial } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    game: '',
    comment: '',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    avatar: ''
  });

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      rating: testimonial.rating,
      game: testimonial.game,
      comment: testimonial.comment,
      date: testimonial.date,
      avatar: testimonial.avatar
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      deleteTestimonial(id);
      toast.success('Testimonial deleted successfully');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const testimonialData = {
      ...formData,
      avatar: formData.avatar || formData.name.split(' ').map(n => n[0]).join('').toUpperCase()
    };

    if (editingTestimonial) {
      updateTestimonial(editingTestimonial.id, testimonialData);
      toast.success('Testimonial updated successfully');
    } else {
      addTestimonial(testimonialData);
      toast.success('Testimonial added successfully');
    }
    
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTestimonial(null);
    setFormData({
      name: '',
      rating: 5,
      game: '',
      comment: '',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      avatar: ''
    });
  };

  const columns = [
    { key: 'name', label: 'Customer Name', sortable: true },
    {
      key: 'rating',
      label: 'Rating',
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      )
    },
    { key: 'game', label: 'Game' },
    { 
      key: 'comment', 
      label: 'Comment',
      render: (value) => (
        <p className="max-w-md truncate text-sm text-gray-700">{value}</p>
      )
    },
    { key: 'date', label: 'Date', sortable: true },
    {
      key: 'id',
      label: 'Actions',
      render: (value, row) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row);
            }}
            className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row.id);
            }}
            className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  const avgRating = testimonials.length > 0 
    ? (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white shadow-xl">
          <MessageSquare className="w-8 h-8 mb-3 opacity-80" />
          <p className="text-yellow-100 text-sm">Total Testimonials</p>
          <p className="text-3xl font-bold mt-1">{testimonials.length}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-lime-500 rounded-2xl p-6 text-white shadow-xl">
          <Star className="w-8 h-8 mb-3 opacity-80" />
          <p className="text-emerald-100 text-sm">Average Rating</p>
          <p className="text-3xl font-bold mt-1">{avgRating} ⭐</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl">
          <MessageSquare className="w-8 h-8 mb-3 opacity-80" />
          <p className="text-blue-100 text-sm">5-Star Reviews</p>
          <p className="text-3xl font-bold mt-1">{testimonials.filter(t => t.rating === 5).length}</p>
        </div>
      </div>

      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">All Testimonials</h3>
          <p className="text-sm text-gray-600 mt-1">Manage customer testimonials</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-lime-500 text-white rounded-xl hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Testimonial
        </button>
      </div>

      {/* Testimonials Table */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
        <DataTable
          data={testimonials}
          columns={columns}
          searchPlaceholder="Search testimonials..."
        />
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-50"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                  </h3>
                  <button onClick={closeModal} className="p-2 rounded-lg hover:bg-gray-100">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Customer Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Game *
                      </label>
                      <select
                        required
                        value={formData.game}
                        onChange={(e) => setFormData({...formData, game: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-gray-900"
                      >
                        <option value="">Select a game</option>
                        {games.map(game => (
                          <option key={game.id} value={game.name}>{game.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating *
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setFormData({...formData, rating})}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              rating <= formData.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comment *
                    </label>
                    <textarea
                      required
                      value={formData.comment}
                      onChange={(e) => setFormData({...formData, comment: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-gray-900"
                      placeholder="Customer's feedback..."
                    />
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-lime-500 text-white rounded-xl hover:shadow-lg transition-all"
                    >
                      <Save className="w-5 h-5" />
                      {editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all"
                    >
                      Cancel
                    </button>
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

export default TestimonialManagement;
