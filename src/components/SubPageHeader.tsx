import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface SubPageHeaderProps {
  rightContent?: React.ReactNode;
}

export function SubPageHeader({ rightContent }: SubPageHeaderProps) {
  return (
    <header className="bg-primary text-white py-4 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity focus-visible:ring-2 focus-visible:ring-white/50 rounded"
        >
          <ArrowLeft size={20} />
          <span className="font-semibold">Back to Home</span>
        </Link>
        {rightContent}
      </div>
    </header>
  );
}
