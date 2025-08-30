// Enhanced POS Integration Script
// This file integrates all advanced features into the main POS system

class EnhancedPOSIntegration {
    constructor() {
        this.initializeEventListeners();
        this.setupTabSystems();
        this.initializeAdvancedFeatures();
    }

    initializeEventListeners() {
        // Customer Management
        this.setupCustomerManagement();
        
        // Advanced Inventory
        this.setupAdvancedInventory();
        
        // Advanced Reporting
        this.setupAdvancedReporting();
        
        // Settings
        this.setupSettings();
        
        // Enhanced Receipts
        this.setupEnhancedReceipts();
        
        // Notification System
        this.setupNotificationSystem();
    }

    setupCustomerManagement() {
        // Customer modal triggers
        const customerBtns = document.querySelectorAll('[data-action="customer-management"]');
        customerBtns.forEach(btn => {
            btn.addEventListener('click', () => this.showCustomerModal());
        });

        // Customer modal close
        const closeCustomerModal = document.getElementById('closeCustomerModal');
        if (closeCustomerModal) {
            closeCustomerModal.addEventListener('click', () => this.hideCustomerModal());
        }

        // Customer tabs
        const customerTabs = document.querySelectorAll('.customer-tab');
        customerTabs.forEach(tab => {
            tab.addEventListener('click', (e) => this.switchCustomerTab(e.target.dataset.tab));
        });

        // Add customer form
        const addCustomerForm = document.getElementById('addCustomerForm');
        if (addCustomerForm) {
            addCustomerForm.addEventListener('submit', (e) => this.handleAddCustomer(e));
        }

        // Customer search
        const customerSearchInput = document.getElementById('customerSearchInput');
        if (customerSearchInput) {
            customerSearchInput.addEventListener('input', (e) => this.searchCustomers(e.target.value));
        }
    }

    setupAdvancedInventory() {
        // Inventory modal triggers
        const inventoryBtns = document.querySelectorAll('[data-action="advanced-inventory"]');
        inventoryBtns.forEach(btn => {
            btn.addEventListener('click', () => this.showInventoryModal());
        });

        // Inventory modal close
        const closeInventoryModal = document.getElementById('closeInventoryModal');
        if (closeInventoryModal) {
            closeInventoryModal.addEventListener('click', () => this.hideInventoryModal());
        }

        // Inventory tabs
        const inventoryTabs = document.querySelectorAll('.inventory-tab');
        inventoryTabs.forEach(tab => {
            tab.addEventListener('click', (e) => this.switchInventoryTab(e.target.dataset.tab));
        });

        // Add stock movement
        const addStockMovementBtn = document.getElementById('addStockMovementBtn');
        if (addStockMovementBtn) {
            addStockMovementBtn.addEventListener('click', () => this.showAddStockMovementModal());
        }

        // Create purchase order
        const createPurchaseOrderBtn = document.getElementById('createPurchaseOrderBtn');
        if (createPurchaseOrderBtn) {
            createPurchaseOrderBtn.addEventListener('click', () => this.showCreatePurchaseOrderModal());
        }
    }

