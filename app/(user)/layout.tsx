import { ReactNode } from "react";
import Script from "next/script";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Script
        id="zoho-pagesense"
        strategy="afterInteractive"
        src="https://cdn.pagesense.io/js/903394376/36033de429fb468f997e68fe6c1b1c23.js"
      />
      {children}
    </>
  );
}

