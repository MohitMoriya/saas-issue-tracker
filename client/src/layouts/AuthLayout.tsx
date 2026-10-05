
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';

const AuthLayout = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="absolute top-8 text-center w-full">
        <h1 className="text-3xl font-extrabold text-blue-600 tracking-tight">SaaS Tracker</h1>
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
