import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const Logout = () => {
  const { logOut } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      logOut();
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return <Button variant="completeGhost" onClick={handleLogout}>
    <LogOut className="text-destructive"/>
    Log out
  </Button>;
};

export default Logout;
