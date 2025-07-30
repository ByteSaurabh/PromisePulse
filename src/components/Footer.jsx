import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200 mt-10 border-t dark:border-gray-700 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h4 className="font-bold text-lg mb-2">🌟 PromisePulse</h4>
          <p>Your commitment, our community. Track and fulfill your promises together.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Explore</h4>
          <ul className="space-y-1">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/create" className="hover:underline">Create</a></li>
            <li><a href="/list" className="hover:underline">Promises</a></li>
            <li><a href="/account" className="hover:underline">Account</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Connect</h4>
          <ul className="space-y-1">
            <li>Email: support@promisepulse.com</li>
            <li>Phone: +91 8303820532</li>
            <li>Instagram | Twitter | GitHub</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Resources</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-sm opacity-80">
        © {new Date().getFullYear()} PromisePulse. All rights reserved. Saurabh Sharma.

      </div>
    </footer>
  );
};

export default Footer;
