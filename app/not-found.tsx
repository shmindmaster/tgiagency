import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/assets/general/misc-404-not-found.jpg"
          alt="404 Not Found"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/80" />
      </div>
      <div className="text-center px-4 relative z-10 text-white">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-lg mb-8 max-w-md mx-auto text-gray-100">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link href="/">
          <Button size="lg">Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
}
