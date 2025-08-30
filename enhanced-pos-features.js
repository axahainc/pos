// Enhanced POS System Features
// This file contains all the advanced functionality for the Enterprise POS Pro system

// Advanced Product Management
class ProductManager {
    constructor() {
        this.products = [];
        this.categories = ['Electronics', 'Accessories', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Beauty', 'Food & Beverage'];
        this.suppliers = [];
        this.purchaseOrders = [];
    }

    addProduct(product) {
        product.id = Date.now();
        product.createdAt = new Date();
        product.lastModified = new Date();
        this.products.push(product);
        this.saveToLocalStorage();
        return product;
    }

    updateProduct(id, updates) {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updates, lastModified: new Date() };
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }

    deleteProduct(id) {
        this.products = this.products.filter(p => p.id !== id);
        this.saveToLocalStorage();
        return true;
    }

    getLowStockProducts() {
        return this.products.filter(p => p.stock <= p.minStock);
    }

    getOutOfStockProducts() {
        return this.products.filter(p => p.stock === 0);
    }

    searchProducts(query) {
        const searchTerm = query.toLowerCase();
        return this.products.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.sku.toLowerCase().includes(searchTerm) ||
            p.category.toLowerCase().includes(searchTerm) ||
            p.barcode.includes(searchTerm)
        );
    }

    saveToLocalStorage() {
        localStorage.setItem('pos_products', JSON.stringify(this.products));
    }

    loadFromLocalStorage() {
        const stored = localStorage.getItem('pos_products');
        if (stored) {
            this.products = JSON.parse(stored);
        }
    }
}

// Advanced Sales Management
class SalesManager {
    constructor() {
        this.sales = [];
        this.refunds = [];
        this.discounts = [];
        this.taxRates = {
            default: 0.10,
            food: 0.05,
            clothing: 0.08
        };
    }

    createSale(items, customer, paymentMethod, cashier) {
        const sale = {
            id: 'SALE-' + Date.now(),
            timestamp: new Date(),
            items: items,
            subtotal: this.calculateSubtotal(items),
            tax: this.calculateTax(items),
            total: 0,
            paymentMethod: paymentMethod,
            cashier: cashier,
            customer: customer,
            status: 'completed',
            receiptNumber: this.generateReceiptNumber()
        };
        
        sale.total = sale.subtotal + sale.tax;
        this.sales.push(sale);
        this.saveToLocalStorage();
        return sale;
    }

    calculateSubtotal(items) {
        return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    calculateTax(items) {
        return items.reduce((sum, item) => {
            const taxRate = this.getTaxRate(item.category);
            return sum + (item.price * item.quantity * taxRate);
        }, 0);
    }

    getTaxRate(category) {
        return this.taxRates[category] || this.taxRates.default;
    }

    generateReceiptNumber() {
        return 'RCP-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
    }

    getSalesByDateRange(startDate, endDate) {
        return this.sales.filter(sale => 
            sale.timestamp >= startDate && sale.timestamp <= endDate
        );
    }

    getTopSellingProducts(limit = 10) {
        const productSales = {};
        this.sales.forEach(sale => {
            sale.items.forEach(item => {
                if (productSales[item.id]) {
                    productSales[item.id].quantity += item.quantity;
                    productSales[item.id].revenue += item.price * item.quantity;
                } else {
                    productSales[item.id] = {
                        id: item.id,
                        name: item.name,
                        quantity: item.quantity,
                        revenue: item.price * item.quantity
                    };
                }
            });
        });

        return Object.values(productSales)
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, limit);
    }

    saveToLocalStorage() {
        localStorage.setItem('pos_sales', JSON.stringify(this.sales));
    }

    loadFromLocalStorage() {
        const stored = localStorage.getItem('pos_sales');
        if (stored) {
            this.sales = JSON.parse(stored);
        }
    }
}

// Customer Management System
class CustomerManager {
    constructor() {
        this.customers = [];
        this.loyaltyProgram = {
            pointsPerDollar: 1,
            pointsToDiscount: 100,
            discountValue: 5
        };
    }

