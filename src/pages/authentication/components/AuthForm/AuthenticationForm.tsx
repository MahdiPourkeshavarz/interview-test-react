import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthSchemaType, formSchema } from "../../schema/authFormSchema";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

interface Props {
  isLoading: boolean;
  onSubmit: (data) => void;
  mode: string;
}

export const AuthenticationForm = ({ onSubmit, isLoading, mode }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchemaType>({
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`transition-transform duration-500 ${
        mode === "login" ? "scale-100" : "scale-95"
      }`}
    >
      <div className="space-y-4">
        {mode === "login" && (
          <div className="form-group transition-opacity duration-500 space-y-4">
            <input
              type="string"
              id="username"
              placeholder="Username"
              disabled={mode === "register"}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out disabled:opacity-50"
              {...register("username")}
            />
            <p className="text-red-500">{errors.username?.message}</p>

            <input
              type="email"
              id="email"
              placeholder="Email Address"
              disabled={mode === "register"}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out disabled:opacity-50"
              {...register("email")}
            />
            <p className="text-red-500">{errors.email?.message}</p>

            <input
              type="password"
              id="password"
              placeholder="Password"
              disabled={mode === "register"}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out disabled:opacity-50"
              {...register("password")}
            />
            <p className="text-red-500">{errors.password?.message}</p>
          </div>
        )}

        {mode === "register" && (
          <div className="form-group transition-opacity duration-500 space-y-4">
            <input
              type="string"
              id="username"
              placeholder="Username"
              disabled={mode === "login"}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out disabled:opacity-50"
              {...register("username")}
            />
            <p className="text-red-500">{errors.username?.message}</p>

            <input
              type="email"
              id="email"
              placeholder="Email Address"
              disabled={mode === "login"}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out disabled:opacity-50"
              {...register("email")}
            />
            <p className="text-red-500">{errors.email?.message}</p>

            <input
              type="password"
              id="createpassword"
              placeholder="Password"
              disabled={mode === "login"}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out disabled:opacity-50"
              {...register("createpassword")}
            />
            <p className="text-red-500">{errors.createpassword?.message}</p>

            <input
              type="password"
              id="repeatpassword"
              placeholder="Repeat Password"
              disabled={mode === "login"}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out disabled:opacity-50"
              {...register("repeatpassword")}
            />
            <p className="text-red-500">{errors.repeatpassword?.message}</p>
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-center">
        <LoadingButton
          type="submit"
          endIcon={<SendIcon />}
          loading={isLoading}
          loadingPosition="end"
          variant="contained"
          sx={{
            backgroundColor: "#2563eb",
            color: "white",
            width: "100%",
            height: "48px",
            fontSize: "22px",
            "&:hover": {
              backgroundColor: "#1d4ed8",
            },
          }}
        >
          Submit
        </LoadingButton>
      </div>
    </form>
  );
};
