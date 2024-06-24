import { Alert, ConfigProvider } from 'antd';
import { FC } from 'react';

interface AlertProps {
  message: string;
  type: 'error' | 'success' | 'warning' | 'info';
}

const CustomAlert: FC<AlertProps> = ({ message, type }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadiusLG: 0,
          colorSuccessBorder: "#fff",
          colorErrorBorder: "#fff",
          colorWarningBorder: "#fff",
          colorInfoBorder: "#fff",
        },
      }}
    >
      <Alert message={message} type={type} showIcon />
    </ConfigProvider>
  );
};

export default CustomAlert;
