import { Modal } from "antd";
import { FC, Fragment, ReactNode } from "react";
import "./modal.scss";


interface ButtonInterface{
  label: string;
  action: () => void;
}

interface ButtonOk extends ButtonInterface {
  isOkDisabled?: boolean;
  isOkLoading?: boolean
}

interface ButtonClose extends ButtonInterface {
  isCancelDisabled?: boolean
}

interface CustomModalProps {
  isOpen: boolean;
  content: ReactNode;
  title: string;
  button?: ButtonOk;
  buttonClose: ButtonClose;
  
}

const CustomModal: FC<CustomModalProps> = ({
  isOpen = false,
  content,
  title,
  button,
  buttonClose
}) => {
  return (
    <Fragment>
      <Modal
        title={title}
        className="custom-modal overflow-hidden"
        centered
        open={isOpen}
        onOk={button?.action}
        onCancel={buttonClose.action}
        okText={button?.label}
        okButtonProps={{ disabled: button?.isOkDisabled || false, loading: button?.isOkLoading || false }}
        cancelButtonProps={{disabled: buttonClose.isCancelDisabled || false}}
      >
        {content}
      </Modal>
    </Fragment>
  );
};

export default CustomModal;
