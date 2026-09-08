import GovernmentBar from "../components/layout/Landing/GovernmentBar";
import Navbar from "../components/layout/Landing/Navbar";
import HeroSection from "../components/layout/Landing/HeroSection";
import NationalStats from "../components/layout/Landing/NationalStats";
import AcquisitionLifecycle from "../components/layout/Landing/AcquisitionLifecycle";
import NationalMonitoring from "../components/layout/Landing/NationalMonitoring";
import ProjectShowcase from "../components/layout/Landing/ProjectShowcase";
import TransparencySection from "../components/layout/Landing/TransparencySection";
import KhasraSearch from "../components/layout/Landing/KhasraSearch";
import ServiceDirectory from "../components/layout/Landing/ServiceDirectory";
import LatestUpdates from "../components/layout/Landing/LatestUpdates";
import SecuritySection from "../components/layout/Landing/SecuritySection";
import Footer from "../components/layout/Landing/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <GovernmentBar />

      <Navbar />

      <main>
        {/* Hero */}
        <HeroSection />

        {/* National overview */}
        <NationalStats />

        {/* Acquisition lifecycle */}
        <AcquisitionLifecycle />

        {/* National monitoring */}
        <NationalMonitoring />

        {/* Project showcase */}
        <ProjectShowcase />

        {/* Public transparency */}
        <TransparencySection />

        {/* Reserved Khasra section */}
        <KhasraSearch />

        {/* Public services */}
        <ServiceDirectory />

        {/* Notices & updates */}
        <div id="updates">
          <LatestUpdates />
        </div>

        {/* Security & governance */}
        <SecuritySection />
      </main>

      <Footer />
    </div>
  );
}