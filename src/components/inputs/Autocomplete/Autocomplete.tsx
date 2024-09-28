import MuiAutocomplete, {
  AutocompleteProps as MuiAutocompleteProps,
} from "@mui/material/Autocomplete";
import TextField, { TextFieldProps } from "@mui/material/TextField";

export interface Option {
  id: string | number;
  label: string;
}

export interface AutocompleteProps<T>
  extends Omit<
    MuiAutocompleteProps<T, undefined, undefined, undefined>,
    "renderInput" | "multiple" | "disableClearable" | "freeSolo"
  > {
  inputLabel?: string;
  error?: boolean;
  helperText?: string;
  inputAutoComplete?: string;
  TextFieldInputProps?: TextFieldProps["InputProps"];
  /**
   * This prop won't work. If you want to use `paceholder` feature, use prop called `inputLabel` instead
   */
  placeholder?: string | undefined;
}

const Autocomplete = <T extends Option>({
  inputLabel,
  error,
  helperText,
  inputAutoComplete = "new-password",
  autoHighlight = true,
  noOptionsText = "No matching elements",
  TextFieldInputProps,
  // placeholder,
  ...rest
}: AutocompleteProps<T>) => {
  return (
    <MuiAutocomplete
      autoHighlight={autoHighlight}
      noOptionsText={noOptionsText}
      renderInput={({ InputProps, ...rest }) => (
        <TextField
          {...rest}
          label={inputLabel}
          error={error}
          helperText={helperText}
          inputProps={{
            ...rest.inputProps,
            autoComplete: inputAutoComplete,
          }}
          InputProps={{
            ...InputProps,
            ...TextFieldInputProps,
          }}
        />
      )}
      {...rest}
    />
  );
};

export default Autocomplete;
