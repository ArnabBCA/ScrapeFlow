"use client";
import { TypewriterEffectSmooth } from "@/components/accernity-ui/TypeWriterEffect";
import { Button } from "@/components/ui/button";
import { pricingPlans, typeWriterWords } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import { FeaturesSection } from "./_components/Feature";
import { FeaturesGradient } from "./_components/FeaturesGradient";

import { HoverEffect } from "@/components/accernity-ui/CardHover";
import Link from "next/link";
import Navbar from "./_components/Navbar";
import Typewriter from "typewriter-effect";
import { LampContainer } from "@/app/(home-landing)/_components/LampContainer";

export default function HomeLandingPage() {
  return (
    <div className="flex flex-col items-center min-h-screen selection:bg-primary selection:text-white">
      <Navbar />
      <SectionWrapper className="h-screen text-center -mt-[80px] !p-0">
        <LampContainer>
          <div className="flex flex-col items-center gap-4">
            <div className="min-h-[36px] md:min-h-[44px] lg:min-h-[57.6px] h-auto">
              <Typewriter
                options={{
                  strings: [
                    '<span class="text-gradient2">Build Powerful Web Scraping Workflows.</span>',
                  ],
                  autoStart: true,
                  loop: true,
                  skipAddStyles: true,

                  cursorClassName:
                    "text-primary text-2xl md:text-3xl lg:text-4xl xl:text-5xl blinking-cursor",
                  wrapperClassName:
                    "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center",
                }}
              />
            </div>

            <p className="text-gradient2 text-sm md:text-xl">
              Create, automate, and scale your web scraping projects with ease.
              No coding required.
            </p>
          </div>
          <div className="relative rounded-full p-[1px] h-8 inline-flex overflow-hidden text-[14px]/6 text-gray-200 transition my-10">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FFFF00_0%,transparent_50%,#FFFF00_100%)]"></span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-full px-3 py-1 w-full cursor-pointer items-center justify-center rounded-full bg-stone-900 backdrop-blur-3xl"
              aria-label="Read about our latest undetectability update"
              href="/still_working"
            >
              Powered by
              <span className="ml-1 font-semibold text-[#FFFF00]">AI</span>
            </a>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Link href={"/sign-in"}>
              <button className="shadow__btn flex items-center gap-2">
                Get Started
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </Link>

            <p className="text-sm text-primary">
              New users get 200 credits for free upon first login
            </p>
          </div>
        </LampContainer>
      </SectionWrapper>
      <SectionWrapper
        id="howItWorks"
        primaryTitle="How"
        secondaryTitle="It Works"
      >
        <FeaturesGradient />
      </SectionWrapper>
      <SectionWrapper
        id="scrapingFeatures"
        primaryTitle="Scraping"
        secondaryTitle="Features"
      >
        <FeaturesSection />
      </SectionWrapper>
      <SectionWrapper
        id="pricing"
        primaryTitle="Simple"
        secondaryTitle="Pricing"
      >
        <div className="flex gap-5 w-full">
          <HoverEffect items={[...pricingPlans]} />
        </div>
      </SectionWrapper>

      {/*<SectionWrapper className="text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#22C55E] to-green-600">
          Start Scraping Today
        </h2>
        <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
          Join thousands of users who are already leveraging our powerful web
          scraping platform.
        </p>
        <Link
          className="w-max bg-[#22C55E] text-white hover:bg-[#22C55E]/90 transition-colors flex px-4 py-2 rounded-sm items-center"
          href={"/sign-in"}
        >
          Sign Up Now
          <ChevronRightIcon className="ml-2 h-4 w-4" />
        </Link>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          No credit card required. Start with 200 free credits.
        </p>
      </SectionWrapper>*/}
    </div>
  );
}

function SectionWrapper({
  children,
  className,
  id,
  primaryTitle,
  secondaryTitle,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  primaryTitle?: string;
  secondaryTitle?: string;
}) {
  return (
    <section
      className={cn(
        "flex flex-col items-center justify-center p-4 box-border w-full max-w-screen-xl scroll-mt-[80px] sm:p-6 md:p-10",
        className
      )}
      id={id}
    >
      {primaryTitle && (
        <h1 className="text-gradient text-3xl sm:text-4xl md:text-5xl font-sans font-bold h-12 sm:h-14 md:h-16">
          {primaryTitle} {secondaryTitle}
        </h1>
      )}
      {children}
    </section>
  );
}
