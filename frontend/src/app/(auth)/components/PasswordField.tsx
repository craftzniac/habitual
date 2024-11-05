import TextField from "@/app/components/form/TextField";
import { LoginPageProps } from "@/app/types";

export default function PasswordField({ register, errorMsg }: LoginPageProps) {
  return (
    <TextField
      label="Password" register={register("password", {
        required: "Password must not be empty",
        validate: {
          hasNumber: (v) => {
            const hasNumber = /[0-9]/.test(v);
            if (hasNumber === false) { return "Password must contain atleast one number" }
            return true;
          },
          hasUppercase: (v, values) => {
            const hasUppercase = /[A-Z]/.test(v);
            if (hasUppercase === false) { return "Password must contain atleast one uppercase letter" }
            return true
          },
          length: (v) => {
            if (v.length < 8 || v.length > 20) {
              return "Password must be between 8 to 20 characters long"
            }
            return true;
          },
          excludesSpecialChars: (v) => {
            const pattern = /^[a-zA-Z0-9]*$/;
            if (pattern.test(v) === false) {
              return "Password must not contain any special characters";
            }
            return true;
          }
        }
      })}
      name="password"
      infoText={errorMsg}
    />
  )
}