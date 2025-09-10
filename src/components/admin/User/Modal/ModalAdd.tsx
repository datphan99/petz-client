import {
  Modal,
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useCreateUserMutation } from "@/libs/features/services/user";
import { errorModal, successModal } from "@/utils/callModalANTD";

interface ModalAddProps {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
}

export default function ModalAdd({
  isDialogOpen,
  handleCloseDialog,
}: ModalAddProps) {
  const [createUser, { data, error: createError, isLoading }] =
    useCreateUserMutation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (email == "" || username == "" || password == "") {
      return errorModal({ content: "Vui lòng nhập đủ thông tin" });
    }

    const formData = {
      email,
      username,
      password,
    };
    await createUser(formData);
  };

  const handleSubmitButton = async () => {
    if (email == "" || username == "" || password == "") {
      return errorModal({ content: "Vui lòng nhập đủ thông tin" });
    }

    const formData = {
      email,
      username,
      password,
    };
    await createUser(formData);
  };

  useEffect(() => {
    if (data) {
      successModal({ content: data.message });
      handleCloseDialog();
      setEmail("");
      setUsername("");
      setPassword("");
    }
    if (createError) {
      errorModal({ content: (createError as any).data.message });
    }
  }, [data, createError]);

  return (
    <Modal
      backdrop="blur"
      isOpen={isDialogOpen}
      onClose={handleCloseDialog}
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-center dark:text-white">
              Tạo tài khoản mới
            </ModalHeader>
            <ModalBody>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <Input
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="hidden" />
              </form>
            </ModalBody>
            <ModalFooter>
              <Button
                onPress={handleCloseDialog}
                variant="light"
                className="rounded-full"
              >
                Hủy
              </Button>
              <Button
                color="success"
                className="rounded-full text-white"
                onPress={handleSubmitButton}
                isLoading={isLoading}
              >
                Lưu
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
