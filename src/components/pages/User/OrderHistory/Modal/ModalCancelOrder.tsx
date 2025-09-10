import {
  useCancelOrderMutation,
  useRefundOrderMutation,
} from "@/libs/features/services/order";
import { successModal, warningModal } from "@/utils/callModalANTD";
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

interface ModalCancelOrderProps {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
  orderId: string;
  transID?: string;
  orderStatus?: string;
  orderTotal?: number;
}

export default function ModalCancelOrder({
  isDialogOpen,
  handleCloseDialog,
  orderId,
  transID,
  orderStatus,
  orderTotal,
}: ModalCancelOrderProps) {
  const [cancelOrder, { data, error: cancelError }] = useCancelOrderMutation();
  const [refundOrder, { data: refundResponse, error: refundError }] =
    useRefundOrderMutation();

  const { data: session, status } = useSession();
  const [userId, setUserId] = useState();

  useEffect(() => {
    if (session) {
      setUserId(session?.user._id as any);
    }
  }, [session]);

  function handleCancelOrder() {
    if (orderStatus == "PAID") {
      const refundObject = {
        transId: transID,
        orderId: orderId,
        amount: orderTotal,
      };
      refundOrder(refundObject);
    } else {
      cancelOrder({ orderId: orderId, userId: userId as any });
    }
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

  useEffect(() => {
    if (refundResponse) {
      successModal({ content: "Đã hủy đơn hàng" });
      handleCloseDialog();
    }
    if (refundError) {
      warningModal({ content: "Hủy đơn hàng thất bại" });
      handleCloseDialog();
    }
  }, [refundError, refundResponse]);

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
              Bạn có chắc chắn muốn hủy đơn hàng
            </ModalHeader>
            <ModalBody></ModalBody>
            <ModalFooter>
              <Button
                className="rounded-full bg-black text-white"
                onPress={handleCloseDialog}
              >
                Hủy
              </Button>
              <Button
                className="rounded-full bg-black text-white"
                onPress={handleCancelOrder}
              >
                Hủy đơn
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
