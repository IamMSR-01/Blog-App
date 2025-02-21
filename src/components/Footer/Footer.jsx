import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative overflow-hidden py-10 bg-gray-800/50 backdrop-blur-md border-t border-white/10 shadow-xl"
    >
      {/* 🔥 Floating Neon Glow */}
      <motion.div
        className="absolute -top-10 left-10 w-24 h-24 bg-blue-500 blur-[100px] opacity-30"
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute -top-10 right-10 w-24 h-24 bg-purple-500 blur-[100px] opacity-30"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="70px" />
              </div>
              <div>
                <p className="text-sm text-gray-300">
                  &copy; {new Date().getFullYear()}. All Rights Reserved by{" "}
                  <span className="text-blue-400 font-bold">MSR</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {[
            { title: "Company", links: ["Features", "Pricing", "Affiliate Program", "Press Kit"] },
            { title: "Support", links: ["Account", "Help", "Contact Us", "Customer Support"] },
            { title: "Legals", links: ["Terms & Conditions", "Privacy Policy", "Licensing"] },
          ].map((section, index) => (
            <div key={index} className="w-full p-6 md:w-1/2 lg:w-2/12">
              <div className="h-full">
                <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-white">
                  {section.title}
                </h3>
                <ul>
                  {section.links.map((link, idx) => (
                    <li key={idx} className="mb-4">
                      <Link
                        className="text-base font-medium text-gray-300 hover:text-blue-400 transition-all duration-300"
                        to="/"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default Footer;
