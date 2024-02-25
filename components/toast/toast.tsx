import { ReactNode, useEffect } from 'react';

interface ToastProps {
  duration?: number;
  className?: string;
  children: ReactNode;
}

const Toast: React.FC<ToastProps> = ({ duration = 5000, className = '', children }) => {
  useEffect(() => {
    const toastElement = document.querySelector('.toast');
    if (toastElement) {
      toastElement.classList.remove('hidden');
    }

    const timeoutId = setTimeout(() => {
      if (toastElement) {
        toastElement.classList.add('hidden');
      }
    }, duration);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className='toast'>
      <div className={`alert ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default Toast;
