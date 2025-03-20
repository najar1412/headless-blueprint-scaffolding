import EmailField from "./fields/EmailField";
import TextField from "./fields/TextField";

export default function GravityFormsField({
  formId,
  field,
  fieldErrors,
  variant,
}) {
  switch (field.type) {
    case "EMAIL":
      return (
        <EmailField
          formId={formId}
          field={field}
          fieldErrors={fieldErrors}
          variant={variant}
        />
      );
    case "TEXT":
      return (
        <TextField formId={formId} field={field} fieldErrors={fieldErrors} />
      );
    default:
      return <p>{`Field type not supported: ${field.type}.`}</p>;
  }
}
