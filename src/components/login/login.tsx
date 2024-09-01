"use client";
import { validateLoginForm } from "@/helpers/validateLogin";
import { ILoginError, ILoginProps } from "@/components/login/TypesLogin";
import { useEffect, useState } from "react";
import { login } from "@/helpers/auth.helper";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const Login = () => {
  const { setUserData } = useAuth();
  const router = useRouter();
  const initialState: ILoginProps = {
    email: "",
    password: "",
  };
  const [dataUser, setDataUser] = useState<ILoginProps>(initialState);
  const [errors, setErrors] = useState<ILoginError>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataUser({
      ...dataUser,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateLoginForm(dataUser);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await login(dataUser);
      const { token, user } = response;
      const userData = {
        id: user.id,
        name: user.name,
        address: user.address,
        phone: user.phone,
        email: user.email,
        orders: user.orders,
      };
      setUserData({ token, userData });
      alert("You have logged in successfully");
      router.push("/");
    } catch (error) {
      alert("An error occurred during login. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const validationErrors = validateLoginForm(dataUser);
    setErrors(validationErrors);
  }, [dataUser]);

  
  const isFormValid =
    Object.keys(errors).length === 0 && dataUser.email && dataUser.password;
  return (
    <div >
      <div className="flex flex-col text-center  bg-indigo-200 border-2 border-black rounded-lg p-4">
        <p className="text-lg text-gray-700 mb-4">Sign in to</p>
        <h1 className="font-bold text-gray-900 text-3xl">ELECTRO OUTLET</h1>
      </div>
      <div className = "flex flex-col bg-gray-700 rounded-xl p-2">
        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label
            htmlFor="email-address"
            className="text-sm text-white font-medium mx-auto"
            >
            Email:
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            value={dataUser.email}
            onChange={handleChange}
            placeholder="martin@correo.com"
            className="border rounded-lg p-2 mt-1 outline-none focus:border-blue-500"
            />
         {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm text-white font-medium mx-auto">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={dataUser.password}
            onChange={handleChange}
            placeholder="**********"
            className="border rounded-lg p-2 mt-1 outline-none focus:border-blue-500"
            />
             {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className="bg-gray-700 rounded-xl text-white py-2 px-4  hover:bg-blue-600 disabled:bg-gray-300 m-5"
            >
            Login
          </button>

          <p>
            <Link
              href="/register"
              className="bg-gray-700 rounded-xl text-white py-2 px-4  hover:bg-blue-600 disabled:bg-gray-300 m-5"
              >
              Register
            </Link>
          </p>
        </div>
       </form>
      </div>
    </div>
  );
};
export default Login;
