import { useState } from "react";

import { useForm } from "react-hook-form";
import { Stack, UnstyledButton, Text } from "@mantine/core";
import Image from "next/image";
import { useMutation, gql } from "@apollo/client";

import useGravityForm, {
  GravityFormProvider,
} from "../../hooks/useGravityForms";
import GravityFormsField from "../GravityFormFields/GravityFormsField";

import styles from "./NewsletterForm.module.css";

import arrow from "../../assets/arrow-tr-blue.svg";

const SUBMIT_FORM = gql`
  mutation submitForm($formId: ID!, $fieldValues: [FormFieldValuesInput]!) {
    submitGfForm(input: { id: $formId, fieldValues: $fieldValues }) {
      errors {
        id
        message
      }
    }
  }
`;

export const NewsletterForm = ({ form }) => {
  const [submitForm, { data, loading, error }] = useMutation(SUBMIT_FORM);
  const haveEntryId = Boolean(data?.submitGravityFormsForm?.entryId);
  const haveFieldErrors = Boolean(data?.submitGravityFormsForm?.errors?.length);
  const wasSuccessfullySubmitted = haveEntryId && !haveFieldErrors;
  const defaultConfirmation = form.confirmations?.find(
    (confirmation) => confirmation?.isDefault
  );
  const formFields = form.formFields?.nodes || [];
  const { state } = useGravityForm();

  function handleSubmit(event) {
    event.preventDefault();
    if (loading) return;

    submitForm({
      variables: {
        formId: 1,
        fieldValues: state,
      },
    }).catch((error) => {
      console.error(error);
    });
  }

  /* const [submitted, setSubmitted] = useState(false);
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
   */

  function getFieldErrors(id) {
    if (!haveFieldErrors) return [];
    return data.submitGravityFormsForm.errors.filter(
      (error) => error.id === id
    );
  }

  if (wasSuccessfullySubmitted) {
    return (
      <p>
        {defaultConfirmation?.message ||
          "Form successfully submitted - thank you."}
      </p>
    );
  }

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */

    wasSuccessfullySubmitted ? (
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
      <GravityFormProvider>
        <form method="post" onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <GravityFormsField
              key={field?.id}
              field={field}
              fieldErrors={getFieldErrors(Number(field?.id))}
            />
          ))}
          {error ? <p className="error-message">{error.message}</p> : null}
          <button type="submit" disabled={loading}>
            {form?.button?.text || "Submit"}
          </button>
        </form>

        {/* <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
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

          
          {errors.email && (
            <Text size="xs" c={"red"}>
              An Email address is required
            </Text>
          )}
        </Stack>
      </form> */}
      </GravityFormProvider>
    )
  );
};
