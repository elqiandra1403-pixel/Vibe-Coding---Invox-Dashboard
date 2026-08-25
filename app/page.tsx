import * as React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { MetricsSection } from "@/components/landing/MetricsSection";
import { ProblemSolutionSection } from "@/components/landing/ProblemSolutionSection";
import { RoleAccessSection } from "@/components/landing/RoleAccessSection";
import { InvoiceOperationsSection } from "@/components/landing/InvoiceOperationsSection";
import { FeatureSpotlights } from "@/components/landing/FeatureSpotlights";
import { DarkSection } from "@/components/landing/DarkSection";
import { FeatureGridSection } from "@/components/landing/FeatureGridSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { RoleViewsSection } from "@/components/landing/RoleViewsSection";
import { CtaBanner } from "@/components/landing/CtaBanner";
import { FaqAccordionSection } from "@/components/landing/FaqAccordionSection";
import { DarkFinalCtaSection } from "@/components/landing/DarkFinalCtaSection";
import { Footer } from "@/components/landing/Footer";
import { ScrollRevealWrapper } from "@/components/landing/ScrollRevealWrapper";

export default function LandingPage() {
  return (
    <div className="landing-wrapper">
      <Navbar />
      <ScrollRevealWrapper>
        <main>
          <Hero />
          <div className="scroll-reveal"><MetricsSection /></div>
          <div className="scroll-reveal"><ProblemSolutionSection /></div>
          <div className="scroll-reveal"><RoleAccessSection /></div>
          <div className="scroll-reveal"><InvoiceOperationsSection /></div>
          <div className="scroll-reveal"><FeatureSpotlights /></div>
          <div className="scroll-reveal"><DarkSection /></div>
          <div className="scroll-reveal"><FeatureGridSection /></div>
          <div className="scroll-reveal"><TestimonialsSection /></div>
          <div className="scroll-reveal"><FaqSection /></div>
          <div className="scroll-reveal"><RoleViewsSection /></div>
          <div className="scroll-reveal"><CtaBanner /></div>
          <div className="scroll-reveal"><FaqAccordionSection /></div>
          <div className="scroll-reveal"><DarkFinalCtaSection /></div>
        </main>
      </ScrollRevealWrapper>
      <Footer />
    </div>
  );
}
