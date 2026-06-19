import dynamic from "next/dynamic";
import { WithLoader } from "@/components/LoadingScreen/useLoader";
import LazyMotionProvider from "@/components/shared/LazyMotionProvider";
<<<<<<< HEAD

=======
>>>>>>> 23d55c2ba47066dd01e8acf95020645a81280769
const SmoothScroll = dynamic(() => import("@/components/shared/SmoothScroll"));
const ScrollOnNavigate = dynamic(() => import("@/components/shared/ScrollOnNavigate"));
const Navbar = dynamic(() => import("@/components/shared/Navbar"));
const Footer = dynamic(() => import("@/components/shared/Footer"));
<<<<<<< HEAD
=======
import ScrollProgressLoader from "@/components/layout/ScrollProgressLoader";
>>>>>>> 23d55c2ba47066dd01e8acf95020645a81280769

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WithLoader>
<<<<<<< HEAD
      <LazyMotionProvider>
        <Navbar />
=======
      
      <LazyMotionProvider>
        <Navbar />
        <ScrollProgressLoader />
>>>>>>> 23d55c2ba47066dd01e8acf95020645a81280769

        <SmoothScroll>
          <ScrollOnNavigate />
          {children}
        </SmoothScroll>

        <Footer />
      </LazyMotionProvider>
    </WithLoader>
  );
}