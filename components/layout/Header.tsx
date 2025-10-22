'use client';

import { QuoteLauncher } from '@/components/quote/QuoteLauncher';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [personalDropdownOpen, setPersonalDropdownOpen] = useState(false);
  const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false);

  const personalInsuranceLinks = [
    { href: '/personal/auto', label: 'Auto Insurance' },
    { href: '/personal/home', label: 'Home Insurance' },
    { href: '/personal/renters', label: 'Renters Insurance' },
    { href: '/personal/life', label: 'Life Insurance' },
    { href: '/personal/boat', label: 'Boat Insurance' },
    { href: '/personal/flood', label: 'Flood Insurance' },
  ];

  const businessInsuranceLinks = [
    { href: '/business/business', label: 'Business Insurance' },
    { href: '/business/landlord', label: 'Landlord Insurance' },
    { href: '/business/bonds', label: 'Surety Bonds' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/assets/brand/logo-primary.svg"
              alt="Texas General Insurance"
              width={180}
              height={60}
              className="h-14 w-auto"
              priority
            />
            <span className="text-xl font-bold text-primary hidden sm:inline">
              Texas General Insurance
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            <div
              className="relative group"
              onMouseEnter={() => setPersonalDropdownOpen(true)}
              onMouseLeave={() => setPersonalDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors py-2">
                <span>Personal Insurance</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {personalDropdownOpen && (
                <div className="absolute left-0 top-full pt-2 w-56">
                  <div className="bg-white border border-gray-200 rounded-md shadow-lg py-2">
                    {personalInsuranceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-gray-50 hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative group"
              onMouseEnter={() => setBusinessDropdownOpen(true)}
              onMouseLeave={() => setBusinessDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors py-2">
                <span>Business Insurance</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {businessDropdownOpen && (
                <div className="absolute left-0 top-full pt-2 w-56">
                  <div className="bg-white border border-gray-200 rounded-md shadow-lg py-2">
                    {businessInsuranceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-gray-50 hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/resources" className="text-foreground hover:text-primary transition-colors">
              Resources
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <a href="tel:+12814944990" className="flex items-center space-x-2 text-primary hover:text-secondary transition-colors">
              <Phone className="h-4 w-4" />
              <span className="font-semibold">(281) 494-4990</span>
            </a>
            <QuoteLauncher size="lg" />
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div className="space-y-2">
              <div className="font-semibold text-sm text-muted-foreground">Personal Insurance</div>
              {personalInsuranceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="space-y-2">
              <div className="font-semibold text-sm text-muted-foreground">Business Insurance</div>
              {businessInsuranceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-200">
              <Link
                href="/about"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/resources"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <Link
                href="/contact"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>

            <div className="pt-4 space-y-3">
              <a href="tel:+12814944990" className="flex items-center space-x-2 text-primary font-semibold">
                <Phone className="h-4 w-4" />
                <span>(281) 494-4990</span>
              </a>
              <QuoteLauncher className="w-full" size="lg" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
