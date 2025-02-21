import React from "react";
import { motion } from "framer-motion";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative py-4 px-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-b-lg shadow-lg"
    >
      <Container>
        <nav className="flex items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mr-4"
          >
            <Link to="/">
              <Logo width="60px" />
            </Link>
          </motion.div>

          {/* Nav Items */}
          <ul className="flex ml-auto text-white font-medium text-lg space-x-6">
            {navItems.map((item) =>
              item.active ? (
                <motion.li key={item.name} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="relative inline-block px-6 py-2 transition-all duration-300 bg-transparent text-white border cursor-pointer border-white/30 rounded-lg overflow-hidden group"
                  >
                    {item.name}
                    <span className="absolute inset-0 w-full h-full border-2 border-transparent rounded-lg group-hover:border-white/50"></span>
                    <span className="absolute top-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                    <span className="absolute bottom-0 right-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                    <span className="absolute top-0 left-0 h-0 w-[2px] bg-white transition-all duration-300 group-hover:h-full"></span>
                    <span className="absolute bottom-0 right-0 h-0 w-[2px] bg-white transition-all duration-300 group-hover:h-full"></span>
                  </button>
                </motion.li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </motion.header>
  );
}

export default Header;
