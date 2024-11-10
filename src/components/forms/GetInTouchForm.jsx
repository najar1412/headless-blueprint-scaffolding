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
        <input
          className={styles.input}
          placeholder="name"
          {...register("name")}
        />

        {/* include validation with required or other standard HTML validation rules */}
        <input
          className={styles.input}
          placeholder="company"
          {...register("company")}
        />
        <input
          className={styles.input}
          placeholder="email"
          {...register("email")}
        />

        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <Button
          ml="auto"
          px="xl"
          color={"brand.2"}
          c={"brand.0"}
          maw={"fit-content"}
          radius={"2rem"}
          type="submit"
        >
          Contact
        </Button>
      </Stack>
    </form>
  );
};
