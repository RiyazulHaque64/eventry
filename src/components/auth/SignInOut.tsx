"use client";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";

const SignInOut = () => {
  const authContext = useAuth();
  const handleLogout = () => {
    authContext?.setAuth({
      bio: null,
      email: null,
      id: null,
      name: null,
      phone: null,
    });
  };
  return (
    <>
      {authContext?.auth?.email ? (
        <a className="cursor-pointer" onClick={handleLogout}>
          Logout
        </a>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </>
  );
};

export default SignInOut;
