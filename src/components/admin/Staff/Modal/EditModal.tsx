import {
  Modal,
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  useEditUserShiftMutation,
  useUnbanUserMutation,
} from "@/libs/features/services/user";
import { successModal } from "@/utils/callModalANTD";

interface ModalEditProps {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
  userId: string;
}

export default function ModalEdit({
  isDialogOpen,
  handleCloseDialog,
  userId,
}: ModalEditProps) {
  const [unbanUser, { data }] = useUnbanUserMutation();
  const [selectedShifts, setSelectedShifts] = useState<
    { startTime: string; endTime: string }[]
  >([]);

  const handleSubmit = () => {
    unbanUser(userId);
  };

  useEffect(() => {
    if (data) {
      successModal({ content: "Đã xóa nhân viên" });
      handleCloseDialog();
    }
  }, [data]);

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
              Bỏ hạn chế người dùng
            </ModalHeader>
            <ModalBody>
              Bạn có chắc chắn muốn bỏ hạn chế người dùng này.
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
                onPress={handleSubmit}
              >
                Bỏ hạn chế
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
