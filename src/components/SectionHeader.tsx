import Link from 'next/link';

interface SectionHeaderProps {
  title: string;
  linkHref?: string;
  linkLabel?: string;
}

export default function SectionHeader({ title, linkHref, linkLabel = '»' }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 mb-4 py-3 section-divider">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
        {title}
      </h2>
      {linkHref && (
        <Link
          href={linkHref}
          className="text-primary hover:underline font-bold text-xl"
        >
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
