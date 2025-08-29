import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShoppingCart, 
  Package, 
  Building2, 
  Users, 
  BarChart3, 
  Settings, 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  Edit, 
  Eye, 
  Download, 
  Upload,
  Bell,
  User,
  LogOut,
  CreditCard,
  Banknote,
  Smartphone,
  Printer,
  Mail,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Filter,
  RefreshCw
} from 'lucide-react';

const POS_SYSTEM = () => {
  // Main state management
  const [currentView, setCurrentView] = useState('pos');
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: 'John Admin',
    role: 'Admin',
    branch: 'Main Store'
  });

  // Sample data initialization
  const [branches] = useState([
    { id: 1, name: 'Main Store', address: '123 Main St', manager: 'John Admin' },
    { id: 2, name: 'Downtown Branch', address: '456 Oak Ave', manager: 'Sarah Manager' },
    { id: 3, name: 'Mall Branch', address: '789 Mall Plaza', manager: 'Mike Johnson' }
  ]);

  const [staff] = useState([
    { id: 1, name: 'John Admin', role: 'Admin', branch: 'Main Store', active: true },
    { id: 2, name: 'Sarah Manager', role: 'Manager', branch: 'Downtown Branch', active: true },
    { id: 3, name: 'Mike Johnson', role: 'Manager', branch: 'Mall Branch', active: true },
    { id: 4, name: 'Lisa Cashier', role: 'Cashier', branch: 'Main Store', active: true }
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: 'iPhone 14 Pro', barcode: '123456789', price: 999.99, stock: 25, category: 'Electronics', minStock: 5 },
    { id: 2, name: 'Samsung Galaxy S23', barcode: '987654321', price: 799.99, stock: 30, category: 'Electronics', minStock: 5 },
    { id: 3, name: 'MacBook Air M2', barcode: '456789123', price: 1199.99, stock: 15, category: 'Electronics', minStock: 3 },
    { id: 4, name: 'AirPods Pro', barcode: '789123456', price: 249.99, stock: 2, category: 'Accessories', minStock: 10 },
    { id: 5, name: 'iPad Pro', barcode: '321654987', price: 1099.99, stock: 20, category: 'Electronics', minStock: 5 }
  ]);

  const [cart, setCart] = useState([]);
  const [sales, setSales] = useState([
    { id: 1, date: '2025-08-29', items: [{ name: 'iPhone 14 Pro', qty: 1, price: 999.99 }], total: 999.99, branch: 'Main Store', cashier: 'Lisa Cashier' },
    { id: 2, date: '2025-08-28', items: [{ name: 'AirPods Pro', qty: 2, price: 249.99 }], total: 499.98, branch: 'Main Store', cashier: 'Lisa Cashier' }
  ]);

  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Check for low stock alerts
  useEffect(() => {
    const lowStockItems = products.filter(product => product.stock <= product.minStock);
    setNotifications(lowStockItems.map(item => ({
      id: Date.now() + Math.random(),
      type: 'warning',
      message: `Low stock alert: ${item.name} (${item.stock} remaining)`,
      timestamp: new Date().toLocaleString()
    })));
  }, [products]);

  // POS Functions
  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const updateCartQuantity = useCallback((id, change) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + change);
        return newQty === 0 ? null : { ...item, quantity: newQty };
      }
      return item;
    }).filter(Boolean));
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const calculateTotal = useCallback(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  const processSale = useCallback((paymentMethod) => {
    if (cart.length === 0) return;
    
    const newSale = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      items: cart.map(item => ({ name: item.name, qty: item.quantity, price: item.price })),
      total: calculateTotal(),
      branch: currentUser.branch,
      cashier: currentUser.name,
      paymentMethod
    };

    setSales(prev => [newSale, ...prev]);
    
    // Update stock
    setProducts(prev => prev.map(product => {
      const cartItem = cart.find(item => item.id === product.id);
      if (cartItem) {
        return { ...product, stock: product.stock - cartItem.quantity };
      }
      return product;
    }));

    setCart([]);
    alert(`Sale completed! Payment method: ${paymentMethod}`);
  }, [cart, calculateTotal, currentUser]);

  // Navigation component
  const Sidebar = () => (
    <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Enterprise POS</h1>
        <p className="text-sm text-gray-400">{currentUser.name} - {currentUser.role}</p>
      </div>
      
      <nav className="flex-1 p-4">
        {[
          { id: 'pos', icon: ShoppingCart, label: 'Point of Sale' },
          { id: 'inventory', icon: Package, label: 'Inventory' },
          { id: 'branches', icon: Building2, label: 'Branches' },
          { id: 'staff', icon: Users, label: 'Staff' },
          { id: 'reports', icon: BarChart3, label: 'Reports' },
          { id: 'settings', icon: Settings, label: 'Settings' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${
              currentView === item.id ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );

  // POS Interface
  const POSInterface = () => (
    <div className="flex h-full">
      {/* Product Selection */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products or scan barcode..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
              <RefreshCw size={16} />
              Scan
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products
            .filter(product => 
              product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.barcode.includes(searchTerm)
            )
            .map(product => (
            <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-sm mb-2">{product.name}</h3>
              <p className="text-gray-600 text-xs mb-2">#{product.barcode}</p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-bold text-green-600">${product.price}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  product.stock <= product.minStock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  Stock: {product.stock}
                </span>
              </div>
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className="w-96 border-l bg-gray-50 p-6">
        <h2 className="text-xl font-bold mb-4">Cart ({cart.length})</h2>
        
        <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
          {cart.map(item => (
            <div key={item.id} className="bg-white p-3 rounded-lg border">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-sm">{item.name}</span>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateCartQuantity(item.id, -1)}
                    className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.id, 1)}
                    className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                  >
                    <Plus size={12} />
                  </button>
                </div>
                <span className="font-bold text-green-600">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between text-xl font-bold mb-4">
            <span>Total:</span>
            <span className="text-green-600">${calculateTotal().toFixed(2)}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              onClick={() => processSale('Cash')}
              disabled={cart.length === 0}
              className="flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300"
            >
              <Banknote size={16} />
              Cash
            </button>
            <button
              onClick={() => processSale('Card')}
              disabled={cart.length === 0}
              className="flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
            >
              <CreditCard size={16} />
              Card
            </button>
            <button
              onClick={() => processSale('Transfer')}
              disabled={cart.length === 0}
              className="flex items-center justify-center gap-2 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300"
            >
              <Smartphone size={16} />
              Transfer
            </button>
            <button
              onClick={() => processSale('Wallet')}
              disabled={cart.length === 0}
              className="flex items-center justify-center gap-2 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-300"
            >
              <Smartphone size={16} />
              Wallet
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Printer size={16} />
              Print
            </button>
            <button className="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Mail size={16} />
              Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Inventory Management
  const InventoryInterface = () => {
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    
    const ProductForm = ({ product, onSave, onCancel }) => {
      const [formData, setFormData] = useState(product || {
        name: '',
        barcode: '',
        price: '',
        stock: '',
        category: '',
        minStock: ''
      });

      const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
          ...formData,
          id: product?.id || Date.now(),
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          minStock: parseInt(formData.minStock)
        });
      };

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4">{product ? 'Edit Product' : 'Add New Product'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Barcode"
                value={formData.barcode}
                onChange={(e) => setFormData({...formData, barcode: e.target.value})}
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="number"
                step="0.01"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="number"
                placeholder="Stock Quantity"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="number"
                placeholder="Minimum Stock"
                value={formData.minStock}
                onChange={(e) => setFormData({...formData, minStock: e.target.value})}
                className="w-full p-3 border rounded-lg"
                required
              />
              <div className="flex gap-3">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg">
                  Save
                </button>
                <button type="button" onClick={onCancel} className="flex-1 bg-gray-300 py-2 rounded-lg">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    };

    const handleSaveProduct = (productData) => {
      if (editingProduct) {
        setProducts(prev => prev.map(p => p.id === productData.id ? productData : p));
      } else {
        setProducts(prev => [...prev, productData]);
      }
      setShowAddProduct(false);
      setEditingProduct(null);
    };

    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Download size={16} />
              Export CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Upload size={16} />
              Import CSV
            </button>
            <button
              onClick={() => setShowAddProduct(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus size={16} />
              Add Product
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border">
          <div className="p-4 border-b">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
              <select className="px-4 py-2 border rounded-lg">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Accessories</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">Product</th>
                  <th className="px-4 py-3 text-left">Barcode</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Stock</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{product.name}</td>
                    <td className="px-4 py-3 text-gray-600">{product.barcode}</td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3 font-bold text-green-600">${product.price}</td>
                    <td className="px-4 py-3">{product.stock}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.stock <= product.minStock 
                          ? 'bg-red-100 text-red-800' 
                          : product.stock <= product.minStock * 2
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {product.stock <= product.minStock 
                          ? 'Low Stock' 
                          : product.stock <= product.minStock * 2
                          ? 'Warning'
                          : 'In Stock'
                        }
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setEditingProduct(product)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {(showAddProduct || editingProduct) && (
          <ProductForm
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={() => {
              setShowAddProduct(false);
              setEditingProduct(null);
            }}
          />
        )}
      </div>
    );
  };

  // Branch Management
  const BranchInterface = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Branch Management</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={16} />
          Add Branch
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map(branch => (
          <div key={branch.id} className="bg-white rounded-lg border p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold">{branch.name}</h3>
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <Edit size={16} />
                </button>
                <button className="text-gray-600 hover:text-gray-800">
                  <Eye size={16} />
                </button>
              </div>
            </div>
            <p className="text-gray-600 mb-2">{branch.address}</p>
            <p className="text-sm text-gray-500 mb-4">Manager: {branch.manager}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-blue-600 font-semibold">Today's Sales</p>
                <p className="text-xl font-bold text-blue-800">$2,450</p>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="text-green-600 font-semibold">Total Products</p>
                <p className="text-xl font-bold text-green-800">156</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg border">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Branch Performance Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
              <p className="text-3xl font-bold">$45,280</p>
              <p className="text-blue-100 text-sm">This month</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Active Branches</h3>
              <p className="text-3xl font-bold">{branches.length}</p>
              <p className="text-green-100 text-sm">Currently operating</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Top Performer</h3>
              <p className="text-xl font-bold">Main Store</p>
              <p className="text-purple-100 text-sm">$18,950 this month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Staff Management
  const StaffInterface = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Staff Management</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={16} />
          Add Staff
        </button>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search staff..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <select className="px-4 py-2 border rounded-lg">
              <option>All Roles</option>
              <option>Admin</option>
              <option>Manager</option>
              <option>Cashier</option>
            </select>
            <select className="px-4 py-2 border rounded-lg">
              <option>All Branches</option>
              {branches.map(branch => (
                <option key={branch.id}>{branch.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">Staff Member</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Branch</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Last Active</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map(member => (
                <tr key={member.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {member.name.charAt(0)}
                      </div>
                      <span className="font-medium">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      member.role === 'Admin' ? 'bg-red-100 text-red-800' :
                      member.role === 'Manager' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">{member.branch}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      member.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {member.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">2 hours ago</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <Eye size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Staff</h3>
          <p className="text-3xl font-bold text-blue-600">{staff.length}</p>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Active Today</h3>
          <p className="text-3xl font-bold text-green-600">{staff.filter(s => s.active).length}</p>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Admins</h3>
          <p className="text-3xl font-bold text-red-600">{staff.filter(s => s.role === 'Admin').length}</p>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Cashiers</h3>
          <p className="text-3xl font-bold text-purple-600">{staff.filter(s => s.role === 'Cashier').length}</p>
        </div>
      </div>
    </div>
  );

  // Reports & Analytics
  const ReportsInterface = () => {
    const [reportType, setReportType] = useState('sales');
    const [dateRange, setDateRange] = useState('today');

    const generatePDF = () => {
      alert('PDF report generated!');
    };

    const exportExcel = () => {
      alert('Excel report exported!');
    };

    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <div className="flex gap-3">
            <button 
              onClick={generatePDF}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <Download size={16} />
              Export PDF
            </button>
            <button 
              onClick={exportExcel}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Download size={16} />
              Export Excel
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Today's Sales</h3>
                <p className="text-3xl font-bold">$2,450</p>
                <p className="text-blue-100 text-sm">+12% from yesterday</p>
              </div>
              <TrendingUp size={40} className="opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Monthly Revenue</h3>
                <p className="text-3xl font-bold">$45,280</p>
                <p className="text-green-100 text-sm">+8% from last month</p>
              </div>
              <BarChart3 size={40} className="opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Transactions</h3>
                <p className="text-3xl font-bold">156</p>
                <p className="text-purple-100 text-sm">Today</p>
              </div>
              <ShoppingCart size={40} className="opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Profit Margin</h3>
                <p className="text-3xl font-bold">28.5%</p>
                <p className="text-orange-100 text-sm">This month</p>
              </div>
              <TrendingUp size={40} className="opacity-80" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg border p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Sales Filters</h3>
              <div className="flex gap-2">
                <select 
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="px-3 py-2 border rounded-lg"
                >
                  <option value="sales">Sales Report</option>
                  <option value="inventory">Inventory Report</option>
                  <option value="profit">Profit & Loss</option>
                  <option value="staff">Staff Performance</option>
                </select>
                <select 
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-2 border rounded-lg"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Total Sales</span>
                <span className="font-bold text-green-600">$2,450.00</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Total Items Sold</span>
                <span className="font-bold">89 items</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Average Transaction</span>
                <span className="font-bold">$15.70</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Cash Sales</span>
                <span className="font-bold">45%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Card Sales</span>
                <span className="font-bold">55%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-bold mb-4">Best Selling Products</h3>
            <div className="space-y-3">
              {products.slice(0, 5).map((product, index) => (
                <div key={product.id} className="flex items-center justify-between p-3 border-l-4 border-blue-500 bg-gray-50 rounded">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">${product.price}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{Math.floor(Math.random() * 50) + 10} sold</p>
                    <p className="text-sm text-gray-600">${(product.price * (Math.floor(Math.random() * 50) + 10)).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-bold mb-4">Low Stock Alerts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.filter(p => p.stock <= p.minStock).map(product => (
              <div key={product.id} className="flex items-center gap-3 p-4 border border-red-200 bg-red-50 rounded-lg">
                <AlertTriangle className="text-red-600" size={24} />
                <div className="flex-1">
                  <p className="font-medium text-red-800">{product.name}</p>
                  <p className="text-sm text-red-600">Only {product.stock} left in stock</p>
                </div>
                <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">
                  Reorder
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Settings Interface
  const SettingsInterface = () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">System Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-bold mb-4">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Business Name</label>
              <input type="text" defaultValue="My Business" className="w-full p-3 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Currency</label>
              <select className="w-full p-3 border rounded-lg">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tax Rate (%)</label>
              <input type="number" defaultValue="8.5" className="w-full p-3 border rounded-lg" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-bold mb-4">Receipt Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <label>Print receipts automatically</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4" />
              <label>Email receipts by default</label>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Receipt Footer</label>
              <textarea 
                defaultValue="Thank you for your business!"
                className="w-full p-3 border rounded-lg h-20"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-bold mb-4">Inventory Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <label>Enable low stock alerts</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <label>Auto-deduct stock on sale</label>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Default Low Stock Threshold</label>
              <input type="number" defaultValue="5" className="w-full p-3 border rounded-lg" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-bold mb-4">User Permissions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Admin Permissions</h4>
              <div className="space-y-2 pl-4">
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <label className="text-sm">Full system access</label>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <label className="text-sm">Manage staff accounts</label>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Manager Permissions</h4>
              <div className="space-y-2 pl-4">
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <label className="text-sm">View reports</label>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <label className="text-sm">Manage inventory</label>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Cashier Permissions</h4>
              <div className="space-y-2 pl-4">
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <label className="text-sm">Process sales</label>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4" />
                  <label className="text-sm">Apply discounts</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          Reset to Defaults
        </button>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  );

  // Main render function
  const renderCurrentView = () => {
    switch (currentView) {
      case 'pos':
        return <POSInterface />;
      case 'inventory':
        return <InventoryInterface />;
      case 'branches':
        return <BranchInterface />;
      case 'staff':
        return <StaffInterface />;
      case 'reports':
        return <ReportsInterface />;
      case 'settings':
        return <SettingsInterface />;
      default:
        return <POSInterface />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        {/* Top Header */}
        <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold capitalize">{currentView.replace(/([A-Z])/g, ' $1')}</h2>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button className="p-2 text-gray-600 hover:text-gray-800 relative">
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
            </div>
            
            {/* User Profile */}
            <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {currentUser.name.charAt(0)}
              </div>
              <div className="text-sm">
                <p className="font-medium">{currentUser.name}</p>
                <p className="text-gray-600">{currentUser.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Panel */}
        {notifications.length > 0 && currentView === 'pos' && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mx-6 mt-4 rounded">
            <div className="flex">
              <AlertTriangle className="text-yellow-400 mr-3" size={20} />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-yellow-800">Stock Alerts</h3>
                <div className="text-sm text-yellow-700 mt-1">
                  {notifications.slice(0, 3).map((notif, index) => (
                    <p key={index}>{notif.message}</p>
                  ))}
                  {notifications.length > 3 && (
                    <p className="font-medium">...and {notifications.length - 3} more items</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {renderCurrentView()}
        </div>
      </div>
    </div>
  );
};

export default POS_SYSTEM;
