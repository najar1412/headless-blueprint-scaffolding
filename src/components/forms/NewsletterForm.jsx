import { useState } from "react";

import { useForm } from "react-hook-form";
import { Stack, UnstyledButton, Text } from "@mantine/core";
import Image from "next/image";

import styles from "./NewsletterForm.module.css";

import arrow from "../../assets/arrow-tr-blue.svg";

export const NewsletterForm = ({ form }) => {
  console.log("newsletter");
  console.log(form);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSubmitted(true);
    console.log(data);
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */

    submitted ? (
      <Stack w={"100%"}>
        <Text
          fw={"bold"}
          size="xs"
          c="brand.0"
          mt="2rem"
          ta={{ base: "center", xs: "left" }}
        >
          Thank you!
        </Text>
      </Stack>
    ) : (
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
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
    )
  );
};
