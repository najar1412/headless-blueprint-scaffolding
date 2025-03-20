import { gql } from "@apollo/client";

import useGravityForm, { ACTION_TYPES } from "../../../hooks/useGravityForms";

import styles from "./TextField.module.css";

export const TEXT_FIELD_FIELDS = gql`
  fragment TextFieldFields on TextField {
    id
    label
    description
    isRequired
    placeholder
  }
`;

const DEFAULT_VALUE = "";

export default function TextField({ formId, field, fieldErrors }) {
  const { id, type, label, isRequired, placeholder } = field;
  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue) => fieldValue.id === id);
  const value = fieldValue?.value || DEFAULT_VALUE;

  return (
    <div className={`gfield gfield-${type}`.trim()}>
      <input
        className={styles.input}
        type="text"
        name={String(id)}
        id={htmlId}
        required={Boolean(isRequired)}
        placeholder={placeholder || label || ""}
        value={value}
        onChange={(event) => {
          dispatch({
            type: ACTION_TYPES.updateTextFieldValue,
            fieldValue: {
              id,
              value: event.target.value,
            },
          });
        }}
      />

      {fieldErrors?.length
        ? fieldErrors.map((fieldError) => (
            <p key={fieldError.id} className="error-message">
              {fieldError.message}
            </p>
          ))
        : null}
    </div>
  );
}
