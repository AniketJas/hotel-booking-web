import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const { setUser } = useContext(UserContext);

  // Validation logic
  function validate() {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  }

  async function handleLoginSubmit(e) {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    // mark all fields as touched on submit
    setTouched({
      email: true,
      password: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const { data } = await axios.post("/users/login", {
        email,
        password,
      });
      setUser(data);
      toast.success("Login successful.");
      setRedirect(true);
    } catch (e) {
      toast.error("Login failed. Please check your credentials.");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="-mt-32 w-full">
        <h1 className="text-4xl text-center mb-6">Login</h1>

        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
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
          <button className="primary w-full">Login</button>

          {/* Footer */}
          <div className="text-center py-3 text-sm">
            Don&apos;t have an account yet?{" "}
            <Link to={"/register"} className="underline text-black">
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
