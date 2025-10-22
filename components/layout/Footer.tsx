import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Image
              src="/assets/brand/logo-footer.png"
              alt="Texas General Insurance"
              width={180}
              height={60}
              className="mb-4 w-auto max-w-[180px]"
              style={{ height: 'auto' }}
            />
            <h3 className="text-xl font-bold mb-4 sr-only">Texas General Insurance</h3>
            <p className="text-gray-300 mb-4">
              Your neighbors in Sugar Land, providing honest, personal insurance advice you can't get from a 1-800 number.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Personal Insurance</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/personal/auto" className="text-gray-300 hover:text-white transition-colors">
                  Auto Insurance
                </Link>
              </li>
              <li>
                <Link href="/personal/home" className="text-gray-300 hover:text-white transition-colors">
                  Home Insurance
                </Link>
              </li>
              <li>
                <Link href="/personal/renters" className="text-gray-300 hover:text-white transition-colors">
                  Renters Insurance
                </Link>
              </li>
              <li>
                <Link href="/personal/life" className="text-gray-300 hover:text-white transition-colors">
                  Life Insurance
                </Link>
              </li>
              <li>
                <Link href="/personal/boat" className="text-gray-300 hover:text-white transition-colors">
                  Boat Insurance
                </Link>
              </li>
              <li>
                <Link href="/personal/flood" className="text-gray-300 hover:text-white transition-colors">
                  Flood Insurance
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Business Insurance</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/business/business" className="text-gray-300 hover:text-white transition-colors">
                  Business Insurance
                </Link>
              </li>
              <li>
                <Link href="/business/landlord" className="text-gray-300 hover:text-white transition-colors">
                  Landlord Insurance
                </Link>
              </li>
              <li>
                <Link href="/business/bonds" className="text-gray-300 hover:text-white transition-colors">
                  Surety Bonds
                </Link>
              </li>
            </ul>
            <h4 className="font-semibold mt-6 mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-300 hover:text-white transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-gray-300 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">
                  132 Eldridge Rd, Suite C<br />
                  Sugar Land, TX 77478
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-gray-300 flex-shrink-0" />
                <a href="tel:+12814944990" className="text-gray-300 hover:text-white transition-colors">
                  (281) 494-4990
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-gray-300 flex-shrink-0" />
                <a href="mailto:info@texasgeneralinsurance.com" className="text-gray-300 hover:text-white transition-colors">
                  info@tgiagency.com
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-sm text-gray-300">
                <strong>Office Hours:</strong><br />
                Monday - Friday: 9:00 AM - 5:00 PM
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Texas General Insurance. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="text-gray-300 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-300 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
