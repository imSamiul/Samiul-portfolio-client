function Toast({
  message,
  variant = "success",
}: {
  message: string;
  variant?: "success" | "error";
}) {
  return (
    <div className="toast toast-top toast-center">
      <div className={variant === "error" ? "alert alert-error" : "alert alert-success"}>
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Toast;
