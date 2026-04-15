import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await axios.post("/users/login", {
        email,
        password,
      });
      setUser(data);
      toast.success("Login successful.");
      setRedirect(true);
    } catch (e) {
      toast.error("Login failed. Please check your credentials and try again.");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="-mt-32">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2">
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
