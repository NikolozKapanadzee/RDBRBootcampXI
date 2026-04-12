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
  disabled?: boolean;
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

export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
  fullName: string;
  mobileNumber: string;
  age: number;
  profileComplete: boolean;
}

export interface AuthStore {
  user: User | null;
  token: string | null;
  setUser: (user: any) => void;
  setToken: (token: string) => void;
}

export interface InProgressCarsProps {
  thumbnail: string;
  lecturer: string;
  rating: number;
  title: string;
  percentage: number;
}

export interface CardProps {
  image: string;
  instructor: string;
  duration: number;
  rating: number;
  title: string;
  category: string;
  categoryIcon: string;
  price: number;
}

export interface UpperCatalogProps {
  total: number;
  perPage: number;
  currentPage: number;
}
