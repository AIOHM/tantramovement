import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollProgress from "./components/effects/ScrollProgress";
import Index from "./pages/Index";
import About from "./pages/About";
import Tantra from "./pages/Tantra";
import Workshops from "./pages/Workshops";
import WorkshopDetails from "./pages/WorkshopDetails";
import TeacherCourse from "./pages/TeacherCourse";
import Apply from "./pages/Apply";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import WorkshopAdmin from "./pages/WorkshopAdmin";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogAdmin from "./pages/BlogAdmin";
import BlogEditor from "./pages/BlogEditor";
import ContactAdmin from "./pages/ContactAdmin";
import ConsultationAdmin from "./pages/ConsultationAdmin";
import SettingsAdmin from "./pages/SettingsAdmin";
import AnalyticsAdmin from "./pages/AnalyticsAdmin";
import AffiliateLanding from "./affiliate/AffiliateLanding";
import AffiliateDashboardPage from "./affiliate/AffiliateDashboardPage";
import PartnerLogin from "./affiliate/PartnerLogin";
import PartnerSignup from "./affiliate/PartnerSignup";
import Analytics from "./components/analytics/Analytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollProgress />
        <Analytics />
        <Routes>
          <Route path="/" element={<TeacherCourse />} />
          <Route path="/about" element={<About />} />
          <Route path="/tantra" element={<Tantra />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/workshop/:id" element={<WorkshopDetails />} />
          <Route path="/teacher-course" element={<TeacherCourse />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/affiliate" element={<AffiliateLanding />} />
          <Route path="/affiliate/login" element={<PartnerLogin />} />
          <Route path="/affiliate/signup" element={<PartnerSignup />} />
          <Route path="/affiliate/dashboard" element={<AffiliateDashboardPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/workshops" element={<WorkshopAdmin />} />
          <Route path="/admin/blog" element={<BlogAdmin />} />
          <Route path="/admin/blog/new" element={<BlogEditor />} />
          <Route path="/admin/blog/edit/:id" element={<BlogEditor />} />
          <Route path="/admin/contact" element={<ContactAdmin />} />
          <Route path="/admin/consultations" element={<ConsultationAdmin />} />
          <Route path="/admin/settings" element={<SettingsAdmin />} />
          <Route path="/admin/analytics" element={<AnalyticsAdmin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
