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
import { PricingSection } from "@/components/landing/PricingSection";
import { CtaBanner } from "@/components/landing/CtaBanner";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="landing-wrapper">
      <Navbar />
      <main>
        <Hero />
        <MetricsSection />
        <ProblemSolutionSection />
        <RoleAccessSection />
        <InvoiceOperationsSection />
        <FeatureSpotlights />
        <DarkSection />
        <FeatureGridSection />
        <TestimonialsSection />
        <FaqSection />
        <RoleViewsSection />
        <PricingSection />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
