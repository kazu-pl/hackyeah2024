import Autocomplete, {
  AutocompleteProps,
  Option,
} from "../inputs/Autocomplete";
import { useField } from "formik";

export interface AutocompleteSyncFormikProps<T>
  extends Omit<
    AutocompleteProps<T>,
    | "value"
    | "onChange"
    | "getOptionLabel"
    | "isOptionEqualToValue"
    | "inputValue"
    | "onInputChange"
    | "TextFieldInputProps"
  > {
  name: string;
  inputLabel: string;
}

const AutocompleteSyncFormik = <T extends Option>({
  name,
  helperText,
  ...rest
}: AutocompleteSyncFormikProps<T>) => {
  const [field, meta, helpers] = useField(name);

  console.log({
    field: field.value,
  });

  return (
    <Autocomplete
      onChange={(event, newValue) => {
        const eventy = event;
        console.log({
          eventy,
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        newValue ? helpers.setValue(newValue.id) : helpers.setValue("");
      }}
      getOptionLabel={(option) => option && option.label}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      helperText={(meta.touched && meta.error) || helperText}
      error={meta.touched && !!meta.error}
      {...rest}
    />
  );
};

export default AutocompleteSyncFormik;
