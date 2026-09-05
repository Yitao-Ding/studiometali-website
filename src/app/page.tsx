import type { Metadata } from "next";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Works } from "@/components/sections/works";
import { Profile } from "@/components/sections/profile";
import { Services } from "@/components/sections/services";
import { News } from "@/components/sections/news";
import { Instagram } from "@/components/sections/instagram";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Works />
        <Profile />
        <Services />
        <News />
        <Instagram />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
