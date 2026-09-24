import React, { useState } from 'react';
import { HosteloProvider, useHostelo } from './context/HosteloContext';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { Toast } from './components/common/Toast';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { CommunityPage } from './pages/CommunityPage';
import { VotingPage } from './pages/VotingPage';
import { MessPage } from './pages/MessPage';
import { LeavePassPage } from './pages/LeavePassPage';
import { GatePassPage } from './pages/GatePassPage';
import { PackagesPage } from './pages/PackagesPage';
import { ComplaintsPage } from './pages/ComplaintsPage';
import { PaymentsPage } from './pages/PaymentsPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { ProfilePage } from './pages/ProfilePage';

// Modals
import { GatePassModal } from './components/modals/GatePassModal';
import { GatePassTicketModal } from './components/modals/GatePassTicketModal';
import { LeavePassModal } from './components/modals/LeavePassModal';
import { ComplaintModal } from './components/modals/ComplaintModal';
import { PaymentModal } from './components/modals/PaymentModal';
import { CreatePostModal } from './components/modals/CreatePostModal';
import type { GatePass } from './types';

const HosteloAppContent: React.FC = () => {
  const { activeTab } = useHostelo();

  // Global Modals State
  const [isGatePassModalOpen, setIsGatePassModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [activeTicketView, setActiveTicketView] = useState<GatePass | null>(null);

  // If on Landing Page, render full width marketing landing
  if (activeTab === 'landing') {
    return (
      <main className="min-h-screen">
        <LandingPage />
        <Toast />
      </main>
    );
  }

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardPage
            onOpenGatePassModal={() => setIsGatePassModalOpen(true)}
            onOpenComplaintModal={() => setIsComplaintModalOpen(true)}
            onOpenLeaveModal={() => setIsLeaveModalOpen(true)}
            onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
          />
        );
      case 'community':
        return <CommunityPage onOpenCreatePostModal={() => setIsCreatePostModalOpen(true)} />;
      case 'voting':
        return <VotingPage />;
      case 'mess':
        return <MessPage />;
      case 'leave':
        return <LeavePassPage onOpenLeaveModal={() => setIsLeaveModalOpen(true)} />;
      case 'gatepass':
        return (
          <GatePassPage
            onOpenGatePassModal={() => setIsGatePassModalOpen(true)}
            onOpenTicketModal={(pass) => setActiveTicketView(pass)}
          />
        );
      case 'packages':
        return <PackagesPage />;
      case 'complaints':
        return <ComplaintsPage onOpenComplaintModal={() => setIsComplaintModalOpen(true)} />;
      case 'payments':
        return <PaymentsPage onOpenPaymentModal={() => setIsPaymentModalOpen(true)} />;
      case 'announcements':
        return <AnnouncementsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return (
          <DashboardPage
            onOpenGatePassModal={() => setIsGatePassModalOpen(true)}
            onOpenComplaintModal={() => setIsComplaintModalOpen(true)}
            onOpenLeaveModal={() => setIsLeaveModalOpen(true)}
            onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-[#0F172A]">
      {/* Desktop Collapsible Neo-Minimal Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <Navbar
          onOpenGatePassModal={() => setIsGatePassModalOpen(true)}
          onOpenComplaintModal={() => setIsComplaintModalOpen(true)}
          onOpenLeaveModal={() => setIsLeaveModalOpen(true)}
        />

        <main className="flex-1 px-4 sm:px-8 py-6 max-w-7xl w-full mx-auto">
          {renderActivePage()}
        </main>
      </div>

      {/* Mobile Sticky Bottom Nav & Drawer */}
      <MobileNav />

      {/* Global Interactive Modals */}
      <GatePassModal
        isOpen={isGatePassModalOpen}
        onClose={() => setIsGatePassModalOpen(false)}
        onPassGenerated={(pass) => setActiveTicketView(pass)}
      />

      <GatePassTicketModal
        isOpen={Boolean(activeTicketView)}
        onClose={() => setActiveTicketView(null)}
        pass={activeTicketView}
      />

      <LeavePassModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
      />

      <ComplaintModal
        isOpen={isComplaintModalOpen}
        onClose={() => setIsComplaintModalOpen(false)}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />

      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
      />

      <Toast />
    </div>
  );
};

export function App() {
  return (
    <HosteloProvider>
      <HosteloAppContent />
    </HosteloProvider>
  );
}

export default App;
