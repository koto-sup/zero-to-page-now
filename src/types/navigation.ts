
export interface NavigationLink {
  name: string;
  href: string;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  theme: string;
}

export interface UserMenuProps {
  className?: string;
}

export interface NavigationLinksProps {
  className?: string;
}
