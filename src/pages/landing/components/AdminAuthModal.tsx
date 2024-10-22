import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import toast from "react-hot-toast";
import LoadingButton from "@mui/lab/LoadingButton";
import { submitUser } from "../../../api/submitUser";
import { userData } from "../../../types";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const loginSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  email: yup.string().email().required("email is required"),
  password: yup.string().required("password is required"),
});

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: userData) => {
    setIsLoading(true);

    try {
      const isLoginSuccessful = await submitUser(data, "login");
      if (isLoginSuccessful) {
        toast.error("Login successful", {
          position: "bottom-center",
        });
        navigate("/admin");
      }
    } catch (e) {
      toast.error("با خطا مواجه شدید", {
        position: "bottom-center",
      });
      console.error("Error during authentication:", e);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <button
            onClick={onClose}
            className="text-3xl text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
          <h2 className="mb-4 text-center text-2xl font-semibold">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                {...register("username")}
                className="w-full rounded border border-gray-300 p-2"
              />
              <p className="text-sm text-red-500">
                {errors.username && errors.username.message}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="text"
                {...register("email")}
                className="w-full rounded border border-gray-300 p-2"
              />
              <p className="text-sm text-red-500">
                {errors.email && errors?.email.message}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                {...register("password")}
                className="w-full rounded border border-gray-300 p-2"
              />
              <p className="text-sm text-red-500">
                {errors.password && errors.password.message}
              </p>
            </div>
            <LoadingButton
              type="submit"
              endIcon={<SendIcon />}
              loading={isLoading}
              loadingPosition="end"
              variant="contained"
              sx={{
                backgroundColor: "#2563eb",
                color: "white",
                width: "90%",
                height: "48px",
                fontSize: "22px",
                "&:hover": {
                  backgroundColor: "#1d4ed8",
                },
                marginLeft: "5%",
              }}
            >
              Login
            </LoadingButton>
          </form>
        </div>
      </div>
    )
  );
}
