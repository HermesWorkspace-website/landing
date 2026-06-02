import SmoothScroll from "@/components/shared/SmoothScroll";
import ScrollOnNavigate from "@/components/shared/ScrollOnNavigate";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { WithLoader } from "@/components/LoadingScreen/useLoader";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <WithLoader>
      <Navbar />
      <SmoothScroll>
        <ScrollOnNavigate />
        {children}
      </SmoothScroll>
      <Footer />
    </WithLoader>
  );
}
