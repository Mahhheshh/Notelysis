import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

export function useIsLogged(redirect: string | null = null) {
  const [isLogged, setIsLogged] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
      return setIsLogged(true);
    }
    if (redirect) {
      navigate(redirect);
      return;
    }

    navigate("/signin")

  }, [navigate, redirect]);

  return {isLogged};
}
