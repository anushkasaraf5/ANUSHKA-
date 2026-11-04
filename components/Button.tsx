import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  target?: string;
  rel?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  href,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-highlight font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-coral text-white hover:bg-[#ff5542] active:bg-[#ff3d2b] dark:bg-white dark:text-stone-900 dark:hover:bg-stone-200 dark:active:bg-stone-300 shadow-xl shadow-coral/30",
    secondary: "bg-lavender/20 text-charcoal hover:bg-lavender/30 dark:bg-stone-800 dark:text-stone-100 dark:hover:bg-stone-700",
    outline: "border border-stone-300 text-charcoal hover:border-coral hover:bg-cream dark:border-stone-700 dark:text-stone-100 dark:hover:border-stone-100 dark:hover:bg-stone-900 hover:text-coral"
  };

  const sizes = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-6 py-3",
    lg: "text-lg px-8 py-4"
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} target={props.target} rel={props.rel}>
        {children}
      </a>
    );
  }

  return (
    <button 
      className={classes} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;