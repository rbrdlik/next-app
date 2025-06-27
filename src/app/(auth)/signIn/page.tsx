"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [info, setInfo] = useState<string | undefined>();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleButton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInfo(undefined);
    loginWithCredentials();
  };

  const loginWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/"
    })
  }

  const loginWithCredentials = async () => {
    const res = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
      callbackURL: "/"
    });

    if(res.error){
      setInfo(res.error.message)
    }
  }
  
  return (
    <>
      <form onSubmit={handleButton}>
        <input type="text" name="email" onChange={handleInput} placeholder="Email"/>
        <input type="password" name="password" onChange={handleInput} placeholder="Password"/>
        <p style={{color: "red"}}>{info}</p>
        <button type="submit">Sign In</button>
      </form>
      <button onClick={loginWithGoogle}>
        Login with Google
      </button>
    </>
  );
}
