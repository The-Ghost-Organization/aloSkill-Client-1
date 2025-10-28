"use client";

import HeroSection from "@/app/(HomePageComponents)/(HeroSection)/HeroSection";
import BonusesSection from "@/app/(HomePageComponents)/BonusSection";
import { CategoriesSectionAnimated } from "@/app/(HomePageComponents)/CategoriesSectionAnimated";
import { CertificateSectionSimple } from "@/app/(HomePageComponents)/CertificateSectionSimple";
import CommunitySection from "@/app/(HomePageComponents)/CommunitySection";
import ConsultationSection from "@/app/(HomePageComponents)/ConsultationSection";
import { DiscoverBooksSectionCarousel } from "@/app/(HomePageComponents)/DiscoverBooksSectionCarousel";
import GCommunitySection from "@/app/(HomePageComponents)/GCommunitySection";
import { InstructorsSectionAdvanced } from "@/app/(HomePageComponents)/InstructorsSectionAdvanced";
import PopularCoursesSection from "@/app/(HomePageComponents)/PopularCoursesSection";
import { WhyLearnSectionAnimated } from "@/app/(HomePageComponents)/WhyLearnSectionAnimated";
import StatsSection from "@/components/StatsSection";
import Newsletter from "@/components/shared/footer/Newsletter";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSectionAnimated />
      <StatsSection />
      <BonusesSection />
      <WhyLearnSectionAnimated />
      <PopularCoursesSection />
      <DiscoverBooksSectionCarousel />
      <InstructorsSectionAdvanced />
      <CommunitySection />
      <GCommunitySection />
      <CertificateSectionSimple />
      <ConsultationSection />
      <Newsletter />
    </>
  );
}
