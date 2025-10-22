import { BlogCategory } from '@/lib/content/types';

const categories: { key?: BlogCategory; label: string }[] = [
  { label: 'All' },
  { key: 'personal-insurance', label: 'Personal Insurance' },
  { key: 'business-insurance', label: 'Business Insurance' },
  { key: 'cost-savings', label: 'Cost Savings' },
];

interface Props {
  activeCategory?: BlogCategory;
  onCategoryChange: (category?: BlogCategory) => void;
}

export function CategoryFilter({ activeCategory, onCategoryChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map(c => {
        const active = c.key === activeCategory || (!c.key && !activeCategory);
        return (
          <button
            key={c.label}
            onClick={() => onCategoryChange(c.key)}
            className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${active ? 'bg-primary text-white border-primary' : 'bg-white hover:bg-accent/10 text-label border-border'}`}
            aria-current={active ? 'true' : undefined}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}