    addCustomer(customer) {
        customer.id = Date.now();
        customer.createdAt = new Date();
        customer.points = 0;
        customer.totalSpent = 0;
        customer.visits = 0;
        this.customers.push(customer);
        this.saveToLocalStorage();
        return customer;
    }

    updateCustomer(id, updates) {
        const index = this.customers.findIndex(c => c.id === id);
        if (index !== -1) {
            this.customers[index] = { ...this.customers[index], ...updates };
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }

    findCustomerByPhone(phone) {
        return this.customers.find(c => c.phone === phone);
    }

    findCustomerByEmail(email) {
        return this.customers.find(c => c.email === email);
    }

    addPoints(customerId, amount) {
        const customer = this.customers.find(c => c.id === customerId);
        if (customer) {
            customer.points += Math.floor(amount * this.loyaltyProgram.pointsPerDollar);
            this.saveToLocalStorage();
            return customer.points;
        }
        return 0;
    }

    redeemPoints(customerId, points) {
        const customer = this.customers.find(c => c.id === customerId);
        if (customer && customer.points >= points) {
            customer.points -= points;
            const discount = (points / this.loyaltyProgram.pointsToDiscount) * this.loyaltyProgram.discountValue;
            this.saveToLocalStorage();
            return discount;
        }
        return 0;
    }

    saveToLocalStorage() {
        localStorage.setItem('pos_customers', JSON.stringify(this.customers));
    }

    loadFromLocalStorage() {
        const stored = localStorage.getItem('pos_customers');
        if (stored) {
            this.customers = JSON.parse(stored);
        }
    }
}

// Inventory Management with Advanced Features
class InventoryManager {
    constructor() {
        this.stockMovements = [];
        this.purchaseOrders = [];
        this.suppliers = [];
        this.reorderPoints = new Map();
    }

    addStockMovement(productId, quantity, type, reason, user) {
        const movement = {
            id: Date.now(),
            productId: productId,
            quantity: quantity,
            type: type, // 'in', 'out', 'adjustment', 'return'
            reason: reason,
            user: user,
            timestamp: new Date()
        };
        
        this.stockMovements.push(movement);
        this.saveToLocalStorage();
        return movement;
    }

    createPurchaseOrder(supplier, items, expectedDelivery) {
        const po = {
            id: 'PO-' + Date.now(),
            supplier: supplier,
            items: items,
            status: 'pending',
            createdAt: new Date(),
            expectedDelivery: expectedDelivery,
            totalAmount: items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        };
        
        this.purchaseOrders.push(po);
        this.saveToLocalStorage();
        return po;
    }

    updatePurchaseOrderStatus(poId, status) {
        const po = this.purchaseOrders.find(p => p.id === poId);
        if (po) {
            po.status = status;
            po.updatedAt = new Date();
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }

    getStockHistory(productId, days = 30) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        
        return this.stockMovements.filter(movement => 
            movement.productId === productId && 
            movement.timestamp >= cutoffDate
        );
    }

    setReorderPoint(productId, quantity) {
        this.reorderPoints.set(productId, quantity);
        this.saveToLocalStorage();
    }

    getReorderSuggestions() {
        const suggestions = [];
        this.reorderPoints.forEach((reorderPoint, productId) => {
            const product = window.productManager.products.find(p => p.id === productId);
            if (product && product.stock <= reorderPoint) {
                suggestions.push({
                    product: product,
                    currentStock: product.stock,
                    reorderPoint: reorderPoint,
                    suggestedOrder: reorderPoint * 2 - product.stock
                });
            }
        });
        return suggestions;
    }

    saveToLocalStorage() {
        localStorage.setItem('pos_inventory', JSON.stringify({
            stockMovements: this.stockMovements,
            purchaseOrders: this.purchaseOrders,
            reorderPoints: Array.from(this.reorderPoints.entries())
        }));
    }

    loadFromLocalStorage() {
        const stored = localStorage.getItem('pos_inventory');
        if (stored) {
            const data = JSON.parse(stored);
            this.stockMovements = data.stockMovements || [];
            this.purchaseOrders = data.purchaseOrders || [];
            this.reorderPoints = new Map(data.reorderPoints || []);
        }
    }
}

// Advanced Reporting and Analytics
class ReportingManager {
    constructor() {
        this.reports = [];
        this.charts = {};
    }

