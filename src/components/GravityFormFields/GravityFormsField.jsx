import EmailField from "./fields/EmailField";
import TextField from "./fields/TextField";
import NameField from "./fields/NameField";

export default function GravityFormsField({ formId, field, fieldErrors }) {
  switch (field.type) {
    case "EMAIL":
      return (
        <EmailField formId={formId} field={field} fieldErrors={fieldErrors} />
      );
    case "NAME":
      return (
        <NameField formId={formId} field={field} fieldErrors={fieldErrors} />
      );
    case "TEXT":
      return (
        <TextField formId={formId} field={field} fieldErrors={fieldErrors} />
      );
    default:
      return <p>{`Field type not supported: ${field.type}.`}</p>;
  }
}
