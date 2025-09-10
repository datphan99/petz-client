import {
  useDeleteServiceMutation,
  useToggleServiceMutation,
} from "@/libs/features/services/services";
import { errorModal, successModal } from "@/utils/callModalANTD";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";
import { useEffect } from "react";

interface ModalAddProps {
  isDialogOpen: boolean;
  serviceId?: string;
  handleCloseDialog: () => void;
}

export default function ModalShow({
  isDialogOpen,
  serviceId,
  handleCloseDialog,
}: ModalAddProps) {
  const [hiddenService, { data, error }] = useToggleServiceMutation();

  async function handleDeleteCategory() {
    if (serviceId) {
      const hiddenServiceObject = {
        serviceId: serviceId,
        toggleOption: false,
      };
      await hiddenService(hiddenServiceObject as any);
    }
  }

  useEffect(() => {
    if (data) {
      successModal({ content: "Cập nhật thành công" });
      handleCloseDialog();
    }

    if (error) {
      errorModal({ content: "Cập nhật thất bại" });
    }
  }, [data, error]);

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
      <ModalContent className="dark:text-white">
        {(onClose) => (
          <>
            <ModalHeader className="text-center">Hiển thị dịch vụ</ModalHeader>
            <ModalBody>
              <p>Bạn có chắc chắn muốn hiển thị dịch vụ này</p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={handleCloseDialog}
                className="rounded-full"
              >
                Hủy
              </Button>
              <Button
                color="danger"
                className="rounded-full"
                onPress={handleDeleteCategory}
              >
                Xóa
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