    generateSalesReport(startDate, endDate, groupBy = 'day') {
        const sales = window.salesManager.getSalesByDateRange(startDate, endDate);
        const report = {
            id: Date.now(),
            type: 'sales',
            startDate: startDate,
            endDate: endDate,
            groupBy: groupBy,
            data: this.groupSalesData(sales, groupBy),
            summary: this.calculateSalesSummary(sales),
            generatedAt: new Date()
        };
        
        this.reports.push(report);
        return report;
    }

    groupSalesData(sales, groupBy) {
        const grouped = {};
        
        sales.forEach(sale => {
            let key;
            switch (groupBy) {
                case 'day':
                    key = sale.timestamp.toDateString();
                    break;
                case 'week':
                    key = this.getWeekNumber(sale.timestamp);
                    break;
                case 'month':
                    key = sale.timestamp.getFullYear() + '-' + (sale.timestamp.getMonth() + 1);
                    break;
                default:
                    key = sale.timestamp.toDateString();
            }
            
            if (!grouped[key]) {
                grouped[key] = {
                    sales: 0,
                    revenue: 0,
                    transactions: 0,
                    items: 0
                };
            }
            
            grouped[key].sales += sale.total;
            grouped[key].revenue += sale.subtotal;
            grouped[key].transactions += 1;
            grouped[key].items += sale.items.reduce((sum, item) => sum + item.quantity, 0);
        });
        
        return grouped;
    }

    calculateSalesSummary(sales) {
        return {
            totalSales: sales.length,
            totalRevenue: sales.reduce((sum, sale) => sum + sale.total, 0),
            totalItems: sales.reduce((sum, sale) => sum + sale.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0),
            averageTransaction: sales.length > 0 ? sales.reduce((sum, sale) => sum + sale.total, 0) / sales.length : 0,
            topPaymentMethod: this.getTopPaymentMethod(sales)
        };
    }

    getTopPaymentMethod(sales) {
        const methods = {};
        sales.forEach(sale => {
            methods[sale.paymentMethod] = (methods[sale.paymentMethod] || 0) + 1;
        });
        
        return Object.entries(methods)
            .sort(([,a], [,b]) => b - a)[0]?.[0] || 'Unknown';
    }

    getWeekNumber(date) {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }

    generateInventoryReport() {
        const products = window.productManager.products;
        const report = {
            id: Date.now(),
            type: 'inventory',
            data: {
                totalProducts: products.length,
                totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0),
                lowStockItems: window.productManager.getLowStockProducts().length,
                outOfStockItems: window.productManager.getOutOfStockProducts().length,
                categoryBreakdown: this.getCategoryBreakdown(products)
            },
            generatedAt: new Date()
        };
        
        this.reports.push(report);
        return report;
    }

    getCategoryBreakdown(products) {
        const breakdown = {};
        products.forEach(product => {
            if (!breakdown[product.category]) {
                breakdown[product.category] = {
                    count: 0,
                    value: 0,
                    stock: 0
                };
            }
            breakdown[product.category].count++;
            breakdown[product.category].value += product.price * product.stock;
            breakdown[product.category].stock += product.stock;
        });
        return breakdown;
    }

    exportToCSV(data, filename) {
        const csvContent = this.convertToCSV(data);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    convertToCSV(data) {
        if (data.length === 0) return '';
        
        const headers = Object.keys(data[0]);
        const csvRows = [headers.join(',')];
        
        data.forEach(row => {
            const values = headers.map(header => {
                const value = row[header];
                return typeof value === 'string' ? `"${value}"` : value;
            });
            csvRows.push(values.join(','));
        });
        
        return csvRows.join('\n');
    }

    saveToLocalStorage() {
        localStorage.setItem('pos_reports', JSON.stringify(this.reports));
    }

    loadFromLocalStorage() {
        const stored = localStorage.getItem('pos_reports');
        if (stored) {
            this.reports = JSON.parse(stored);
        }
    }
}

// User Management and Permissions
class UserManager {
    constructor() {
        this.users = [];
        this.roles = ['Admin', 'Manager', 'Cashier', 'Inventory'];
        this.permissions = {
            'Admin': ['all'],
            'Manager': ['sales', 'inventory', 'reports', 'customers'],
            'Cashier': ['sales', 'customers'],
            'Inventory': ['inventory', 'reports']
        };
    }

