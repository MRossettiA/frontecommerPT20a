import { ILoginProps } from "@/components/login/TypesLogin";
import { IRegisterProps } from "@/components/register/TypesRegister";
import IProduct from "@/interfaces/Product";

const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

export async function register(userData: IRegisterProps) {
  try {
    const res = await fetch(`${APIURL}/users/register`, {
        method:"POST",
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify(userData)
         });
         if (!res.ok) {
          const errorData = await res.json(); // Obtener los detalles del error
          throw new Error(`Error ${res.status}: ${errorData.message || "Failed to register"}`);
        }
       return await res.json();
      } catch (error: any) {
        console.error("Registration error:", error.message);
        throw new Error(error.message || `Unknown error occurred during registration.`);
      }
    }
export async function login(userData:ILoginProps) {
  try {
    const res = await fetch(`${APIURL}/users/login`,{
      method:"POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(userData)
       });
       if(res.ok){
          return res.json()
       } else {
          throw Error("faild to login")
       }
 
} catch (error: any) {
  throw new Error(error)  }
}