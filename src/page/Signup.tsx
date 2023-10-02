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
        <div className="">
          <h2 className="text-center text-xl md:text-3xl font-bold text-slate-700 font-mono mb-16 md:mb-24 ">
            Welcome To Book Catalog
          </h2>

          <h2 className="text-center text-xl font-bold text-slate-700">
            SignUp
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="max-w-sm mx-auto mt-10 pb-20">
              <div>
                <h3 className="poppins text-base font-medium mb-2 ">Name</h3>
                <input
                  placeholder="Type your name"
                  type="text"
                  className={`border w-full outline-none  py-2 px-3 ${
                    errors.name
                      ? " border-red-500 focus:border-red-500"
                      : "focus:border-slate-700 border-slate-300"
                  }`}
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  })}
                />
                {errors.name && (
                  <span className="label-text-alt text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div>
                <h3 className="poppins text-base font-medium mb-2 mt-5  ">
                  Email
                </h3>
                <input
                  placeholder="Type your email"
                  type="email"
                  className={`border w-full outline-none  py-2 px-3 ${
                    errors.email
                      ? " border-red-500 focus:border-red-500"
                      : "focus:border-slate-700 border-slate-300"
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
                  <span className="label-text-alt text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div>
                <h3 className="poppins text-base font-medium mb-2 mt-5 ">
                  Password
                </h3>
                <div className="relative">
                  <input
                    placeholder="Type your password"
                    type="password"
                    className={`border w-full outline-none py-2 px-3 ${
                      errors.password
                        ? " border-red-500 focus:border-red-500"
                        : "focus:border-slate-700 border-slate-300"
                    }`}
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                      minLength: {
                        value: 6,
                        message: "Must be 6 characters or longer",
                      },
                    })}
                  />
                </div>
                {errors.password && (
                  <span className="label-text-alt text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <input
                disabled={isLoading}
                className="bg-violet-600 text-white mt-5 w-full py-2 text-lg poppins font-semibold cursor-pointer uppercase"
                type="submit"
                value="Signup"
              />
              <Link
                to="/login"
                className="mt-7 block poppins cursor-pointer hover:underline"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
