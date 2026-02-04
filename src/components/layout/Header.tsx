import { Bell, Search, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BreadcrumbItem } from '@/types/agronomy';

interface HeaderProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
}

export function Header({ title, breadcrumbs }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      <div className="flex flex-col">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-0.5">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.id} className="flex items-center gap-1">
                {index > 0 && <ChevronRight className="h-3 w-3" />}
                <span className="hover:text-foreground cursor-pointer transition-colors">
                  {crumb.name}
                </span>
              </span>
            ))}
          </nav>
        )}
        <h1 className="font-display text-xl font-semibold text-foreground">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search..." 
            className="pl-9 bg-muted/50 border-transparent focus:border-primary"
          />
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
            3
          </span>
        </Button>
      </div>
    </header>
  );
}
