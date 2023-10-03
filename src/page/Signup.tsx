/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import LoginImg from "../assets/login.jpg";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useSignUpMutation } from "../redux/features/auth/authApi";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

interface SignupFormInputs {
  name: string;
  email: string;
  password: string;
}

export default function Signup() {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SignupFormInputs>();

  const [signUp, { isLoading, isError: resError, isSuccess }] =
    useSignUpMutation();

  const onSubmit = (data: SignupFormInputs) => {
    signUp(data);
  };

  useEffect(() => {
    if (resError) {
      toast.error(resError?.data?.message, { id: "login" });
    }
  }, [resError]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account successfully created", { id: "login" });
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block flex-1">
        <img className="object-cover min-h-screen" src={LoginImg} alt="" />
      </div>
      <div className="flex-1 flex items-center justify-center h-screen px-5">
        <div className="max-w-sm mx-auto">
          <h2 className="text-center text-3xl font-bold text-slate-700 mb-10">
            Welcome To Book Catalog
          </h2>

          <h2 className="text-center text-2xl font-bold text-slate-700">
            SignUp
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 mt-6">
              <div>
                <label className="block text-base font-medium text-slate-700">
                  Name
                </label>
                <input
                  placeholder="Type your name"
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.name
                      ? "input-error focus:input-error"
                      : "focus:input-primary"
                  }`}
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>
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
              <button
                disabled={isLoading}
                className={`btn btn-primary w-full text-white text-lg ${
                  isLoading ? "opacity-60 cursor-not-allowed" : ""
                }`}
                type="submit"
              >
                {isLoading ? "Signing Up..." : "Signup"}
              </button>
              <Link
                to="/login"
                className="mt-4 text-sm text-slate-700 hover:underline block"
              >
                Login here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
