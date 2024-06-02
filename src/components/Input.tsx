import { Input, Typography } from "antd";
import { ErrorMessage } from "formik";
import { FC } from "react";

interface CustomInputProp {
  label: string;
  placeholder: string;
  name: string;
  onChange: (e: any) => void;
  value: string;
  touched?: any;
  errors?: any;
  onBlur?: (e: any) => void
}

const CustomInput: FC<CustomInputProp> = ({
  label,
  placeholder,
  name,
  onChange,
  value,
  touched,
  errors,
  onBlur
}) => {

  return (
    <div>
      <Typography className="text-base mb-0.5">{label}</Typography>
      <Input
        size="large"
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        status={(touched || (value && value.length > 0)) && errors   ? "error" : ""}
      />
      <div>
      {(touched || (value && value.length > 0)) && errors  ? 
       <ErrorMessage render={msg => <Typography className="text-red-500 text-xs pl-2">* {msg}</Typography>} name={name} />
      : null}
      </div>
    </div>
  );
};
export default CustomInput;
