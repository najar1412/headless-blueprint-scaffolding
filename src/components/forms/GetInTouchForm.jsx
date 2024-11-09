import { useForm } from "react-hook-form";
import { Button, Stack } from "@mantine/core";

import styles from "./GetInTouchForm.module.css";

export const GetInTouchForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        {/* register your input into the hook by invoking the "register" function */}
        <input placeholder="name" {...register("name")} />

        {/* include validation with required or other standard HTML validation rules */}
        <input placeholder="company" {...register("company")} />
        <input placeholder="email" {...register("email")} />

        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <Button type="submit">submit</Button>
      </Stack>
    </form>
  );
};
