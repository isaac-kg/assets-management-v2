import { Select, Typography } from 'antd';
import { ErrorMessage } from 'formik';
import { FC } from 'react';

type option = {
  label: string;
  value: string;
};

interface CustomInputProp {
  label: string;
  placeholder: string;
  name: string;
  onChange: (e: any) => void;
  value: string;
  touched?: any;
  errors?: any;
  onSearch?: (e: any) => void;
  type?: string;
  option:  option[];
  defaultValue? : null,
  mode: undefined | any
}

const SelectInput: FC<CustomInputProp> = ({
  label,
  placeholder,
  name,
  onChange,
  value,
  touched,
  errors,
  onSearch,
  option,
  defaultValue,
  mode = undefined
}) => {
  return (
    <div>
      <Typography className="text-base mb-0.5">{label}</Typography>
      <Select
        defaultValue={defaultValue}
        placeholder={placeholder}
        optionFilterProp="label"
        onChange={onChange}
        size="large"
        onSearch={onSearch}
        options={option}
        className='w-full'
        value={value}
        mode={mode}
      />
      <div>
        {(touched || (value && value.length > 0)) && errors ? (
          <ErrorMessage
            render={(msg) => (
              <Typography className="text-red-500 text-xs pl-2">
                * {msg}
              </Typography>
            )}
            name={name}
          />
        ) : null}
      </div>
    </div>
  );
};
export default SelectInput;
