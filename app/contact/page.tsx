"use client";
import ContactPage from "@/components/contactpage/contact";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const scrollParam = urlParams.get("scroll");

  if (scrollParam === "inquiry") {
    setTimeout(() => {
      const inquirySection = document.getElementById("inquiry");

      if (inquirySection) {
        const headerOffset = 60;

        const elementPosition =
          inquirySection.getBoundingClientRect().top;

        const offsetPosition =
          elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // clean URL
        window.history.replaceState({}, "", "/contact");
      }
    }, 500);
  }
}, []);
return <ContactPage />;
}
