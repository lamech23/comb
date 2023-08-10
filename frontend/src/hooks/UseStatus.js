import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

export function useIsStatus() {
  const { user } = useAuthContext();
  const [active, setActive] = useState(null);

  const status = JSON.parse(localStorage.getItem("credentials"));
  const Active = status;

  useEffect(() => {
    if (user) {
      setActive(user === "Active" && user);
    }
  }, [user]);

  useEffect(() => {
    if (user === "inActive") {
      setActive(null);
    }
  }, [user]);

  return Active;
}
