import dynamic from "next/dynamic";
import { WithLoader } from "@/components/LoadingScreen/useLoader";
import LazyMotionProvider from "@/components/shared/LazyMotionProvider";

const SmoothScroll = dynamic(() => import("@/components/shared/SmoothScroll"));
const ScrollOnNavigate = dynamic(() => import("@/components/shared/ScrollOnNavigate"));
const Navbar = dynamic(() => import("@/components/shared/Navbar"));
const Footer = dynamic(() => import("@/components/shared/Footer"));

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WithLoader>
      <LazyMotionProvider>
        <Navbar />

        <SmoothScroll>
          <ScrollOnNavigate />
          {children}
        </SmoothScroll>

        <Footer />
      </LazyMotionProvider>
    </WithLoader>
  );
}