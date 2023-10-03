/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import LoginImg from "../assets/login.jpg";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { toast } from "react-hot-toast";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<LoginFormInputs>();

  const navigate = useNavigate();

  const [login, { isLoading, error: resError, isSuccess }] = useLoginMutation();

  useEffect(() => {
    if (resError) {
      toast.error(resError?.data?.message, { id: "login" });
    }
  }, [resError]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const onSubmit = (data: LoginFormInputs) => {
    login(data);
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block flex-1">
        <img className="object-cover min-h-screen" src={LoginImg} alt="" />
      </div>
      <div className="flex-1 flex items-center justify-center h-screen px-5">
        <div className="max-w-sm mx-auto">
          <h2 className="text-center text-2xl font-bold text-slate-700">
            Please Login Here
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 mt-6">
              <div>
                <label className="block text-base font-medium text-slate-700">
                  Email
                </label>
                <input
                  placeholder="Type your email"
                  type="email"
                  className={`input input-bordered w-full ${
                    errors.email
                      ? "input-error focus:input-error"
                      : "focus:input-primary"
                  }`}
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Provide a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block text-base font-medium text-slate-700">
                  Password
                </label>
                <input
                  placeholder="Type your password"
                  type="password"
                  className={`input input-bordered w-full ${
                    errors.password
                      ? "input-error focus:input-error"
                      : "focus:input-primary"
                  }`}
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    minLength: {
                      value: 5,
                      message: "Must be 5 characters or longer",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Link
                to="#"
                className="text-right text-sm text-sky-800 hover:underline block"
              >
                Forgot password ?
              </Link>
              <button
                disabled={isLoading}
                className={`btn btn-primary w-full text-white text-lg ${
                  isLoading ? "opacity-60 cursor-not-allowed" : ""
                }`}
                type="submit"
              >
                {isLoading ? "Logging In..." : "Login"}
              </button>
              <Link
                to="/signup"
                className="mt-4 text-sm text-slate-700 hover:underline block"
              >
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