    setupAdvancedReporting() {
        // Reporting modal triggers
        const reportingBtns = document.querySelectorAll('[data-action="advanced-reporting"]');
        reportingBtns.forEach(btn => {
            btn.addEventListener('click', () => this.showReportingModal());
        });

        // Reporting modal close
        const closeReportingModal = document.getElementById('closeReportingModal');
        if (closeReportingModal) {
            closeReportingModal.addEventListener('click', () => this.hideReportingModal());
        }

        // Reporting tabs
        const reportingTabs = document.querySelectorAll('.reporting-tab');
        reportingTabs.forEach(tab => {
            tab.addEventListener('click', (e) => this.switchReportingTab(e.target.dataset.tab));
        });

        // Generate reports
        const generateSalesReportBtn = document.getElementById('generateSalesReportBtn');
        if (generateSalesReportBtn) {
            generateSalesReportBtn.addEventListener('click', () => this.generateSalesReport());
        }

        const generateInventoryReportBtn = document.getElementById('generateInventoryReportBtn');
        if (generateInventoryReportBtn) {
            generateInventoryReportBtn.addEventListener('click', () => this.generateInventoryReport());
        }

        // Export functionality
        const exportBtns = document.querySelectorAll('[data-action="export"]');
        exportBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleExport(e.target.dataset.format, e.target.dataset.type));
        });
    }

    setupSettings() {
        // Settings modal triggers
        const settingsBtns = document.querySelectorAll('[data-action="settings"]');
        settingsBtns.forEach(btn => {
            btn.addEventListener('click', () => this.showSettingsModal());
        });

        // Settings modal close
        const closeSettingsModal = document.getElementById('closeSettingsModal');
        if (closeSettingsModal) {
            closeSettingsModal.addEventListener('click', () => this.hideSettingsModal());
        }

        // Settings tabs
        const settingsTabs = document.querySelectorAll('.settings-tab');
        settingsTabs.forEach(tab => {
            tab.addEventListener('click', (e) => this.switchSettingsTab(e.target.dataset.tab));
        });

        // Save settings
        const saveSettingsBtn = document.getElementById('saveSettings');
        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        }
    }

    setupEnhancedReceipts() {
        // Enhanced receipt functionality
        const printAdvancedReceipt = document.getElementById('printAdvancedReceipt');
        if (printAdvancedReceipt) {
            printAdvancedReceipt.addEventListener('click', () => this.printAdvancedReceipt());
        }

        const emailAdvancedReceipt = document.getElementById('emailAdvancedReceipt');
        if (emailAdvancedReceipt) {
            emailAdvancedReceipt.addEventListener('click', () => this.emailAdvancedReceipt());
        }

        const smsAdvancedReceipt = document.getElementById('smsAdvancedReceipt');
        if (smsAdvancedReceipt) {
            smsAdvancedReceipt.addEventListener('click', () => this.smsAdvancedReceipt());
        }
    }

    setupNotificationSystem() {
        // Global notification system
        window.showAdvancedNotification = this.showAdvancedNotification.bind(this);
        window.showConfirmationDialog = this.showConfirmationDialog.bind(this);
        window.showLoadingOverlay = this.showLoadingOverlay.bind(this);
        window.hideLoadingOverlay = this.hideLoadingOverlay.bind(this);
    }

    setupTabSystems() {
        // Generic tab system for all modals
        this.setupGenericTabSystem('customer-tab', 'customer-tab-content');
        this.setupGenericTabSystem('inventory-tab', 'inventory-tab-content');
        this.setupGenericTabSystem('reporting-tab', 'reporting-tab-content');
        this.setupGenericTabSystem('settings-tab', 'settings-tab-content');
    }

    setupGenericTabSystem(tabClass, contentClass) {
        const tabs = document.querySelectorAll(`.${tabClass}`);
        const contents = document.querySelectorAll(`.${contentClass}`);

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                
                // Update tab states
                tabs.forEach(t => {
                    t.classList.remove('bg-white', 'text-gray-700', 'shadow-sm');
                    t.classList.add('text-gray-600');
                });
                tab.classList.add('bg-white', 'text-gray-700', 'shadow-sm');
                tab.classList.remove('text-gray-600');

                // Show/hide content
                contents.forEach(content => {
                    if (content.id === `${targetTab}Tab`) {
                        content.classList.remove('hidden');
                    } else {
                        content.classList.add('hidden');
                    }
                });
            });
        });
    }

    // Customer Management Methods
    showCustomerModal() {
        document.getElementById('customerModal').classList.remove('hidden');
        this.loadCustomerData();
    }

    hideCustomerModal() {
        document.getElementById('customerModal').classList.add('hidden');
    }

    switchCustomerTab(tabName) {
        // Implementation handled by generic tab system
    }

    async handleAddCustomer(e) {
        e.preventDefault();
        
        const customerData = {
            firstName: document.getElementById('customerFirstName').value,
            lastName: document.getElementById('customerLastName').value,
            phone: document.getElementById('customerPhone').value,
            email: document.getElementById('customerEmail').value,
            address: document.getElementById('customerAddress').value
        };

        try {
            const customer = window.customerManager.addCustomer(customerData);
            this.showAdvancedNotification('Customer added successfully!', 'success');
            this.loadCustomerData();
            document.getElementById('addCustomerForm').reset();
        } catch (error) {
            this.showAdvancedNotification('Error adding customer', 'error');
        }
    }

    async searchCustomers(query) {
        if (!query.trim()) {
            document.getElementById('customerSearchResults').innerHTML = '';
            return;
        }

        const customers = window.customerManager.customers.filter(customer => 
            customer.firstName.toLowerCase().includes(query.toLowerCase()) ||
            customer.lastName.toLowerCase().includes(query.toLowerCase()) ||
            customer.phone.includes(query) ||
            customer.email.toLowerCase().includes(query.toLowerCase())
        );

        this.displayCustomerSearchResults(customers);
    }

    displayCustomerSearchResults(customers) {
        const resultsContainer = document.getElementById('customerSearchResults');
        
        if (customers.length === 0) {
            resultsContainer.innerHTML = '<p class="text-gray-500 text-center py-4">No customers found</p>';
            return;
        }

        resultsContainer.innerHTML = customers.map(customer => `
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div>
                    <p class="font-medium">${customer.firstName} ${customer.lastName}</p>
                    <p class="text-sm text-gray-600">${customer.phone} • ${customer.email || 'No email'}</p>
                </div>
                <button onclick="enhancedPOS.selectCustomer(${customer.id})" class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                    Select
                </button>
            </div>
        `).join('');
    }

    selectCustomer(customerId) {
        const customer = window.customerManager.customers.find(c => c.id === customerId);
        if (customer) {
            // Store selected customer in session
            sessionStorage.setItem('selectedCustomer', JSON.stringify(customer));
            this.showAdvancedNotification(`Customer ${customer.firstName} ${customer.lastName} selected`, 'success');
            this.hideCustomerModal();
        }
    }

    // Advanced Inventory Methods
    showInventoryModal() {
        document.getElementById('inventoryModal').classList.remove('hidden');
        this.loadInventoryData();
    }

    hideInventoryModal() {
        document.getElementById('inventoryModal').classList.add('hidden');
    }

    switchInventoryTab(tabName) {
        // Implementation handled by generic tab system
    }

    async loadInventoryData() {
        // Load stock movements
        this.loadStockMovements();
        
        // Load purchase orders
        this.loadPurchaseOrders();
        
        // Load suppliers
        this.loadSuppliers();
        
        // Load reorder suggestions
        this.loadReorderSuggestions();
    }

    loadStockMovements() {
        const table = document.getElementById('stockMovementsTable');
        if (!table) return;

        const movements = window.inventoryManager.stockMovements.slice(-20); // Last 20 movements
        
        table.innerHTML = movements.map(movement => {
            const product = window.productManager.products.find(p => p.id === movement.productId);
            return `
                <tr>
                    <td class="px-4 py-3 text-sm">${new Date(movement.timestamp).toLocaleDateString()}</td>
                    <td class="px-4 py-3 text-sm">${product ? product.name : 'Unknown Product'}</td>
                    <td class="px-4 py-3 text-sm">
                        <span class="px-2 py-1 rounded-full text-xs ${
                            movement.type === 'in' ? 'bg-green-100 text-green-800' :
                            movement.type === 'out' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                        }">${movement.type}</span>
                    </td>
                    <td class="px-4 py-3 text-sm">${movement.quantity}</td>
                    <td class="px-4 py-3 text-sm">${movement.reason}</td>
                    <td class="px-4 py-3 text-sm">${movement.user}</td>
                </tr>
            `;
        }).join('');
    }

    // Advanced Reporting Methods
    showReportingModal() {
        document.getElementById('reportingModal').classList.remove('hidden');
        this.initializeCharts();
    }

    hideReportingModal() {
        document.getElementById('reportingModal').classList.add('hidden');
    }

    switchReportingTab(tabName) {
        // Implementation handled by generic tab system
    }

    async generateSalesReport() {
        const startDate = document.getElementById('salesStartDate').value;
        const endDate = document.getElementById('salesEndDate').value;
        const groupBy = document.getElementById('salesGroupBy').value;

        if (!startDate || !endDate) {
            this.showAdvancedNotification('Please select start and end dates', 'error');
            return;
        }

        try {
            const report = window.reportingManager.generateSalesReport(
                new Date(startDate),
                new Date(endDate),
                groupBy
            );

            this.displaySalesReport(report);
        } catch (error) {
            this.showAdvancedNotification('Error generating sales report', 'error');
        }
    }

    displaySalesReport(report) {
        const resultsContainer = document.getElementById('salesReportResults');
        
        resultsContainer.innerHTML = `
            <div class="bg-gray-50 p-6 rounded-xl">
                <h4 class="text-lg font-semibold mb-4">Sales Summary</h4>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div class="text-center">
                        <p class="text-2xl font-bold text-blue-600">${report.summary.totalSales}</p>
                        <p class="text-sm text-gray-600">Total Sales</p>
                    </div>
                    <div class="text-center">
                        <p class="text-2xl font-bold text-green-600">$${report.summary.totalRevenue.toFixed(2)}</p>
                        <p class="text-sm text-gray-600">Total Revenue</p>
                    </div>
                    <div class="text-center">
                        <p class="text-2xl font-bold text-purple-600">${report.summary.totalItems}</p>
                        <p class="text-sm text-gray-600">Total Items</p>
                    </div>
                    <div class="text-center">
                        <p class="text-2xl font-bold text-orange-600">$${report.summary.averageTransaction.toFixed(2)}</p>
                        <p class="text-sm text-gray-600">Avg Transaction</p>
                    </div>
                </div>
                
                <h5 class="font-semibold mb-3">Sales by ${report.groupBy}</h5>
                <div class="space-y-2">
                    ${Object.entries(report.data).map(([key, data]) => `
                        <div class="flex justify-between items-center p-3 bg-white rounded-lg">
                            <span class="font-medium">${key}</span>
                            <div class="text-right">
                                <p class="font-semibold">$${data.revenue.toFixed(2)}</p>
                                <p class="text-sm text-gray-600">${data.transactions} transactions</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Settings Methods
    showSettingsModal() {
        document.getElementById('settingsModal').classList.remove('hidden');
        this.loadSettings();
    }

    hideSettingsModal() {
        document.getElementById('settingsModal').classList.add('hidden');
    }

    switchSettingsTab(tabName) {
        // Implementation handled by generic tab system
    }

    loadSettings() {
        // Load current settings from localStorage or default values
        const settings = JSON.parse(localStorage.getItem('pos_settings')) || {};
        
        document.getElementById('storeName').value = settings.storeName || 'Enterprise POS Pro';
        document.getElementById('storeAddress').value = settings.storeAddress || '123 Business St, City, State';
        document.getElementById('storePhone').value = settings.storePhone || '(555) 123-4567';
        document.getElementById('storeEmail').value = settings.storeEmail || 'info@enterprise.com';
        
        document.getElementById('defaultTaxRate').value = settings.defaultTaxRate || 10;
        document.getElementById('foodTaxRate').value = settings.foodTaxRate || 5;
        
        document.getElementById('currency').value = settings.currency || 'USD';
        document.getElementById('decimalPlaces').value = settings.decimalPlaces || 2;
        
        document.getElementById('enableNotifications').checked = settings.enableNotifications !== false;
        document.getElementById('autoBackup').checked = settings.autoBackup !== false;
        document.getElementById('lowStockAlerts').checked = settings.lowStockAlerts !== false;
    }

    async saveSettings() {
        const settings = {
            storeName: document.getElementById('storeName').value,
            storeAddress: document.getElementById('storeAddress').value,
            storePhone: document.getElementById('storePhone').value,
            storeEmail: document.getElementById('storeEmail').value,
            defaultTaxRate: parseFloat(document.getElementById('defaultTaxRate').value),
            foodTaxRate: parseFloat(document.getElementById('foodTaxRate').value),
            currency: document.getElementById('currency').value,
            decimalPlaces: parseInt(document.getElementById('decimalPlaces').value),
            enableNotifications: document.getElementById('enableNotifications').checked,
            autoBackup: document.getElementById('autoBackup').checked,
            lowStockAlerts: document.getElementById('lowStockAlerts').checked
        };

        try {
            localStorage.setItem('pos_settings', JSON.stringify(settings));
            this.showAdvancedNotification('Settings saved successfully!', 'success');
            this.hideSettingsModal();
        } catch (error) {
            this.showAdvancedNotification('Error saving settings', 'error');
        }
    }

    // Enhanced Receipt Methods
    showEnhancedReceipt(sale) {
        const modal = document.getElementById('advancedReceiptModal');
        const receiptNumber = document.getElementById('advancedReceiptNumber');
        const receiptContent = document.getElementById('advancedReceiptContent');
        
        receiptNumber.textContent = sale.receiptNumber;
        
        // Generate enhanced receipt content
        receiptContent.innerHTML = this.generateEnhancedReceiptContent(sale);
        
        modal.classList.remove('hidden');
    }

    generateEnhancedReceiptContent(sale) {
        const customer = sessionStorage.getItem('selectedCustomer') ? 
            JSON.parse(sessionStorage.getItem('selectedCustomer')) : null;
        
        return `
            <div class="text-center mb-4">
                <h4 class="font-bold text-lg">ENTERPRISE POS PRO</h4>
                <p class="text-sm">${document.getElementById('storeName')?.value || 'Enterprise POS Pro'}</p>
                <p class="text-sm">${document.getElementById('storeAddress')?.value || '123 Business St, City, State'}</p>
                <p class="text-sm">Receipt #${sale.receiptNumber}</p>
                <p class="text-sm">${new Date(sale.timestamp).toLocaleString()}</p>
                <p class="text-sm">Cashier: ${sale.cashier}</p>
                ${customer ? `<p class="text-sm">Customer: ${customer.firstName} ${customer.lastName}</p>` : ''}
            </div>
            
            <div class="border-t border-b py-2 mb-2">
                ${sale.items.map(item => `
                    <div class="flex justify-between mb-1">
                        <span>${item.name}</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div class="text-xs text-gray-600 mb-2">
                        ${item.quantity} x $${item.price.toFixed(2)}
                    </div>
                `).join('')}
            </div>
            
            <div class="space-y-1">
                <div class="flex justify-between">
                    <span>Subtotal:</span>
                    <span>$${sale.subtotal.toFixed(2)}</span>
                </div>
                <div class="flex justify-between">
                    <span>Tax:</span>
                    <span>$${sale.tax.toFixed(2)}</span>
                </div>
                <div class="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>$${sale.total.toFixed(2)}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span>Payment:</span>
                    <span>${sale.paymentMethod}</span>
                </div>
            </div>
            
            <div class="text-center mt-4 text-xs">
                <p>Thank you for your business!</p>
                <p>Visit us online at enterprise.com</p>
            </div>
        `;
    }

    // Utility Methods
    showAdvancedNotification(message, type = 'info', duration = 4000) {
        const notification = document.createElement('div');
        notification.className = `notification bg-white p-4 rounded-xl shadow-lg border-l-4 max-w-sm ${
            type === 'success' ? 'border-green-500' : 
            type === 'error' ? 'border-red-500' : 
            type === 'warning' ? 'border-yellow-500' : 'border-blue-500'
        }`;
        
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="fas ${this.getNotificationIcon(type)} text-${this.getNotificationColor(type)}"></i>
                <p class="text-sm font-medium text-gray-800">${message}</p>
            </div>
        `;
        
        const notificationCenter = document.getElementById('notificationCenter');
        notificationCenter.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, duration);
    }

    getNotificationIcon(type) {
        switch (type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'warning': return 'fa-exclamation-triangle';
            default: return 'fa-info-circle';
        }
    }

    getNotificationColor(type) {
        switch (type) {
            case 'success': return 'green-500';
            case 'error': return 'red-500';
            case 'warning': return 'yellow-500';
            default: return 'blue-500';
        }
    }

    showConfirmationDialog(title, message, onConfirm) {
        const dialog = document.getElementById('confirmationDialog');
        const titleEl = document.getElementById('confirmationTitle');
        const messageEl = document.getElementById('confirmationMessage');
        const confirmBtn = document.getElementById('confirmProceed');
        
        titleEl.textContent = title;
        messageEl.textContent = message;
        
        dialog.classList.remove('hidden');
        
        const handleConfirm = () => {
            dialog.classList.add('hidden');
            confirmBtn.removeEventListener('click', handleConfirm);
            if (onConfirm) onConfirm();
        };
        
        confirmBtn.addEventListener('click', handleConfirm);
        
        document.getElementById('confirmCancel').addEventListener('click', () => {
            dialog.classList.add('hidden');
            confirmBtn.removeEventListener('click', handleConfirm);
        });
    }

    showLoadingOverlay() {
        document.getElementById('loadingOverlay').classList.remove('hidden');
    }

    hideLoadingOverlay() {
        document.getElementById('loadingOverlay').classList.add('hidden');
    }

    // Export Methods
    async handleExport(format, type) {
        try {
            this.showLoadingOverlay();
            
            let data = [];
            let filename = '';
            
            switch (type) {
                case 'sales':
                    data = window.salesManager.sales;
                    filename = `sales_report_${new Date().toISOString().split('T')[0]}.${format}`;
                    break;
                case 'inventory':
                    data = window.productManager.products;
                    filename = `inventory_report_${new Date().toISOString().split('T')[0]}.${format}`;
                    break;
                case 'customers':
                    data = window.customerManager.customers;
                    filename = `customers_report_${new Date().toISOString().split('T')[0]}.${format}`;
                    break;
                default:
                    throw new Error('Unknown export type');
            }
            
            if (format === 'csv') {
                window.reportingManager.exportToCSV(data, filename);
            } else if (format === 'pdf') {
                // PDF export would be implemented here
                this.showAdvancedNotification('PDF export coming soon!', 'info');
            }
            
            this.showAdvancedNotification(`Export completed: ${filename}`, 'success');
        } catch (error) {
            this.showAdvancedNotification('Export failed', 'error');
        } finally {
            this.hideLoadingOverlay();
        }
    }

    // Chart Initialization
    initializeCharts() {
        // Initialize Chart.js charts for analytics
        this.initializeSalesTrendChart();
        this.initializeTopProductsChart();
    }

    initializeSalesTrendChart() {
        const ctx = document.getElementById('salesTrendChart');
        if (!ctx) return;
        
        // Sample data - in real app, this would come from the reporting manager
        const data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Sales',
                data: [12000, 19000, 15000, 25000, 22000, 30000],
                borderColor: '#1E40AF',
                backgroundColor: 'rgba(30, 64, 175, 0.1)',
                tension: 0.4,
                fill: true
            }]
        };
        
        new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    initializeTopProductsChart() {
        const container = document.getElementById('topProductsChart');
        if (!container) return;
        
        const topProducts = window.reportingManager?.getTopSellingProducts(5) || [];
        
        container.innerHTML = topProducts.map((product, index) => `
            <div class="flex items-center justify-between p-2 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} rounded">
                <span class="text-sm font-medium">${product.name}</span>
                <span class="text-sm text-gray-600">${product.quantity} sold</span>
            </div>
        `).join('');
    }
}

// Initialize the enhanced POS integration when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait for the main POS managers to be initialized
    if (window.productManager && window.salesManager && window.customerManager) {
        window.enhancedPOS = new EnhancedPOSIntegration();
        console.log('Enhanced POS Integration initialized successfully!');
    } else {
        // Retry after a short delay
        setTimeout(() => {
            if (window.productManager && window.salesManager && window.customerManager) {
                window.enhancedPOS = new EnhancedPOSIntegration();
                console.log('Enhanced POS Integration initialized successfully!');
            } else {
                console.error('Failed to initialize Enhanced POS Integration - managers not found');
            }
        }, 1000);
    }
});

// Export the class for use in other scripts
window.EnhancedPOSIntegration = EnhancedPOSIntegration;
