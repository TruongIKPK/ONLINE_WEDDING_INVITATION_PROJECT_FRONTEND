import Navbar from '../components/layout/Navbar';
import LandingPage from '../components/layout/LandingPage';
import Footer from '../components/layout/Footer';
import EditorPage from './templates/[templateId]/edit/page';
export default function Home() {
  return (
    <div className="overflow-x-hidden">
      {/* <Navbar />
      <LandingPage />
      <Footer /> */}
      <EditorPage />
    </div>
  );
}