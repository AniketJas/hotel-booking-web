import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation logic
  function validate() {
    const newErrors = {};

    // Name validation
    if (!name) {
      newErrors.name = "Name is required";
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  }

  async function registerUser(e) {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    // mark all as touched on submit
    setTouched({
      name: true,
      email: true,
      password: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      await axios.post("/users/register", {
        name,
        email,
        password,
      });

      toast.success("Registration successful. Now you can log in");
      setRedirect(true);
    } catch (e) {
      toast.error("Registration failed. Please try again later");
    }
  }

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="-mt-32 w-full">
        <h1 className="text-4xl text-center mb-6">Register</h1>

        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          {/* Name */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, name: true }))
              }
              className={`w-full border px-3 py-2 rounded-md ${errors.name && touched.name
                ? "border-red-500"
                : "border-gray-300"
                }`}
            />
            {errors.name && touched.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-2">
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, email: true }))
              }
              className={`w-full border px-3 py-2 rounded-md ${errors.email && touched.email
                ? "border-red-500"
                : "border-gray-300"
                }`}
            />
            {errors.email && touched.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-2">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, password: true }))
              }
              className={`w-full border px-3 py-2 rounded-md ${errors.password && touched.password
                ? "border-red-500"
                : "border-gray-300"
                }`}
            />
            {errors.password && touched.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Submit */}
          <button className="primary w-full">Register</button>

          {/* Footer */}
          <div className="text-center py-3 text-sm">
            Already a member?{" "}
            <Link to={"/login"} className="underline text-black">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
