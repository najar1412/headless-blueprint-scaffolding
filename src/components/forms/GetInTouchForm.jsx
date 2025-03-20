import { useState } from "react";

import { Button, Divider, Stack, Text } from "@mantine/core";
import { useMutation, gql } from "@apollo/client";

import useGravityForm from "../../hooks/useGravityForms";
import GravityFormsField from "../GravityFormFields/GravityFormsField";

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

export const GetInTouchForm = ({ form }) => {
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
        formId: 2,
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

  return (
    <>
      {success ? (
        <Stack justify="center" h={"100%"}>
          <Divider hiddenFrom="md" />
          <Text c="white" fw="bold">
            <div
              dangerouslySetInnerHTML={{ __html: defaultConfirmation?.message }}
            ></div>
          </Text>
        </Stack>
      ) : (
        <form
          method="post"
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            opacity: loading ? 0.5 : 1,
            pointerEvents: loading ? "none" : "auto",
          }}
        >
          <Stack>
            {formFields.map((field) => (
              <GravityFormsField
                key={field?.id}
                formId={form.id}
                field={field}
                fieldErrors={getFieldErrors(Number(field?.id))}
                variant={1}
              />
            ))}
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

            {error ? <p className="error-message">{error.message}</p> : null}
          </Stack>
        </form>
      )}
    </>
  );
};
