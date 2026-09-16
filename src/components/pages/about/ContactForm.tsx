"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { sendContactMessage } from "../../../services/contactApis";
import { ContactFormValues } from "../../../types/contactType";

const EMPTY_MESSAGE: ContactFormValues = {
  name: "",
  email: "",
  message: "",
  website: "",
};

const MIN_MESSAGE_LENGTH = 20;

function ContactForm() {
  const [isSent, setIsSent] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ defaultValues: EMPTY_MESSAGE });

  async function handleSend(values: ContactFormValues) {
    setIsSent(false);
    setSendError(null);

    try {
      await sendContactMessage(values);
      reset(EMPTY_MESSAGE);
      setIsSent(true);
    } catch (error) {
      setSendError(
        error instanceof Error
          ? error.message
          : "Could not send your message right now.",
      );
    }
  }

  return (
    <form className="mt-5 grid gap-3 max-w-xl" onSubmit={handleSubmit(handleSend)}>
      <div className="form-control">
        <label className="label" htmlFor="contactName">
          <span className="label-text">Your name</span>
        </label>
        <input
          id="contactName"
          type="text"
          className="input input-bordered"
          placeholder="Who is writing?"
          {...register("name", {
            required: "Please tell me your name",
            minLength: { value: 2, message: "That name looks too short" },
          })}
        />
        {errors.name && <p className="text-error mt-1">{errors.name.message}</p>}
      </div>

      <div className="form-control">
        <label className="label" htmlFor="contactEmail">
          <span className="label-text">Your email</span>
        </label>
        <input
          id="contactEmail"
          type="email"
          className="input input-bordered"
          placeholder="So I can reply"
          {...register("email", {
            required: "Please leave an email so I can reply",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-error mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="form-control">
        <label className="label" htmlFor="contactMessage">
          <span className="label-text">Message</span>
        </label>
        <textarea
          id="contactMessage"
          className="textarea textarea-bordered h-32"
          placeholder="What would you like to talk about?"
          {...register("message", {
            required: "Please write a message",
            minLength: {
              value: MIN_MESSAGE_LENGTH,
              message: `Please write at least ${MIN_MESSAGE_LENGTH} characters`,
            },
          })}
        />
        {errors.message && (
          <p className="text-error mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Honeypot: hidden from people, irresistible to bots. */}
      <input
        type="text"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        {...register("website")}
      />

      <button
        type="submit"
        className="btn btn-primary mt-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </button>

      {isSent && (
        <p className="text-success" role="status">
          Thanks — your message is on its way. I will reply by email.
        </p>
      )}
      {sendError && (
        <p className="text-error" role="alert">
          {sendError}
        </p>
      )}
    </form>
  );
}

export default ContactForm;
