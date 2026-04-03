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
