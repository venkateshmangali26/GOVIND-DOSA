import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { apiFetch, SOCKET_URL } from './api';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SocialProofBanner from './components/SocialProofBanner';
import PopularDosasSection from './components/PopularDosasSection';
import LiveActivityRibbon from './components/LiveActivityRibbon';
import WhyGovindSection from './components/WhyGovindSection';
import MenuGrid from './components/MenuGrid';
import CustomerReviewsSection from './components/CustomerReviewsSection';
import ButterCustomizerModal from './components/ButterCustomizerModal';
import CartDrawer from './components/CartDrawer';
import OrderTracker from './components/OrderTracker';
import HeritageModal from './components/HeritageModal';
import DigitalMenuCard from './components/DigitalMenuCard';
import TiffinSubscriptionView from './components/TiffinSubscriptionView';
import ReservationsView from './components/ReservationsView';
import AdminPortal from './components/AdminPortal';
import StickyMobileBar from './components/StickyMobileBar';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('store');
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState(null);
  const [isHeritageOpen, setIsHeritageOpen] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);
  const [crmLeads, setCrmLeads] = useState([]);
  const [crmAnalytics, setCrmAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const fetchData = async (silent = false) => {
    try {
      setFetchError(null);
      silent ? setIsRefreshing(true) : setIsLoading(true);
      const [menuRes, ordersRes, crmRes, analyticsRes] = await Promise.all([
        apiFetch('/api/menu').then(r => r.json()),
        apiFetch('/api/orders').then(r => r.json()),
        apiFetch('/api/crm/pipeline').then(r => r.json()),
        apiFetch('/api/crm/analytics').then(r => r.json())
      ]);
      if (menuRes.success) setMenuItems(menuRes.items);
      if (ordersRes.success) {
        setAllOrders(ordersRes.orders);
        setActiveOrder(prev =>
          prev ? (ordersRes.orders.find(o => o.id === prev.id) || prev) : (ordersRes.orders[0] || null)
        );
      }
      if (crmRes.success) setCrmLeads(crmRes.leads);
      if (analyticsRes.success) setCrmAnalytics(analyticsRes.analytics);
    } catch (err) {
      console.error('Error fetching application state:', err);
      setFetchError('Can’t reach the kitchen server. Retrying…');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Real-Time WebSockets for Kitchen KDS & Live Order Tracker
    const socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling']
    });

    socket.on('orderCreated', (newOrder) => {
      setAllOrders(prev => [newOrder, ...prev.filter(o => o.id !== newOrder.id)]);
    });

    socket.on('orderStatusUpdated', (updatedOrder) => {
      setAllOrders(prev => prev.map(o => o.id === updatedOrder.id ? updatedOrder : o));
      setActiveOrder(prev => prev && prev.id === updatedOrder.id ? updatedOrder : prev);
    });

    socket.on('orderStageUpdated', (updatedOrder) => {
      setAllOrders(prev => prev.map(o => o.id === updatedOrder.id ? updatedOrder : o));
      setActiveOrder(prev => prev && prev.id === updatedOrder.id ? updatedOrder : prev);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleScrollToSection = (sectionId) => {
    if (activeTab !== 'store') {
      setActiveTab('store');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToCart = (customizedItem) => {
    setCartItems(prev => [...prev, customizedItem]);
    setIsCartOpen(true);
    setToast(`${customizedItem.name} added to your order`);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  };

  const handleUpdateQty = (cartId, qty) => {
    setCartItems(prev => prev.map(it => it.cartId === cartId ? { ...it, quantity: qty } : it));
  };

  const handleRemoveItem = (cartId) => {
    setCartItems(prev => prev.filter(it => it.cartId !== cartId));
  };

  const handleOrderPlaced = (newOrder) => {
    setCartItems([]);
    setAllOrders(prev => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    setActiveTab('tracking');
    fetchData(true);
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await apiFetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setAllOrders(prev => prev.map(o => o.id === orderId ? data.order : o));
        if (activeOrder && activeOrder.id === orderId) setActiveOrder(data.order);
      }
    } catch (err) {
      console.error('Failed to update order status:', err);
    }
  };

  const handleAddLead = async (leadPayload) => {
    try {
      const res = await apiFetch('/api/crm/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload)
      });
      const data = await res.json();
      if (data.success) {
        setCrmLeads(prev => [data.lead, ...prev]);
        fetchData();
      }
    } catch (err) {
      console.error('Error adding lead:', err);
    }
  };

  const handleUpdateLeadStage = async (leadId, newStage) => {
    try {
      const res = await apiFetch(`/api/crm/leads/${leadId}/stage`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: newStage })
      });
      const data = await res.json();
      if (data.success) {
        setCrmLeads(prev => prev.map(l => l.id === leadId ? data.lead : l));
        fetchData();
      }
    } catch (err) {
      console.error('Error moving lead stage:', err);
    }
  };

  const handleDeleteLead = async (leadId) => {
    try {
      const res = await apiFetch(`/api/crm/leads/${leadId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setCrmLeads(prev => prev.filter(l => l.id !== leadId));
        fetchData();
      }
    } catch (err) {
      console.error('Error deleting lead:', err);
    }
  };

  const handleTriggerCampaign = async (campaignData) => {
    try {
      const res = await apiFetch('/api/crm/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaignData)
      });
      const data = await res.json();
      if (data.success) fetchData();
    } catch (err) {
      console.error('Error triggering campaign:', err);
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-container">
      {/* Primary Customer Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cartCount={totalCartCount} 
        openCart={() => setIsCartOpen(true)} 
        onOpenHeritage={() => setIsHeritageOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      <main>
        {fetchError && <div className="app-banner error" role="alert">{fetchError}</div>}
        {isLoading && <div className="app-loading">Heating up the cast-iron tawa…</div>}
        {isRefreshing && <div className="sync-dot" title="Syncing live data" />}

        {/* 1. PUBLIC STOREFRONT: High-Conversion Customer Journey */}
        {activeTab === 'store' && (
          <>
            {/* Hero Section with Customer Trust Badges & Food Showcase */}
            <HeroSection
              onOrderNow={() => handleScrollToSection('menu-section')}
              onViewMenu={() => handleScrollToSection('menu-section')}
              onOpenMenuCard={() => setActiveTab('menucard')}
              onReserveTable={() => setActiveTab('reservations')}
              onTrackQueue={() => setActiveTab('tracking')}
              onSelectFeaturedItem={(id) => {
                const item = menuItems.find(m => m.id === id);
                if (item) setCustomizingItem(item);
              }}
            />

            {/* Social Proof Trust Banner */}
            <SocialProofBanner />

            {/* Popular Dosas Showcase (Bestsellers with 1-Click Order) */}
            <PopularDosasSection 
              menuItems={menuItems} 
              onSelectItem={(item) => setCustomizingItem(item)}
              onScrollToMenu={() => handleScrollToSection('menu-section')}
            />

            {/* Live Tawa Activity / Urgency Ribbon */}
            <LiveActivityRibbon />

            {/* Why Govind Dosa (Story, 100% Amul Butter, Live Tawa) */}
            <WhyGovindSection onOrderClick={() => handleScrollToSection('menu-section')} />

            {/* Full Menu with Streamlined Cards & Multi-Dimensional Filters */}
            <MenuGrid 
              menuItems={menuItems} 
              onSelectItem={(item) => setCustomizingItem(item)} 
            />

            {/* Customer Reviews & Social Proof */}
            <CustomerReviewsSection />
          </>
        )}

        {/* 2. ADMIN PORTAL: Staff, Kitchen Display (KDS), CRM, and Analytics */}
        {activeTab === 'admin' && (
          <AdminPortal
            allOrders={allOrders}
            crmLeads={crmLeads}
            crmAnalytics={crmAnalytics}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onRefreshOrders={() => fetchData(true)}
            onAddLead={handleAddLead}
            onUpdateLeadStage={handleUpdateLeadStage}
            onDeleteLead={handleDeleteLead}
            onTriggerCampaign={handleTriggerCampaign}
            onExitAdmin={() => setActiveTab('store')}
          />
        )}

        {/* 3. OTHER PUBLIC CUSTOMER VIEWS */}
        {activeTab === 'tracking' && (
          <OrderTracker 
            activeOrder={activeOrder} 
            allOrders={allOrders} 
            onRefreshOrders={() => fetchData(true)} 
            onUpdateOrderStatus={handleUpdateOrderStatus} 
          />
        )}

        {activeTab === 'reservations' && <ReservationsView />}

        {activeTab === 'tiffin' && <TiffinSubscriptionView />}

        {activeTab === 'menucard' && (
          <DigitalMenuCard 
            menuItems={menuItems} 
            onSelectItem={(item) => setCustomizingItem(item)} 
          />
        )}
      </main>

      {/* Clean Customer Footer */}
      <Footer 
        onOpenTab={setActiveTab} 
        onOpenHeritage={() => setIsHeritageOpen(true)}
        onScrollToSection={handleScrollToSection}
        onOpenAdmin={() => setActiveTab('admin')}
      />

      {/* Modals & Drawers */}
      {customizingItem && (
        <ButterCustomizerModal 
          item={customizingItem} 
          onClose={() => setCustomizingItem(null)} 
          onAddToCart={handleAddToCart} 
        />
      )}

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems} 
        onUpdateQty={handleUpdateQty} 
        onRemoveItem={handleRemoveItem} 
        onOrderPlaced={handleOrderPlaced} 
      />

      <HeritageModal 
        isOpen={isHeritageOpen} 
        onClose={() => setIsHeritageOpen(false)} 
        onExploreMenu={() => handleScrollToSection('menu-section')} 
      />

      {/* Sticky Mobile Order Button */}
      <StickyMobileBar 
        cartItems={cartItems} 
        onOpenCart={() => setIsCartOpen(true)}
        onOrderNowClick={() => handleScrollToSection('menu-section')}
      />

      {/* Instant Feedback Toast */}
      {toast && <div className="toast" role="status">🧈 {toast}</div>}
    </div>
  );
}
