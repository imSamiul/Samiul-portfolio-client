"use client";

import { useForm } from "react-hook-form";

import { siteConfig } from "../../../config/site";
import { useLoginUser } from "../../../services/mutations/userMutation";
import { LoginFormType } from "../../../types/userType";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    defaultValues: { email: "", password: "" },
  });
  const { mutate, isPending, isError, error } = useLoginUser();

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content w-1/2">
        <div className="card bg-base-100 w-full min-w-64  shadow-2xl">
          <form
            className="card-body"
            onSubmit={handleSubmit((values) => mutate(values))}
          >
            <h1 className="text-2xl font-bold text-center mb-2">Login</h1>
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", {
                  required: "Email is required",
                  validate: (value) =>
                    value === siteConfig.email || "Email is not valid",
                })}
              />
              {errors.email && (
                <p className="text-error mt-2">{errors.email.message}</p>
              )}
            </div>
            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-error mt-2">{errors.password.message}</p>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" disabled={isPending}>
                {isPending ? "Loading..." : "Login"}
              </button>
            </div>
            {isError && (
              <p className="text-error mt-2" role="alert">
                {error.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
