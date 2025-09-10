enum BookingStatus {
  Canceled = "Đã hủy",
  Confirm = "Đã xác nhận",
  Done = "Đã hoàn thành",
}

import {
  useCancelBookingMutation,
  useConfirmBookingMutation,
  useDoneBookingMutation,
  useGetBookingQuery,
} from "@/libs/features/services/booking";
import formatDate from "@/utils/formatDate";
import formatMoney from "@/utils/formatMoney";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
  Skeleton,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Booking } from "@/types/Booking";
import { successModal } from "@/utils/callModalANTD";
import formatSelectedKeys from "@/utils/formatSelectedValue";

interface ModalBookingDetailProps {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
  bookingId: string;
}

export default function ModalBookingDetail({
  isDialogOpen,
  handleCloseDialog,
  bookingId,
}: ModalBookingDetailProps) {
  const { data, isLoading } = useGetBookingQuery({ bookingId: bookingId });
  const [bookingDetail, setBookingDetail] = useState<Booking>();
  const [disableStatus, setDisableStatus] = useState<string[]>([]);

  const [cancelBooking, { data: cancelResponse }] = useCancelBookingMutation();
  const [confirmBooking, { data: confirmResponse }] =
    useConfirmBookingMutation();
  const [doneBooking, { data: doneResponse }] = useDoneBookingMutation();

  useEffect(() => {
    if (data) {
      setBookingDetail(data?.bookings[0]);
    }
  }, [data]);

  useEffect(() => {
    if (cancelResponse) {
      successModal({ content: cancelResponse.message });
    }
  }, [cancelResponse]);

  useEffect(() => {
    if (doneResponse) {
      successModal({ content: doneResponse.message });
    }
  }, [doneResponse]);

  useEffect(() => {
    if (confirmResponse) {
      successModal({ content: confirmResponse.message });
    }
  }, [confirmResponse]);

  if (isLoading) {
    return (
      <Modal
        className="dark:text-white"
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
                Chi tiết lịch đặt
              </ModalHeader>
              <ModalBody>
                <div className="space-y-3">
                  <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                  </Skeleton>
                  <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                  </Skeleton>
                  <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                  </Skeleton>
                  <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                  </Skeleton>
                  <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                  </Skeleton>
                  <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                  </Skeleton>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="rounded-full bg-black text-white"
                  onPress={handleCloseDialog}
                >
                  Hủy
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  }

  function handleChangeBookingStatus(status: any) {
    const selectedStatus = formatSelectedKeys(status);
    if (selectedStatus == "Done") {
      doneBooking({ bookingId: bookingDetail!._id });
    }
    if (selectedStatus == "Canceled") {
      cancelBooking({ bookingId: bookingDetail!._id });
    }
    if (selectedStatus == "Confirm") {
      confirmBooking({ bookingId: bookingDetail!._id });
    }
  }

  return (
    <Modal
      size="xl"
      className="dark:text-white"
      backdrop="blur"
      onClose={handleCloseDialog}
      isOpen={isDialogOpen}
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="text-center">Chi tiết lịch đặt</ModalHeader>
            <ModalBody>
              <p>
                <span className="font-bold">Tên khách hàng:</span>{" "}
                {bookingDetail?.customerName}
              </p>
              <p>
                <span className="font-bold">Giờ đặt:</span>{" "}
                {bookingDetail?.bookingHours}
              </p>

              <p>
                <span className="font-bold">Ngày đặt:</span>{" "}
                {formatDate(bookingDetail?.bookingDate as any)}
              </p>
              <div>
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left font-[14px]">Dịch vụ</th>
                      <th className="text-right font-[14px]">Giá tiền</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {bookingDetail?.service.map((service: any) => (
                      <tr
                        key={service._id}
                        className="border-b border-[#e5e7eb] text-[14px]"
                      >
                        <td className="p-0.5 text-[#4a4a4a]">
                          {service.serviceName}
                        </td>
                        <td className="p-0.5 text-right text-[#4a4a4a]">
                          {formatMoney(service.servicePrice)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <table className="w-full border-collapse text-[14px]">
                  <tbody>
                    <tr>
                      <th className="text-left text-[#4a4a4a]">Tổng tiền:</th>
                      <th className="text-right text-[#4a4a4a]">
                        {formatMoney(bookingDetail?.totalPrice)}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex items-center gap-2">
                <p>Cập nhật trạng thái: </p>
                <Select
                  className="w-2/3"
                  onSelectionChange={handleChangeBookingStatus}
                  label="Trạng thái"
                  placeholder="Trạng thái"
                  selectedKeys={[bookingDetail?.bookingStatus] as any}
                >
                  {Object.keys(BookingStatus).map((statusKey) => (
                    <SelectItem className="dark:text-white" key={statusKey}>
                      {BookingStatus[statusKey as keyof typeof BookingStatus]}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="rounded-full bg-black text-white"
                onPress={handleCloseDialog}
              >
                Hủy
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