    addUser(user) {
        user.id = Date.now();
        user.createdAt = new Date();
        user.lastLogin = null;
        user.status = 'active';
        user.password = this.hashPassword(user.password);
        this.users.push(user);
        this.saveToLocalStorage();
        return user;
    }

    authenticateUser(username, password) {
        const user = this.users.find(u => u.username === username);
        if (user && this.verifyPassword(password, user.password)) {
            user.lastLogin = new Date();
            this.saveToLocalStorage();
            return user;
        }
        return null;
    }

    hashPassword(password) {
        // Simple hash for demo - in production use proper hashing
        return btoa(password);
    }

    verifyPassword(password, hash) {
        return this.hashPassword(password) === hash;
    }

    hasPermission(user, permission) {
        if (!user || !user.role) return false;
        const userPermissions = this.permissions[user.role];
        return userPermissions.includes('all') || userPermissions.includes(permission);
    }

    updateUserStatus(userId, status) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            user.status = status;
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }

    saveToLocalStorage() {
        localStorage.setItem('pos_users', JSON.stringify(this.users));
    }

    loadFromLocalStorage() {
        const stored = localStorage.getItem('pos_users');
        if (stored) {
            this.users = JSON.parse(stored);
        }
    }
}

// Initialize all managers when the script loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize managers
    window.productManager = new ProductManager();
    window.salesManager = new SalesManager();
    window.customerManager = new CustomerManager();
    window.inventoryManager = new InventoryManager();
    window.reportingManager = new ReportingManager();
    window.userManager = new UserManager();

    // Load data from localStorage
    window.productManager.loadFromLocalStorage();
    window.salesManager.loadFromLocalStorage();
    window.customerManager.loadFromLocalStorage();
    window.inventoryManager.loadFromLocalStorage();
    window.reportingManager.loadFromLocalStorage();
    window.userManager.loadFromLocalStorage();

    // Add default users if none exist
    if (window.userManager.users.length === 0) {
        window.userManager.addUser({
            username: 'admin',
            name: 'John Admin',
            role: 'Admin',
            email: 'admin@enterprise.com'
        });
        window.userManager.addUser({
            username: 'manager',
            name: 'Sarah Manager',
            role: 'Manager',
            email: 'manager@enterprise.com'
        });
        window.userManager.addUser({
            username: 'cashier',
            name: 'Mike Cashier',
            role: 'Cashier',
            email: 'cashier@enterprise.com'
        });
    }

    // Add default products if none exist
    if (window.productManager.products.length === 0) {
        const defaultProducts = [
            { name: 'Wireless Headphones', sku: 'WH001', category: 'Electronics', price: 99.99, stock: 25, minStock: 5, barcode: '1234567890123' },
            { name: 'Smartphone Case', sku: 'SC001', category: 'Accessories', price: 19.99, stock: 50, minStock: 10, barcode: '1234567890124' },
            { name: 'Laptop Stand', sku: 'LS001', category: 'Electronics', price: 49.99, stock: 15, minStock: 3, barcode: '1234567890125' },
            { name: 'USB Cable', sku: 'UC001', category: 'Accessories', price: 12.99, stock: 100, minStock: 20, barcode: '1234567890126' },
            { name: 'Gaming Mouse', sku: 'GM001', category: 'Electronics', price: 79.99, stock: 3, minStock: 10, barcode: '1234567890127' },
            { name: 'Keyboard', sku: 'KB001', category: 'Electronics', price: 89.99, stock: 7, minStock: 15, barcode: '1234567890128' }
        ];

        defaultProducts.forEach(product => {
            window.productManager.addProduct(product);
        });
    }
});

// Export managers for use in other scripts
window.POSManagers = {
    ProductManager,
    SalesManager,
    CustomerManager,
    InventoryManager,
    ReportingManager,
    UserManager
};
