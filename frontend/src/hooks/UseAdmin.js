import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

export function useIsAdmin() {
  const { user } = useAuthContext();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user) {
      setRole(user.role === "admin" && user);
    }else{
      setRole(null);

    }
  }, [user]);


  return role;
}
