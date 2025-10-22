"use client";
import { usePathname } from 'next/navigation';
import { useEffect, useId } from 'react';

export function BreadcrumbsSchema() {
  const pathname = usePathname();
  const id = useId();
  useEffect(() => {
    if (!pathname) return;
    const segments = pathname.split('/').filter(Boolean);
    const itemListElement = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: '/',
      },
      ...segments.map((seg, idx) => ({
        '@type': 'ListItem',
        position: idx + 2,
        name: formatSegment(seg),
        item: '/' + segments.slice(0, idx + 1).join('/')
      }))
    ];
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement
    };
    const scriptId = `breadcrumbs-jsonld-${id}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = scriptId;
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
  }, [pathname, id]);
  return null;
}

function formatSegment(seg: string) {
  return seg.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
