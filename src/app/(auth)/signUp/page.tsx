"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [info, setInfo] = useState<string | undefined>();
  const router = useRouter();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleButton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInfo(undefined);

    if(!formData.name || formData.name === "") return setInfo("Missing field name!")
    registerWithCredentials();
  };

  const loginWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/"
    })
  }

  const registerWithCredentials = async () => {
    const res = await authClient.signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      image: ""
    });

    if(res.error){
      return setInfo(res.error.message)
    }

    router.push("/")
  }
  
  return (
    <>
      <form onSubmit={handleButton}>
        <input type="text" name="name" onChange={handleInput} placeholder="Name"/>
        <input type="text" name="email" onChange={handleInput} placeholder="Email"/>
        <input type="password" name="password" onChange={handleInput} placeholder="Password"/>
        <p style={{color: "red"}}>{info}</p>
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={loginWithGoogle}>
        Login with Google
      </button>
    </>
  );
}