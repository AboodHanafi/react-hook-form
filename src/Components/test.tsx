import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IFormInputs {
  firstName: string;
  lastName: string;
  userName: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  userName: yup
    .string()
    .matches(/[a-z]/gi, "UserName must be charecter only")
    .uppercase()
    .required(),
  age: yup
    .number()
    .typeError("age Must be a number between 20 and 60")
    .max(60, "age Must be a number between 20 and 60 ")
    .min(20, "age Must be a number between 20 and 60")
    .required(),
  email: yup
    .string()
    .matches(
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      "email must be example@gmail.com"
    ),
  password: yup
    .string()
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      "passwoed must contains at least : Capital and small letter , number and special charechter @#$"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "password didnt match"),
});

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: IFormInputs) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="firstName" {...register("firstName")} />
      <p>{errors.firstName?.message}</p>

      <input placeholder="lastName" {...register("lastName")} />
      <p>{errors.lastName?.message}</p>

      <input placeholder="userName" {...register("userName")} />
      <p>{errors.userName?.message}</p>

      <input placeholder="Email" type={"email"} {...register("email")} />
      <p>{errors.email?.message}</p>

      <input placeholder="age" type="number" {...register("age")} />
      <p>{errors.age?.message}</p>

      <input placeholder="password" type="password" {...register("password")} />
      <p>{errors.password?.message}</p>

      <input
        placeholder="confirm password"
        type="password"
        {...register("confirmPassword")}
      />
      <p>{errors.confirmPassword?.message}</p>

      <input type="submit" value={"submit"} />
    </form>
  );
}
