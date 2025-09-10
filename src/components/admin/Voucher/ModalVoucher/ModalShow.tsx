import { useToggleVoucherMutation } from "@/libs/features/services/voucher";
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

interface ModalShowProps {
  isDialogOpen: boolean;
  voucherId: string;
  handleCloseDialog: () => void;
}

export default function ModalShow({
  isDialogOpen,
  voucherId,
  handleCloseDialog,
}: ModalShowProps) {
  const [showVoucher, { data, error: hiddenError }] =
    useToggleVoucherMutation();

  async function handleDeleteCategory() {
    if (voucherId) {
      const toggleVoucherObject = { voucherId: voucherId, toggleOption: false };
      await showVoucher(toggleVoucherObject as any);
    }
  }

  useEffect(() => {
    if (data) {
      successModal({ content: "Cập nhật thành công" });
      handleCloseDialog();
      console.log(data);
    }
    if (hiddenError) {
      errorModal({ content: "Cập nhật thất bại" });
      handleCloseDialog();
      console.log(hiddenError);
    }
  }, [data, hiddenError]);

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
            <ModalHeader className="text-center">Hiển thị voucher</ModalHeader>
            <ModalBody>
              <p>Bạn có chắc chắn muốn hiển thị voucher</p>
            </ModalBody>
            <ModalFooter>
              <Button
                onPress={handleCloseDialog}
                className="rounded-full bg-[#ddf0e5] text-[#108152]"
              >
                Hủy
              </Button>
              <Button
                className="rounded-full bg-[#f4e7e6] text-[#b5251a]"
                onPress={handleDeleteCategory}
              >
                Ẩn
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
