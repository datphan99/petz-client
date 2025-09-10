import { message } from "antd";

interface ModalProps {
  content: React.ReactNode;
  duration?: number;
  className?: string;
  key?: string;
  isLoading?: boolean;
}

export const successModal = ({
  key,
  content,
  duration = 5,
  className = "custom-message",
}: ModalProps): void => {
  message.success({
    content,
    duration,
    className,
    key,
  });
};

export const errorModal = ({
  content,
  duration = 5,
  className = "custom-message",
  key,
}: ModalProps): void => {
  message.error({
    content,
    duration,
    className,
    key,
  });
};

export const loadingModal = ({
  key,
  content,
  duration = 5,
  className = "custom-message",
}: ModalProps): void => {
  message.loading({
    content,
    duration,
    className,
    key,
  });
};

export const warningModal = ({
  key,
  content,
  duration = 5,
  className = "custom-message",
}: ModalProps): void => {
  message.warning({
    content,
    duration,
    className,
    key,
  });
};
