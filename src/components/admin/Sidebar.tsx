import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingBag, Settings, LogOut, Tags, MessageSquare } from 'lucide-react';
...
          { icon: Package, label: 'Products', href: '/admin/products' },
          { icon: Tags, label: 'Categories', href: '/admin/categories' },
          { icon: ShoppingBag, label: 'Orders', href: '/admin/orders' },
          { icon: MessageSquare, label: 'Chat', href: '/admin/chat' },
          { icon: Settings, label: 'Settings', href: '/admin/settings' },

        ].map((item) => (
          <Link 
            key={item.label} 
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-900 hover:text-yellow-500 transition-colors"
          >
            <item.icon size={20} />
            <span className="font-light tracking-wide">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto">
        <button className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 transition-colors">
          <LogOut size={20} />
          <span className="font-light">Logout</span>
        </button>
      </div>
    </aside>
  );
}
