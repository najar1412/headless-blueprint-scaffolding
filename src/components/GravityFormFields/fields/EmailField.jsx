import useGravityForm, { ACTION_TYPES } from "../../../hooks/useGravityForms";

import styles from "./EmailField.module.css";

const DEFAULT_VALUE = "";

export default function EmailField({ formId, field, fieldErrors }) {
  const { id, type, isRequired, placeholder } = field;

  const htmlId = `field_${formId}_${id}`;
  const { state, dispatch } = useGravityForm();
  const fieldValue = state.find((fieldValue) => fieldValue.id === id);
  const value = fieldValue?.emailValues?.value || DEFAULT_VALUE;

  return (
    <>
      <input
        className={`gfield gfield-${type} ${styles.input}`.trim()}
        type="email"
        name={String(id)}
        id={htmlId}
        placeholder={placeholder || label || ""}
        required={Boolean(isRequired)}
        value={value}
        onChange={(event) => {
          dispatch({
            type: ACTION_TYPES.updateEmailFieldValue,
            fieldValue: {
              id,
              emailValues: {
                value: event.target.value,
              },
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
    </>
  );
}
