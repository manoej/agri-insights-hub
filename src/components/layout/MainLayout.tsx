import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { BreadcrumbItem } from '@/types/agronomy';

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  breadcrumbs?: BreadcrumbItem[];
}

export function MainLayout({ children, title, breadcrumbs }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-64">
        <Header title={title} breadcrumbs={breadcrumbs} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
