import {
  Modal,
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  useCreateStaffMutation,
  useCreateUserMutation,
} from "@/libs/features/services/user";
import { errorModal, successModal } from "@/utils/callModalANTD";
import formatSelectedKeys from "@/utils/formatSelectedValue";

enum UserRole {
  admin = "Admin",
  staff = "Nhân viên",
}

const USER_ROLE = ["admin", "staff"];

interface ModalAddProps {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
}

export default function ModalAdd({
  isDialogOpen,
  handleCloseDialog,
}: ModalAddProps) {
  const [createStaff, { data, error: createError, isLoading }] =
    useCreateStaffMutation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState(new Set([]));

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formatRole = formatSelectedKeys(userRole);

    if (!isValidEmail(email)) {
      return errorModal({ content: "Email không hợp lệ" });
    }

    if (
      email === "" ||
      username === "" ||
      password === "" ||
      formatRole === ""
    ) {
      return errorModal({ content: "Vui lòng nhập đủ thông tin" });
    }

    const formData = {
      email,
      username,
      password,
      formatRole,
    };

    await createStaff(formData);
  };

  const handleSubmitButton = async (e: any) => {
    const formatRole = formatSelectedKeys(userRole);

    if (!isValidEmail(email)) {
      return errorModal({ content: "Email không hợp lệ" });
    }

    if (
      email === "" ||
      username === "" ||
      password === "" ||
      formatRole === ""
    ) {
      return errorModal({ content: "Vui lòng nhập đủ thông tin" });
    }

    const formData = {
      email,
      username,
      password,
      formatRole,
    };
    await createStaff(formData);
  };

  useEffect(() => {
    if (data) {
      successModal({ content: data.message });
      handleCloseDialog();
      setEmail("");
      setUsername("");
      setPassword("");
      setUserRole(new Set([]));
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
              Thêm nhân viên mới
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
                <Select
                  labelPlacement={"inside"}
                  label="Vai trò"
                  className="w-full"
                  onSelectionChange={setUserRole as any}
                >
                  {USER_ROLE.map((role) => (
                    <SelectItem
                      className="dark:text-white"
                      key={role}
                      value={role}
                    >
                      {UserRole[role as keyof typeof UserRole]}
                    </SelectItem>
                  ))}
                </Select>
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
