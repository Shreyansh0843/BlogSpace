import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setCredentials, setError } from '../features/auth/authSlice';
import api from '../services/api';
import Footer from "../components/Footer"

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .required('Username is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required')
    }),
    onSubmit: async (values) => {
      try {
        const res = await api.post('http://localhost:5000/api/auth/register', {
          username: values.username,
          email: values.email,
          password: values.password
        }, {
          withCredentials: true
        });
        dispatch(setCredentials(res.data));
        toast.success('Registration successful!');
        navigate('/');
      } catch (err) {
        const message = err.response?.data?.message || 'Registration failed';
        dispatch(setError(message));
        toast.error(message);
      }
    },
  });

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        {/* Background gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"
          style={{
            backgroundImage: "url('/api/placeholder/400/400')",
            backgroundBlendMode: 'overlay',
            opacity: 0.95
          }}
        />
        
        {/* Card container */}
        <div className="relative z-10 w-full max-w-md mx-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-8">
            {/* Logo and Header */}
            <div className="text-center">
              
              <h1 className="text-3xl font-bold text-gray-900">BlogSpace✒️</h1>
              <p className="mt-1 text-sm text-gray-600">Your space for creative writing</p>
            </div>

            {/* Registration Form */}
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-center text-gray-900">
                Create your account
              </h2>
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <a
                  href="/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign in
                </a>
              </p>
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                {...formik.getFieldProps('username')}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  formik.touched.username && formik.errors.username
                    ? 'border-red-300'
                    : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                placeholder="Username"
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-500 text-xs mt-1">{formik.errors.username}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                {...formik.getFieldProps('email')}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  formik.touched.email && formik.errors.email
                    ? 'border-red-300'
                    : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                placeholder="Email address"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                {...formik.getFieldProps('password')}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  formik.touched.password && formik.errors.password
                    ? 'border-red-300'
                    : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                placeholder="Password"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                {...formik.getFieldProps('confirmPassword')}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  formik.touched.confirmPassword && formik.errors.confirmPassword
                    ? 'border-red-300'
                    : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                placeholder="Confirm Password"
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {formik.isSubmitting ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
    
    </div>
        </div>
      </div>
    
  );
};

export default Register;