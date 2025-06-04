import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, Package, Users, BarChart3, Settings } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils'; // For conditional class names

interface SidebarProps {
  className?: string;
}

const navItems = [
  { href: "/dashboard", label: "Dashboard Overview", icon: Home },
  { href: "/orders", label: "Orders Management", icon: ShoppingCart },
  { href: "/products", label: "Products Analytics", icon: Package }, // Matched to ProductsAnalyticsPage
  { href: "/customers", label: "Customers List", icon: Users },
  { href: "/analytics", label: "Analytics Reports", icon: BarChart3 },
  // Add more navigation items as needed
];

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  console.log("Rendering Sidebar");
  const location = useLocation();

  return (
    <aside className={cn("fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-background sm:flex", className)}>
      <nav className="flex flex-col gap-2 p-4 sm:py-5">
        <Link
          to="/dashboard"
          className="group flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base mb-4"
          aria-label="Dashboard"
        >
          {/* Placeholder for App Logo/Icon */}
          <Package className="h-5 w-5 transition-all group-hover:scale-110" />
          <span className="sr-only">App Name</span>
        </Link>

        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              location.pathname.startsWith(item.href) && "bg-muted text-primary"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-2 p-4 sm:py-5">
         <Link
            to="/settings" // Example settings link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary w-full"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
      </nav>
    </aside>
  );
}
export default Sidebar;