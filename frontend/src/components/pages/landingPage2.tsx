import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spline from "@splinetool/react-spline";

export default function LandingPage2() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const exp = payload.exp * 1000;
        if (Date.now() < exp) {
          navigate("/problems");
          return;
        }
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    }
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/saKLL2c05PEJzu6j/scene.splinecode" />
      </div>

      <div className="relative z-10 text-white">
        <header className="container mx-auto px-4 py-8 flex justify-between items-center">
          <motion.h1
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            ChainCode
          </motion.h1>
          <nav>
            <motion.ul
              className="flex space-x-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <li>
                <Link
                  to="/login"
                  className="hover:text-blue-400 transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="hover:text-blue-400 transition-colors"
                >
                  Sign Up
                </Link>
              </li>
            </motion.ul>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-16">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-5xl font-bold mb-6">
              Master Coding, Own Your Solutions
            </h2>
            <p className="text-xl mb-8">
              Solve coding challenges and claim ownership of your unique
              solutions on the blockchain.
            </p>
            <motion.div
              className="flex justify-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button onClick={handleGetStarted}>Get Started</Button>
              <Button
                variant="outline"
                className="text-black hover:text-blue-300"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="bg-opacity-30 backdrop-blur-sm bg-white p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Practice</h3>
              <p>
                Sharpen your coding skills with our vast collection of
                challenges.
              </p>
            </div>
            <div className="bg-opacity-30 backdrop-blur-sm bg-white p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Innovate</h3>
              <p>Create unique solutions and stand out from the crowd.</p>
            </div>
            <div className="bg-opacity-30 backdrop-blur-sm bg-white p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Own</h3>
              <p>Claim ownership of your solutions on the blockchain.</p>
            </div>
          </motion.div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <form
              className="flex justify-center space-x-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="max-w-xs bg-opacity-50 bg-white text-black placeholder-gray-500"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </motion.div>
        </main>

        <footer className="container mx-auto px-4 py-8 mt-16 border-t border-white border-opacity-20">
          <div className="flex justify-between items-center">
            <p>&copy; 2023 ChainCode. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
