/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SiHub Digital Ecosystem (Somali Innovation Hub) - Master Application Router
 */

import React, { useEffect, useState } from 'react';
import { AppProvider, useApp, AppView, AdminTab } from './context/AppContext';
import { canAccessView, isAdminRole, shouldShowRoleSwitcher } from './utils/appRouting';
import { AuthPanel } from './components/common/AuthPanel';

// Public Experience
import { Header } from './components/public/Header';
import { Footer } from './components/public/Footer';
import { Home } from './components/public/Home';
import { About } from './components/public/About';
import { ProgramsPage } from './components/public/ProgramsPage';
import { CoursesPage } from './components/public/CoursesPage';
import { StartupHubPage } from './components/public/StartupHubPage';
import { InnovationLabPage } from './components/public/InnovationLabPage';
import { CommunityPage } from './components/public/CommunityPage';
import { EventsPage } from './components/public/EventsPage';
import { OpportunitiesPage } from './components/public/OpportunitiesPage';
import { MentorshipPage } from './components/public/MentorshipPage';
import { PartnershipsPage } from './components/public/PartnershipsPage';
import { NewsPage } from './components/public/NewsPage';
import { ContactPage } from './components/public/ContactPage';
import { MediaGalleryPage } from './components/public/MediaGalleryPage';
import { SubmissionTrackingPage } from './components/public/SubmissionTrackingPage';
import { DynamicCmsPage } from './components/public/DynamicCmsPage';

// Admin System
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminOverview } from './components/admin/AdminOverview';
import { AdminUsers } from './components/admin/AdminUsers';
import { AdminLMS } from './components/admin/AdminLMS';
import { AdminStartups } from './components/admin/AdminStartups';
import { AdminInnovation } from './components/admin/AdminInnovation';
import { AdminPrograms } from './components/admin/AdminPrograms';
import { AdminCommunity } from './components/admin/AdminCommunity';
import { AdminEvents } from './components/admin/AdminEvents';
import { AdminMentorship } from './components/admin/AdminMentorship';
import { AdminOpportunities } from './components/admin/AdminOpportunities';
import { AdminPartnerships } from './components/admin/AdminPartnerships';
import { AdminWebsiteBuilder } from './components/admin/AdminWebsiteBuilder';
import { MediaLibrary } from './components/admin/MediaLibrary';
import { AdminImpact } from './components/admin/AdminImpact';
import { AdminAI } from './components/admin/AdminAI';
import { AdminSettings } from './components/admin/AdminSettings';
import { AdminVisitors } from './components/admin/AdminVisitors';

// Education Portals
import { EducationLayout } from './components/education/EducationLayout';
import { EducationHome } from './components/education/EducationHome';
import { EducationAdminPortal } from './components/education/EducationAdminPortal';
import { TeacherPortal } from './components/education/TeacherPortal';
import { StudentPortal } from './components/education/StudentPortal';

// Role Portals
import { LearnerDashboard } from './components/portals/LearnerDashboard';
import { InstructorDashboard } from './components/portals/InstructorDashboard';
import { StartupDashboard } from './components/portals/StartupDashboard';
import { MentorDashboard } from './components/portals/MentorDashboard';
import { PartnerDashboard } from './components/portals/PartnerDashboard';
import { VisitorPortal } from './components/portals/VisitorPortal';

// Shared Components & Modals
import { RoleSwitcherBar } from './components/common/RoleSwitcherBar';
import { MobileBottomBar } from './components/common/MobileBottomBar';
import { ToastContainer } from './components/common/ToastContainer';
import { SiHubAIAssistant } from './components/ai/SiHubAIAssistant';
import { ApplyCourseModal } from './components/modals/ApplyCourseModal';
import { EventRegisterModal } from './components/modals/EventRegisterModal';
import { PitchStartupModal } from './components/modals/PitchStartupModal';
import { ShieldAlert, ArrowLeft, LogOut } from 'lucide-react';

function AdminTabRenderer({ tab }: { tab: AdminTab }) {
  switch (tab) {
    case 'overview': return <AdminOverview />;
    case 'users': return <AdminUsers />;
    case 'lms': return <AdminLMS />;
    case 'startups': return <AdminStartups />;
    case 'innovation': return <AdminInnovation />;
    case 'programs': return <AdminPrograms />;
    case 'community': return <AdminCommunity />;
    case 'events': return <AdminEvents />;
    case 'mentorship': return <AdminMentorship />;
    case 'opportunities': return <AdminOpportunities />;
    case 'partnerships': return <AdminPartnerships />;
    case 'content': return <AdminWebsiteBuilder />;
    case 'media': return <MediaLibrary />;
    case 'impact': return <AdminImpact />;
    case 'ai': return <AdminAI />;
    case 'settings': return <AdminSettings />;
    case 'visitors': return <AdminVisitors />;
    default: return <AdminOverview />;
  }
}

