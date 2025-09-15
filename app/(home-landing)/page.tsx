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
import { Lamp } from "./_components/Lamp";
import Typewriter from "typewriter-effect";

export default function HomeLandingPage() {
  return (
    <div className="flex flex-col items-center min-h-screen selection:bg-primary selection:text-white">
      <Navbar />
      {/*<SectionWrapper className="h-screen text-center -mt-[80px] !p-0">
        <Lamp>
          <div className="flex flex-col items-center gap-4">
            <Typewriter
              options={{
                strings: [
                  '<span>Build Powerful <span style="color: #27ae60;">Web Scraping</span> Workflows.</span>',
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
            <p className="text-muted-foreground text-sm md:text-xl">
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
              <Button className="w-40 h-10 rounded-xl text-sm text-white shadow-[0_0_10px_4px] shadow-green-500/50">
                Get Started
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </Link>
            <p className="text-sm text-primary">
              New users get 200 credits for free upon first login
            </p>
          </div>
        </Lamp>
      </SectionWrapper>*/}
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
        <div className="flex gap-5 w-full mt-10">
          <HoverEffect items={[...pricingPlans]} />
        </div>
      </SectionWrapper>

      <SectionWrapper className="text-center">
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
      </SectionWrapper>
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
        "flex flex-col items-center justify-center py-10 box-border w-full max-w-screen-xl scroll-mt-[80px] md:p-10",
        className
      )}
      id={id}
    >
      {primaryTitle && (
        <h1 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-3xl lg:text-5xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          {primaryTitle} {secondaryTitle}
        </h1>
      )}
      {children}
    </section>
  );
}
