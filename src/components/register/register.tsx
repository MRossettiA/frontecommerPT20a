"use client";
import { validateRegisterForm } from "@/helpers/validateRegister";
import { IRegisterError, IRegisterProps } from "@/components/register/TypesRegister";
import { useEffect, useState } from "react";
import { register } from "@/helpers/auth.helper";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter()
  const initialState = {
    name: "",
    email: "",
    password: "",
    address: "",
    phone: ""
  };
  
  const [dataUser, setDataUser] = useState<IRegisterProps>(initialState);
  const [errors, setErrors] = useState<IRegisterError>(initialState);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      dataUser.name.trim() !== '' &&
      dataUser.email.trim() !== '' &&
      dataUser.phone.trim() !== '' &&
      dataUser.address.trim() !== '' &&
      dataUser.password.trim() !== ''
    );
  }, [dataUser]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataUser({
      ...dataUser,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await register(dataUser)
    alert ("You have registered successfull")
    router.push("/login")
  };

  useEffect(() => {
    const errors = validateRegisterForm(dataUser);
    setErrors(errors);
  }, [dataUser]);

  return (
    <div>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 max-w-lg mx-auto  rounded-lg shadow-lg">
        <div className="flex flex-col">
          <label htmlFor="name" className="font-semibold text-white">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={dataUser.name}
            onChange={handleChange}
            placeholder="Ingresa tu nombre"
            className="border rounded-lg p-2 mt-1 outline-none focus:border-blue-500"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </div>

        <div className="flex flex-col ">
          <label htmlFor="email-address" className="font-semibold text-white">Email:</label>
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
          <label htmlFor="password" className="font-semibold text-white">Password:</label>
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

        <div className="flex flex-col">
          <label htmlFor="address" className="font-semibold text-white">Address:</label>
          <input
            name="address"
            type="text"
            value={dataUser.address}
            onChange={handleChange}
            placeholder="Ingresa tu dirección"
            className="border rounded-lg p-2 mt-1 outline-none focus:border-blue-500"
          />
          {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="font-semibold text-white">Phone:</label>
          <input
            name="phone"
            type="text"
            value={dataUser.phone}
            onChange={handleChange}
            placeholder="Ingresa tu número de teléfono"
            className="border rounded-lg p-2 mt-1 outline-none focus:border-blue-500 bg-gray-200"
          />
          {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
        </div>

        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
            type="submit"
            disabled={!isFormValid}
          >
            Register
          </button>
        </div>
      </form>


    </div>
  );
};

export default Register;
