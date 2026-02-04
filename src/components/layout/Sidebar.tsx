import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Leaf, 
  TestTube, 
  Settings, 
  Users,
  MapPin,
  Database
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Leaf Analysis', href: '/leaf-analysis', icon: Leaf },
  { name: 'N-Tester Analysis', href: '/n-tester', icon: TestTube },
  { name: 'Land Segments', href: '/segments', icon: MapPin },
  { name: 'Land Owners', href: '/owners', icon: Users },
  { name: 'Master Data', href: '/master-data', icon: Database },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
            <Leaf className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold text-sidebar-foreground">EIHL</h1>
            <p className="text-xs text-sidebar-foreground/60">Agronomy Portal</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'nav-item',
                  isActive && 'nav-item-active'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent text-sm font-medium text-sidebar-foreground">
              PS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Dr. Priya Sharma</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">Agronomist</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
