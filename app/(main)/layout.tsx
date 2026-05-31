import SmoothScroll from "@/components/shared/SmoothScroll";
import ScrollOnNavigate from "@/components/shared/ScrollOnNavigate";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <SmoothScroll>
        <ScrollOnNavigate />
        {children}
      </SmoothScroll>
      <Footer />
    </>
  );
}
