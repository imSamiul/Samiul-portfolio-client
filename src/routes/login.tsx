import { createFileRoute } from "@tanstack/react-router";
import { useLoginUser } from "../services/mutations/userMutation";
import { useState } from "react";
import { LoginFormType } from "../types/userType";

export const Route = createFileRoute("/login")({
  component: Login,
});

const initialValues: LoginFormType = {
  email: "",
  password: "",
};

function Login() {
  const [formValues, setFormValues] = useState<LoginFormType>(initialValues);
  const [formError, setFormError] = useState("");
  const { mutate, isPending } = useLoginUser();

  function loginHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formValues.email === "" || formValues.password === "") {
      setFormError("Email and Password are required");
      return;
    }
    if (formValues.email !== "samiulkarimprodhan@gmail.com") {
      setFormError("Email is not valid");
      return;
    }

    mutate(formValues);
    // setFormValues(initialValues);
  }

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setFormError("");
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content w-1/2">
        <div className="card bg-base-100 w-full min-w-64  shadow-2xl">
          <form className="card-body" onSubmit={loginHandler}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                value={formValues.email}
                onChange={onChangeHandler}
                name="email"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                value={formValues.password}
                onChange={onChangeHandler}
                name="password"
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" disabled={isPending}>
                {isPending ? "Loading..." : "Login"}
              </button>
            </div>
            {formError && <p className="text-red-500 mt-2">{formError}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
