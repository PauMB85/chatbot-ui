import Toast from "./toast";

interface ToastErrorProps {
  children: React.ReactNode;
}

const ToastError: React.FC<ToastErrorProps> = ({ children }) => {
  return (
    <Toast className="alert-error">
      {children}
    </Toast>
  );
};

export default ToastError;
