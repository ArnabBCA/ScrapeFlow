"use client";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { headerRoutes } from "@/lib/data";
import { MenuIcon, XIcon, ZapIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerTitle,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Logo from "@/components/Logo";

function scrollIntoView(ele: string) {
  const element = document.getElementById(ele.substring(1));
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth" });
}

function Navbar() {
  const isMobile = useIsMobile();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [isMobile]);

  return (
    <header className="h-16 px-10 flex items-center max-w-screen-xl mx-auto w-full sticky top-0 backdrop-blur-sm z-50">
      {/* Logo */}

      <Logo />

      {/* Mobile menu toggle */}
      {isMobile && (
        <div className="ml-auto">
          {!isMobileOpen ? (
            <MenuIcon
              className="cursor-pointer"
              onClick={() => setIsMobileOpen(true)}
            />
          ) : (
            <XIcon
              className="cursor-pointer"
              onClick={() => setIsMobileOpen(false)}
            />
          )}
        </div>
      )}

      {/* Desktop navigation */}
      {!isMobile && (
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          {headerRoutes.map((route) =>
            route?.button ? (
              <Link key={route.href} href={route.href}>
                <button className="shadow__btn">
                  {route.title}
                </button>
              </Link>
            ) : (
              <span
                key={route.href}
                className="text-lg font-light text-white hover:text-primary cursor-pointer select-none transition"
                onClick={() => scrollIntoView(route.href)}
              >
                {route.title}
              </span>
            )
          )}
        </nav>
      )}

      {/* Mobile Drawer */}
      {isMobileOpen && <MobileMenu onClose={() => setIsMobileOpen(false)} />}
    </header>
  );
}

export default Navbar;

const MobileMenu = ({
  className,
  onClose,
}: {
  className?: string;
  onClose?: () => void;
}) => {
  return (
    <Drawer open onOpenChange={onClose}>
      {/*<DrawerTrigger asChild>
        <Button className={className} variant="secondary" size="icon">
          <MenuIcon size={20} />
        </Button>
      </DrawerTrigger>*/}

      <DrawerContent>
        <DrawerTitle className="sr-only">menu</DrawerTitle>
        <DrawerHeader className="gap-4 items-center justify-center flex flex-col">
          {headerRoutes.map((route) =>
            route?.button ? (
              <Link href={route.href} key={route.href}>
                <button className="shadow__btn" onClick={onClose}>
                  {route.title}
                </button>
              </Link>
            ) : (
              <span
                key={route.href}
                className="text-lg font-light text-white hover:text-primary cursor-pointer select-none transition"
                onClick={() => {
                  scrollIntoView(route.href);
                  onClose?.();
                }}
              >
                {route.title}
              </span>
            )
          )}
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};
