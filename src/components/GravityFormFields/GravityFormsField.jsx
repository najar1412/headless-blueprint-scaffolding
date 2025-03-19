import EmailField from "./fields/EmailField";
import TextField from "./fields/TextField";
import NameField from "./fields/NameField";

export default function GravityFormsField({ field, fieldErrors }) {
  switch (field.type) {
    case "EMAIL":
      return <EmailField field={field} fieldErrors={fieldErrors} />;
    case "NAME":
      return <NameField field={field} fieldErrors={fieldErrors} />;
    case "TEXT":
      return <TextField field={field} fieldErrors={fieldErrors} />;
    default:
      return <p>{`Field type not supported: ${field.type}.`}</p>;
  }
}
