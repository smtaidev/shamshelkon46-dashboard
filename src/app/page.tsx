"use client";

import { usePathname, useRouter } from "next/navigation";

import { useEffect } from "react";

const Login = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    console.log("pathname", pathname);
    console.log("router", router);
    if (pathname === "/") {
      //   router.push("/login");
      router.push("/dashboard");
    }
  }, [pathname, router]);
};

export default Login;
