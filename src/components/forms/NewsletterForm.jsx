import { useForm } from "react-hook-form";
import { Stack, UnstyledButton, Text } from "@mantine/core";
import Image from "next/image";

import styles from "./NewsletterForm.module.css";

import arrow from "../../assets/arrow-tr-green.svg";

export const NewsletterForm = () => {
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
      <Stack mt="1rem">
        <div className={styles["input-container"]}>
          <UnstyledButton type="submit">
            <Image alt="arrow" src={arrow} className={styles.arrow} />
          </UnstyledButton>
          <input
            className={styles.input}
            placeholder="Your email"
            {...register("email", { required: true })}
          />
        </div>

        {/* errors will return when field validation fails  */}
        {errors.email && (
          <Text size="xs" c={"red"}>
            An Email address is required
          </Text>
        )}
      </Stack>
    </form>
  );
};
