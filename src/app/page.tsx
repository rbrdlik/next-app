"use client";
import { useSession } from "@/context/SessionContext";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function HomePage() {
  const sessionContext = useSession();

  if (!sessionContext) return <div>Loading...</div>;

  const { session, signout } = sessionContext;

  return (
    <div>
      {!session ? (
        <>
        <Link href="/signIn">SignIn</Link>
        </>
      ) : (
        <>
          <h2>Welcome, {session?.user.name}</h2>
          <p>Email: {session?.user.email}</p>
          <img src={session?.user.image || undefined} alt="Profile Picture" style={{borderRadius: "50%"}}/>
          <button onClick={signout}>SignOut</button>
        </>
      )}
    </div>
  );
}
