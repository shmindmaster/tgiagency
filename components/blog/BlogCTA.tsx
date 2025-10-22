import Link from 'next/link';

export function BlogCTA() {
  return (
    <section className="mt-16 mb-20 max-w-3xl mx-auto px-4">
      <div className="rounded-lg bg-primary text-white p-10 text-center shadow-md">
        <h3 className="text-2xl font-semibold mb-3">Ready to protect what matters most?</h3>
        <p className="mb-6 text-white/90">Get a fast, professional quote or speak with a Texas insurance specialist today.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            data-quote-launch
            className="bg-secondary hover:bg-secondary/90 text-white font-medium px-6 py-3 rounded-md transition-colors"
          >
            Get a Free Quote
          </button>
          <Link href="/contact" className="border border-white/30 hover:bg-white hover:text-primary font-medium px-6 py-3 rounded-md transition-colors">
            Contact Us
          </Link>
        </div>
        <p className="mt-4 text-xs text-white/70">Or call <a href="tel:+12814944990" className="underline">(281) 494-4990</a></p>
      </div>
    </section>
  );
}