function MainViewRouter() {
  const {
    currentView,
    adminTab,
    authUser,
    authLoading,
    logout,
    navigateTo,
    selectedCourseForApply,
    selectedEventForRegister,
    isStartupModalOpen,
    isAiAssistantOpen,
    language
  } = useApp();

  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const role = authUser?.role ?? null;

  // 0. Session Verification Loader (Prevents flash or premature logout during refresh)
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-600 font-sans">
        <div className="w-9 h-9 border-3 border-cyan-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-slate-700">
          {language === 'so' ? 'Hubinta fadhiga SiHub…' : 'Verifying SiHub session…'}
        </p>
      </div>
    );
  }

  // 1. Admin System Routing & Strict RBAC Protection
  if (currentView === 'admin') {
    // Unauthenticated: Direct access to working Admin Login Page
    if (!authUser) {
      return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
          <Header />
          <AuthPanel portal="admin" initialMode="login" />
          <Footer />
          <MobileBottomBar />
          <ToastContainer />
        </div>
      );
    }

    // Authenticated but unauthorized role (e.g. STUDENT, LEARNER, etc.)
    if (!isAdminRole(role)) {
      return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
          <Header />
          <main className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 mx-auto flex items-center justify-center mb-4">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2 font-heading">
                {language === 'so' ? 'Maamul Kaliya' : 'Administrative Access Required'}
              </h2>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                {language === 'so'
                  ? `Akoonkaaga (${authUser.email}) leh doorka ${authUser.role} ma laha fasaxa gelitaanka qaybta maamulka. Fadlan ku soo gal akoon maamul (OWNER, SUPER_ADMIN, ama ADMIN).`
                  : `Your signed-in account (${authUser.email}) with role ${authUser.role} is not authorized for the SiHub Admin Dashboard. Access is restricted to OWNER, SUPER_ADMIN, and ADMIN roles.`}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => void logout()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{language === 'so' ? 'Ka Bax / Bedel Akoon' : 'Sign Out / Switch Account'}</span>
                </button>
                <button
                  onClick={() => navigateTo('home')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{language === 'so' ? 'Ku Noqo Bogga Hore' : 'Return to Public Site'}</span>
                </button>
              </div>
            </div>
          </main>
          <Footer />
          <MobileBottomBar />
          <ToastContainer />
        </div>
      );
    }

    // Authorized Admin / Owner Access
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
        <RoleSwitcherBar />
        <AdminLayout>
          <AdminTabRenderer tab={adminTab} />
        </AdminLayout>
        <ToastContainer />
      </div>
    );
  }

  // 2. Education Layout & Subportals
  if (currentView === 'education') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
        {shouldShowRoleSwitcher(currentView, role) && <RoleSwitcherBar />}
        <EducationLayout activePortal="hub">
          <EducationHome />
        </EducationLayout>
        <Footer />
        <MobileBottomBar />
        <ToastContainer />
      </div>
    );
  }
  if (currentView === 'education_admin') {
    if (!authUser) {
      return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
          <Header />
          <AuthPanel portal="admin" initialMode="login" />
          <Footer />
          <MobileBottomBar />
          <ToastContainer />
        </div>
      );
    }
    if (!canAccessView('education_admin', role)) {
      return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
          <Header />
          <main className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-lg">
              <ShieldAlert className="w-10 h-10 text-amber-500 mx-auto mb-3" />
              <h2 className="text-lg font-bold text-slate-900 mb-2">Education Admin Access Required</h2>
              <p className="text-xs text-slate-600 mb-4">Requires Education Manager, Admin, or Owner credentials.</p>
              <button onClick={() => navigateTo('home')} className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-semibold">Return Home</button>
            </div>
          </main>
          <Footer />
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
        <RoleSwitcherBar />
        <EducationLayout activePortal="admin">
          <EducationAdminPortal />
        </EducationLayout>
        <ToastContainer />
      </div>
    );
  }
  if (currentView === 'education_teacher') {
    if (!authUser) {
      return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
          <Header />
          <AuthPanel portal="learner" initialMode="login" />
          <Footer />
          <MobileBottomBar />
          <ToastContainer />
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
        <RoleSwitcherBar />
        <EducationLayout activePortal="teacher">
          <TeacherPortal />
        </EducationLayout>
        <ToastContainer />
      </div>
    );
  }
  if (currentView === 'education_student') {
    if (!authUser) {
      return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
          <Header />
          <AuthPanel portal="learner" initialMode="login" />
          <Footer />
          <MobileBottomBar />
          <ToastContainer />
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
        <RoleSwitcherBar />
        <EducationLayout activePortal="student">
          <StudentPortal />
        </EducationLayout>
        <ToastContainer />
      </div>
    );
  }

  // 3. Standalone Role Portals (Learner, Startup, Partner, Mentor, Instructor)
  if (currentView === 'learner_portal') {
    if (!authUser) {
      return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
          <Header />
          <AuthPanel portal="learner" initialMode="login" />
          <Footer />
          <MobileBottomBar />
          <ToastContainer />
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
        <RoleSwitcherBar />
        <Header />
        <main className="flex-1"><LearnerDashboard /></main>
        <Footer />
        <MobileBottomBar />
        <ToastContainer />
      </div>
    );
  }
  if (currentView === 'startup_portal') {
    if (!authUser) {
      return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
          <Header />
          <AuthPanel portal="startup" initialMode="login" />
          <Footer />
          <MobileBottomBar />
          <ToastContainer />
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
        <RoleSwitcherBar />
        <Header />
        <main className="flex-1"><StartupDashboard /></main>
        <Footer />
        <MobileBottomBar />
        <ToastContainer />
      </div>
    );
  }
  if (currentView === 'partner_portal') {
    if (!authUser) {
      return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
          <Header />
          <AuthPanel portal="partner" initialMode="login" />
          <Footer />
          <MobileBottomBar />
          <ToastContainer />
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
        <RoleSwitcherBar />
        <Header />
        <main className="flex-1"><PartnerDashboard /></main>
        <Footer />
        <MobileBottomBar />
        <ToastContainer />
      </div>
    );
  }
  if (currentView === 'instructor_portal') {
    if (!authUser) {
      return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
          <Header />
          <AuthPanel portal="learner" initialMode="login" />
          <Footer />
          <MobileBottomBar />
          <ToastContainer />
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
        <RoleSwitcherBar />
        <Header />
        <main className="flex-1"><InstructorDashboard /></main>
        <Footer />
        <MobileBottomBar />
        <ToastContainer />
      </div>
    );
  }
  if (currentView === 'mentor_portal') {
    if (!authUser) {
      return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
          <Header />
          <AuthPanel portal="learner" initialMode="login" />
          <Footer />
          <MobileBottomBar />
          <ToastContainer />
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
        <RoleSwitcherBar />
        <Header />
        <main className="flex-1"><MentorDashboard /></main>
        <Footer />
        <MobileBottomBar />
        <ToastContainer />
      </div>
    );
  }

  // 4. Public Pages & Dynamic CMS Subsections
  const renderViewContent = () => {
    switch (currentView) {
      // Public Primary Pages
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'programs':
        return <ProgramsPage />;
      case 'courses':
        return <CoursesPage />;
      case 'startups':
        return <StartupHubPage />;
      case 'innovation':
        return <InnovationLabPage />;
      case 'community':
        return <CommunityPage />;
      case 'events':
        return <EventsPage />;
      case 'opportunities':
        return <OpportunitiesPage />;
      case 'mentorship':
        return <MentorshipPage />;
      case 'partnerships':
        return <PartnershipsPage />;
      case 'news':
        return <NewsPage />;
      case 'contact':
        return <ContactPage />;
      case 'media':
        return <MediaGalleryPage />;
      case 'submission_tracking':
        return <SubmissionTrackingPage />;
      case 'impact':
        return <DynamicCmsPage slug="impact" />;
      case 'cms_page': {
        const slug = currentPath.replace(/^\//, '') || 'home';
        return <DynamicCmsPage slug={slug} />;
      }
      case 'visitor_portal':
        return <VisitorPortal />;

      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {shouldShowRoleSwitcher(currentView, role) && <RoleSwitcherBar />}
      <Header />
      <main className="flex-1">
        {renderViewContent()}
      </main>
      <Footer />
      <MobileBottomBar />

      {/* Global Overlays & Modals */}
      {selectedCourseForApply && <ApplyCourseModal />}
      {selectedEventForRegister && <EventRegisterModal />}
      {isStartupModalOpen && <PitchStartupModal />}
      {isAiAssistantOpen && <SiHubAIAssistant />}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainViewRouter />
    </AppProvider>
  );
}
