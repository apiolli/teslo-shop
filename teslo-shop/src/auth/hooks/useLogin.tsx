import { useNavigate } from "react-router";
import { useAuthStore } from "../store/auth.store";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

export const useLogin = () => {
  const navigate = useNavigate();
  const [isPosting, setIsPosting] = useState(false);
  const { login } = useAuthStore();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsPosting(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const isValid = await login(email, password);

    if (isValid) {
      toast.success("Bienvenido");
      navigate("/");
      return;
    }

    toast.error("Error");

    setIsPosting(false);
  };
  return {
    isPosting,
    handleLogin,
  };
};
