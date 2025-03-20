// TODO: refactor newsletterform annd getintouch form, too much shared code.

import { useState } from "react";

import { Stack, UnstyledButton, Text } from "@mantine/core";
import Image from "next/image";
import { useMutation, gql } from "@apollo/client";

import useGravityForm from "../../hooks/useGravityForms";
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
      confirmation {
        message
      }
    }
  }
`;

export const NewsletterForm = ({ form }) => {
  const { state } = useGravityForm();
  const [submitForm, { data, loading, error }] = useMutation(SUBMIT_FORM);
  const [success, setSuccess] = useState(false);

  const haveFieldErrors = Boolean(data?.submitGfForm?.errors?.length);
  const defaultConfirmation = data?.submitGfForm?.confirmation;

  const formFields = form?.formFields?.nodes || [];

  function handleSubmit(event) {
    event.preventDefault();
    if (loading) return;
    submitForm({
      variables: {
        formId: 1,
        fieldValues: state,
      },
    })
      .catch((error) => {
        console.error(error);
        return;
      })
      .finally(() => setSuccess(true));
  }

  function getFieldErrors(id) {
    if (!haveFieldErrors) return [];
    return data.submitGfForm.errors.filter((error) => error.id === id);
  }

  return success ? (
    <Stack w={"100%"}>
      <Text
        fw={"bold"}
        size="xs"
        c="brand.0"
        mt="2rem"
        ta={{ base: "center", xs: "left" }}
      >
        <div
          dangerouslySetInnerHTML={{ __html: defaultConfirmation?.message }}
        ></div>
      </Text>
    </Stack>
  ) : (
    <>
      <form
        method="post"
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          opacity: loading ? 0.5 : 1,
          pointerEvents: loading ? "none" : "auto",
        }}
      >
        <Stack mt="1rem">
          <div className={styles["input-container"]}>
            <UnstyledButton type="submit">
              <Image alt="arrow" src={arrow} className={styles.arrow} />
            </UnstyledButton>
            {formFields.map((field) => (
              <GravityFormsField
                key={field?.id}
                formId={form.id}
                field={field}
                fieldErrors={getFieldErrors(Number(field?.id))}
              />
            ))}
          </div>

          {error ? <p className="error-message">{error.message}</p> : null}
        </Stack>
      </form>
    </>
  );
};
