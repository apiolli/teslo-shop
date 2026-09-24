import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuthStore } from "../store/auth.store";
import { useState, type FormEvent } from "react";

export const useRegister = () => {
  const { register } = useAuthStore();
  const [isPosting, setIsPosting] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPosting(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const fullName = formData.get("fullName") as string;
    const password = formData.get("password") as string;

    const isValid = await register(email, password, fullName);

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
    handleRegister,
  };
};
