import { HeroSection } from '@/components/sections/HeroSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Texas General Insurance',
  description: 'Learn how Texas General Insurance collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <HeroSection
        title="Privacy Policy"
        subtitle="YOUR PRIVACY MATTERS"
        description="Learn how we collect, use, and protect your personal information."
        variant="compact"
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="text-sm text-muted-foreground">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <h2>Introduction</h2>
            <p>
              At Texas General Insurance ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>

            <h2>Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul>
              <li>Contact information (name, email address, phone number, mailing address)</li>
              <li>Insurance-related information (property details, vehicle information, coverage preferences)</li>
              <li>Financial information (for policy processing and payment)</li>
              <li>Communications you send to us</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide insurance quotes and policy recommendations</li>
              <li>Process insurance applications and manage your policies</li>
              <li>Communicate with you about your insurance coverage</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Improve our services and website functionality</li>
              <li>Comply with legal obligations and regulatory requirements</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>Insurance carriers to obtain quotes and process policies</li>
              <li>Service providers who assist us in operating our business</li>
              <li>Legal authorities when required by law or to protect our rights</li>
            </ul>
            <p>
              We do not sell your personal information to third parties for their marketing purposes.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access and review the personal information we hold about you</li>
              <li>Request correction of inaccurate or incomplete information</li>
              <li>Request deletion of your personal information (subject to legal obligations)</li>
              <li>Opt-out of marketing communications</li>
              <li>Object to certain processing of your personal information</li>
            </ul>

            <h2>Cookies and Tracking Technologies</h2>
            <p>
              Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on our website with a new "Last Updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <ul>
              <li>Phone: (281) 494-4990</li>
              <li>Email: info@tgiagency.com</li>
              <li>Address: 132 Eldridge Rd, Suite C, Sugar Land, TX 77478</li>
            </ul>

            <h2>California Privacy Rights</h2>
            <p>
              California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to request information about the personal information we collect, use, and disclose, and the right to request deletion of personal information.
            </p>

            <h2>Texas Privacy Rights</h2>
            <p>
              Texas residents may have additional privacy rights under applicable Texas laws. We are committed to complying with all applicable state and federal privacy regulations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
