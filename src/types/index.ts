export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "outline" | "primary";
}

export interface InputProps {
  label?: string;
  error?: string;
  icon?: React.ElementType;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ModalStore {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  isProfileOpen: boolean;
  openLogin: () => void;
  openRegister: () => void;
  openProfile: () => void;
  closeAll: () => void;
}
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export interface FeaturedCardsProps {
  title: string;
  description: string;
  image: string;
  basePrice: string;
  avgRating: number;
  instructor: {
    id: number;
    name: string;
    avatar: string;
  };
}

export interface FeaturedCourse {
  id: number;
  title: string;
  description: string;
  image: string;
  basePrice: string;
  avgRating: number;
  instructor: {
    id: number;
    name: string;
    avatar: string;
  };
}

export interface AuthStore {
  user: any | null;
  token: string | null;
  setUser: (user: any) => void;
  setToken: (token: string) => void;
}
