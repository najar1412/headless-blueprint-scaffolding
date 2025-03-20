import { createContext, useContext, useReducer } from "react";

export const ACTION_TYPES = {
  updateEmailFieldValue: "updateEmailFieldValue",
  updateNameFieldValue: "updateNameFieldValue",
  updateTextFieldValue: "updateTextFieldValue",
};

function reducer(state, action) {
  const getOtherFieldValues = (id) =>
    state.filter((fieldValue) => fieldValue.id !== id);

  switch (action.type) {
    case ACTION_TYPES.updateEmailFieldValue: {
      const { id, emailValues } = action.fieldValue;
      return [...getOtherFieldValues(id), { id, emailValues }];
    }
    case ACTION_TYPES.updateNameFieldValue: {
      const { id, nameValues } = action.fieldValue;
      return [...getOtherFieldValues(id), { id, nameValues }];
    }
    default:
      throw new Error(
        `Field value update operation not supported: ${action.type}.`
      );
  }
}

const DEFAULT_STATE = [];

const GravityFormContext = createContext({
  state: DEFAULT_STATE,
  dispatch: () => null,
});

export function GravityFormProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  return (
    <GravityFormContext.Provider value={{ state, dispatch }}>
      {children}
    </GravityFormContext.Provider>
  );
}

const useGravityForm = () => useContext(GravityFormContext);

export default useGravityForm;
