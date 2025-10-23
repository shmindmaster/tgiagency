import Image from 'next/image';

interface Partner {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

const partners: Partner[] = [
  { src: '/assets/partners/logo-farmers.png', alt: 'Farmers Insurance Partner', width: 160, height: 60 },
  { src: '/assets/partners/logo-american-risk.png', alt: 'American Risk Underwriters Partner', width: 160, height: 60 },
  { src: '/assets/partners/logo-swyfft.png', alt: 'Swyfft Insurance Partner', width: 160, height: 60 },
];

export function PartnersSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-primary mb-10">Trusted Insurance Carriers</h2>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {partners.map((p, idx) => (
            <div key={p.src} className="grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100">
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width || 140}
                height={p.height || 60}
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
