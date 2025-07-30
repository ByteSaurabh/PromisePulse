import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from '../appwrite/Appwrite.js'; // ✅ shared Appwrite instance
import { AuthContext } from '../context/AuthContext';
import ReCAPTCHA from 'react-google-recaptcha';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import loginAnimation from '../assets/login-animation.json';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';

const ADMIN_EMAIL = 'saurabhaasharma@gmail.com';

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setIsAdmin } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    account.get().then(() => {
      setIsLoggedIn(true);
      navigate('/home');
    }).catch(() => {});
  }, [navigate, setIsLoggedIn]);

  useEffect(() => {
    if (!vantaEffect.current) {
      vantaEffect.current = NET({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x28a745,
        backgroundColor: 0xf0fff4
      });
    }
    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!captchaVerified) {
      setError('❌ Please complete the CAPTCHA');
      setLoading(false);
      return;
    }

    try {
      await account.createEmailSession(email, password);
      const user = await account.get();

      setIsLoggedIn(true);
      if (user.email === ADMIN_EMAIL) {
        setIsAdmin(true);
        navigate('/admin-dashboard');
      } else {
        setIsAdmin(false);
        navigate('/home');
      }
    } catch (err) {
      setError('❌ Invalid credentials or user not registered');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={vantaRef} className="min-h-screen flex items-center justify-center px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl rounded-3xl p-8 flex flex-col md:flex-row items-center w-full max-w-4xl"
      >
        {/* Lottie Animation Section */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0 flex justify-center">
          <Lottie animationData={loginAnimation} loop style={{ height: 300, width: 300 }} />
        </div>

        {/* Login Form Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-black mb-6 text-center">Welcome Back 👋</h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full p-3 rounded bg-white/80 text-black focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 rounded bg-white/80 text-black focus:outline-none"
              />
            </div>

            <div>
              <ReCAPTCHA
                sitekey="6LcpopArAAAAAOmvtmL8DKdxeB88k0aGMDHtI5wL"
                onChange={() => setCaptchaVerified(true)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-white rounded-xl font-semibold transition duration-300 ${
                loading ? 'bg-green-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>

          <p className="mt-5 text-sm text-black text-center">
            Don't have an account?{' '}
            <a href="/signup" className="text-black-200 hover:underline font-medium">
              Register
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
