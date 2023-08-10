import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

export function useIsAdmin() {
  const { user } = useAuthContext();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user) {
      setRole(user.role === "Admin" && user);
    }
  }, [user]);

  useEffect(() => {
    if (!user || user === null) {
      setRole(null);
    }
  }, [user]);

  return role;
}
