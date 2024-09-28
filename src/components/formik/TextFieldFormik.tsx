import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useField } from "formik";

export type TextFieldFormikProps = Omit<
  TextFieldProps,
  "name" | "value" | "onBlur" | "onChange" | "error"
> & {
  name: string;
  /**
   * `onChange` prop may be used when you need to fetch some data on every input change. formik onChange handler `field.onChange` is applied so you don't need to additionaly set the value
   *
   * Below is the implementation that shows how `onChange` events are handled in `TextFieldFormik`:
   * @example
   * `
   * const handleChange: TextFieldProps["onChange"] = (e) => {
   *  onChange && onChange(e)
   *  field.onChange(e);
   * };
   *
   * return (
   *   <TextField
   *    onChange={handleChange}
   *    {...rest}
   *  />
   * `
   */
  onChange?: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
};

const TextFieldFormik = ({
  name,
  helperText,
  onChange,
  ...rest
}: TextFieldFormikProps) => {
  const [field, meta] = useField(name);

  const handleChange: TextFieldProps["onChange"] = (e) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onChange && onChange(e);
    field.onChange(e);
  };

  return (
    <TextField
      name={field.name}
      value={field.value}
      onBlur={field.onBlur}
      onChange={handleChange}
      error={meta.touched && !!meta.error}
      helperText={(meta.touched && meta.error) || helperText}
      {...rest}
    />
  );
};

export default TextFieldFormik;
