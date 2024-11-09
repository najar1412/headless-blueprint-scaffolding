import { useForm } from "react-hook-form";
import { Button, Stack } from "@mantine/core";

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
      <Stack>
        <input placeholder="email" {...register("email", { required: true })} />

        {/* errors will return when field validation fails  */}
        {errors.email && <span>This field is required</span>}

        <Button type="submit">submit</Button>
      </Stack>
    </form>
  );
};
