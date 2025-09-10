import { useCancelBookingMutation } from "@/libs/features/services/booking";
import { successModal, warningModal } from "@/utils/callModalANTD";
import { SuccessModal } from "@/utils/successModal";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface ModalCancelBookingProps {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
  bookingId: string;
}

export default function ModalCancelBooking({
  isDialogOpen,
  handleCloseDialog,
  bookingId,
}: ModalCancelBookingProps) {
  const [cancelBooking, { data, error: cancelError }] =
    useCancelBookingMutation();
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState();

  useEffect(() => {
    if (session) {
      setUserId(session?.user._id as any);
    }
  }, [session]);

  function handleCancelBooking() {
    cancelBooking({ bookingId: bookingId, userId: userId as any });
  }

  useEffect(() => {
    if (data) {
      successModal({ content: (data as any)?.message });
      handleCloseDialog();
    }
    if (cancelError) {
      warningModal({ content: (cancelError as any)?.data.message });
      handleCloseDialog();
    }
  }, [data, cancelError]);

  return (
    <Modal
      backdrop="blur"
      onClose={handleCloseDialog}
      isOpen={isDialogOpen}
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-center">
              Bạn có chắc chắn muốn hủy đặt lịch
            </ModalHeader>
            <ModalBody></ModalBody>
            <ModalFooter>
              <Button
                className="rounded-full bg-black text-white"
                onPress={handleCloseDialog}
              >
                Đóng
              </Button>
              <Button
                className="rounded-full bg-black text-white"
                onPress={handleCancelBooking}
              >
                Hủy đặt lịch
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
