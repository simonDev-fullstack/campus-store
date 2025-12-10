import { useState } from 'react';
import { Plus, Edit2, Trash2, Zap, Clock, DollarSign, X } from 'lucide-react';

import { useAdmin } from '../contexts/AdminProvider';

export function FlashSaleManager({
  products,
  flashSales,
  onAdd,
  onUpdate,
  onDelete,
}) {
  const { addProductToFlashSale, updateFlashSaleProduct, removeProductFromFlashSale } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [expandedSaleId, setExpandedSaleId] = useState(null);
  const [showAddProductForm, setShowAddProductForm] = useState(null);

  const handleCreateNew = () => {
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (sale) => {
    setEditingId(sale.id);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const editingSale = editingId ? flashSales.find(s => s.id === editingId) : null;

  const isActive = (sale) => {
    const now = new Date();
    return now >= sale.startTime && now <= sale.endTime;
  };

  const isUpcoming = (sale) => {
    return new Date() < sale.startTime;
  };

  const isExpired = (sale) => {
    return new Date() > sale.endTime;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-gray-900">Flash Sales</h2>
          <p className="text-gray-600">
            Create time-limited sales with special discounts
          </p>
        </div>
        {!showForm && (
          <button
            onClick={handleCreateNew}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Flash Sale
          </button>
        )}
      </div>

      {showForm && (
        <FlashSaleForm
          products={products}
          sale={editingSale}
          onSubmit={(saleData) => {
            if (editingId) {
              onUpdate(editingId, saleData);
            } else {
              onAdd(saleData);
            }
            handleCloseForm();
          }}
          onCancel={handleCloseForm}
        />
      )}

      {flashSales.length === 0 && !showForm ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">No flash sales yet</h3>
          <p className="text-gray-600">Create your first flash sale to boost sales</p>
        </div>
      ) : (
        <div className="space-y-4">
          {flashSales.map((sale) => {
            const active = isActive(sale);
            const upcoming = isUpcoming(sale);
            const expired = isExpired(sale);

            return (
              <div
                key={sale.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-gray-900">{sale.name}</h3>
                        {active && (
                          <span className="px-2.5 py-0.5 bg-green-100 text-green-800 rounded-full text-sm">
                            Active
                          </span>
                        )}
                        {upcoming && (
                          <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-sm">
                            Upcoming
                          </span>
                        )}
                        {expired && (
                          <span className="px-2.5 py-0.5 bg-gray-100 text-gray-800 rounded-full text-sm">
                            Expired
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            {new Date(sale.starts_at).toLocaleDateString()} - {new Date(sale.ends_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="w-4 h-4" />
                          <span>{sale.product_id ? '1 product' : 'No products'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowAddProductForm(showAddProductForm === sale.id ? null : sale.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Add products"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(sale)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit sale"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Delete this flash sale?')) {
                            onDelete(sale.id);
                          }
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete sale"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {showAddProductForm === sale.id && (
                    <AddProductToFlashSaleForm
                      flashSaleId={sale.id}
                      products={products}
                      onAdd={(data) => addProductToFlashSale(sale.id, data)}
                      onClose={() => setShowAddProductForm(null)}
                    />
                  )}

                  <button
                    onClick={() => setExpandedSaleId(expandedSaleId === sale.id ? null : sale.id)}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    {expandedSaleId === sale.id ? 'Hide' : 'View'} Products
                  </button>

                  {expandedSaleId === sale.id && sale.product_id && (
                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <div className="grid gap-3">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <div className="text-gray-900">Product ID: {sale.product_id}</div>
                            <div className="text-gray-600 text-sm">
                              This flash sale is linked to a specific product
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FlashSaleForm({
  products,
  sale,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    name: sale?.name || '',
    startTime: sale?.startTime
      ? new Date(sale.startTime).toISOString().slice(0, 16)
      : '',
    endTime: sale?.endTime
      ? new Date(sale.endTime).toISOString().slice(0, 16)
      : '',
  });
  const [selectedProducts, setSelectedProducts] = useState(sale?.productIds || []);
  const [discounts, setDiscounts] = useState(sale?.discounts || {});



  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.starts_at || !formData.ends_at) {
      alert('Please fill in all required fields');
      return;
    }

    onSubmit({
      name: formData.name,
      starts_at: formData.starts_at,
      ends_at: formData.ends_at,
    });
  };

  return (
    <div className="mb-6 bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-gray-900 mb-4">
        {sale ? 'Edit Flash Sale' : 'New Flash Sale'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">
            Sale Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Weekend Flash Sale"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">
              Start Time *
            </label>
            <input
              type="datetime-local"
              value={formData.starts_at}
              onChange={(e) => setFormData({ ...formData, starts_at: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">
              End Time *
            </label>
            <input
              type="datetime-local"
              value={formData.ends_at}
              onChange={(e) => setFormData({ ...formData, ends_at: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {sale ? 'Update Sale' : 'Create Sale'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

