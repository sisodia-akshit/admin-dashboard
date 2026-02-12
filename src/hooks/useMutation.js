import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBook,
  deleteBook,
  updateBook,
  updateMyBook,
} from "../services/booksApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { forgetPassword, resetPassword } from "../services/authApi";

export const useCreateBookMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      // 🔑 refresh books list
      queryClient.invalidateQueries({ queryKey: ["books"] });

      // (optional, if dashboard shows book stats later)
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      navigate("/inventory");
    },
  });
};
export const useUpdateBookMutation = ({ onClose }) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: user.role === "admin" ? updateBook : updateMyBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      onClose();
    },
  });
};

export const usedeleteMutation = ({ onClose }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      onClose();
    },
  });
};

export const useForgetPasswordMutation = ({ setOpen, setMessage }) => {
  return useMutation({
    mutationFn: forgetPassword,
    onSuccess: (data) => {
      setMessage(data.message);
      setOpen(true);
    },
  });
};
export const useResetPasswordMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      navigate("/login");
    },
  });
};
