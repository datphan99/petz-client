import formatDate from "@/utils/formatDate";
import formatMoney from "@/utils/formatMoney";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
  SelectItem,
  Select,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  useEditOrderStatusMutation,
  useGetOrdersByOrderIdQuery,
  useRefundOrderMutation,
} from "@/libs/features/services/order";
import { OrderAdmin } from "@/types/Order";
import Image from "next/image";
import { errorModal, successModal } from "@/utils/callModalANTD";
import formatSelectedKeys from "@/utils/formatSelectedValue";

interface ModalOrderDetailProps {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
  orderId: string;
}
enum OrderStatus {
  DELIVERING = "Đang giao",
  DELIVERED = "Đã giao",
  CANCELLED = "Đã hủy",
}

const columns = [
  {
    key: "productName",
    label: "TÊN SẢN PHẨM",
  },
  {
    key: "productThumbnail",
    label: "HÌNH ẢNH",
  },

  {
    key: "productPrice",
    label: "GIÁ SẢN PHẨM",
  },
  {
    key: "productOption",
    label: "Số lượng sản phẩm",
  },
];

export default function ModalOrderDetail({
  isDialogOpen,
  handleCloseDialog,
  orderId,
}: ModalOrderDetailProps) {
  const { data, isLoading } = useGetOrdersByOrderIdQuery({ orderId: orderId });
  const [orderDetail, setOrderDetail] = useState<OrderAdmin>();
  const [editOrderStatus, { data: editResponse, error: editError }] =
    useEditOrderStatusMutation();
  const [refundOrder, { data: refundResponse, error: refundError }] =
    useRefundOrderMutation();

  const handleStatusChange = (orderId: any, newStatus: string) => {
    editOrderStatus({
      orderId: orderId,
      newStatus: formatSelectedKeys(newStatus) as any,
    });
  };

  const handleRefundMomo = (
    orderId: any,
    transIDMomo: any,
    totalAfterDiscount: any,
  ) => {
    const refundObject = {
      transId: transIDMomo,
      orderId: orderId,
      amount: totalAfterDiscount,
    };

    refundOrder(refundObject);
  };

  useEffect(() => {
    if (refundError) {
      errorModal({ content: (refundError as any)?.data.details.message });
    }
    if (refundResponse) {
      successModal({ content: (refundResponse as any)?.data.details.message });
    }
  }, [refundError, refundResponse]);

  useEffect(() => {
    if (data) {
      setOrderDetail((data as any)[0]);
    }
  }, [data, editResponse, editError]);

  useEffect(() => {
    if (editResponse) {
      successModal({ content: "Cập nhật trạng thái thành công", duration: 3 });
    }
    if (editError) {
      errorModal({ content: "Cập nhật trạng thái thất bại", duration: 3 });
    }
  }, [editResponse, editError]);

  if (isLoading) {
    return (
      <Modal
        className="dark:text-white"
        size="2xl"
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
                Chi tiết đơn hàng
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
                  <div className="space-y-3">
                    <Skeleton className="w-3/5 rounded-lg">
                      <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="rounded-lg">
                      <div className="h-24 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <Skeleton className="w-4/5 rounded-lg">
                      <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-2/5 rounded-lg">
                      <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                    </Skeleton>
                  </div>
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

  return (
    <Modal
      size="2xl"
      backdrop="blur"
      onClose={handleCloseDialog}
      isOpen={isDialogOpen}
      className="dark:text-white"
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-center">Chi tiết đơn hàng</ModalHeader>
            <ModalBody>
              <p>
                <span className="font-bold">Tên khách hàng:</span>{" "}
                {orderDetail?.customerName}
              </p>
              <p>
                <span className="font-bold">Số điện thoại:</span>{" "}
                {orderDetail?.customerPhone}
              </p>
              <p>
                <span className="font-bold">Địa chỉ:</span>{" "}
                {orderDetail?.customerAddress}
              </p>
              <Table aria-label="Chi tiết sản phẩm">
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                  )}
                </TableHeader>
                <TableBody items={orderDetail?.products || []}>
                  {(data) => {
                    const selectedOption = (
                      data as any
                    ).productId.productOption.find(
                      (option: any) =>
                        option.name === (data as any).productOption,
                    );

                    const isOnSale = (data as any).productId.salePercent > 0;
                    const salePrice = isOnSale
                      ? (selectedOption?.productPrice || 0) *
                        ((100 - (data as any).productId.salePercent) / 100)
                      : selectedOption?.productPrice || 0;

                    return (
                      <TableRow key={data._id}>
                        <TableCell>
                          {(data as any).productId.productName}
                        </TableCell>
                        <TableCell>
                          <Image
                            unoptimized
                            priority
                            src={(data as any).productId.productThumbnail}
                            alt="product"
                            style={{ width: "80px", height: "100px" }}
                            width={500}
                            height={500}
                          />
                        </TableCell>
                        <TableCell>{formatMoney(salePrice)}</TableCell>
                        <TableCell>
                          {(data as any)?.productQuantity} x{" "}
                          {selectedOption?.name}
                        </TableCell>
                      </TableRow>
                    );
                  }}
                </TableBody>
              </Table>
              <p>
                <span className="font-bold">Tổng tiền đơn hàng:</span>{" "}
                {formatMoney(orderDetail?.orderTotal)}
              </p>
              <p>
                <span className="font-bold">Giảm giá:</span>{" "}
                {formatMoney(orderDetail?.orderDiscount || "Không giảm")}
              </p>
              <p>
                <span className="font-bold">Thành tiền sau giảm:</span>{" "}
                {formatMoney(orderDetail?.totalAfterDiscount)}
              </p>
              <p>
                <span className="font-bold">Trạng thái:</span>{" "}
                {
                  OrderStatus[
                    (orderDetail as any)
                      ?.orderStatus as keyof typeof OrderStatus
                  ]
                }
              </p>
              <p>
                <span className="font-bold">Ngày tạo:</span>{" "}
                {formatDate(orderDetail?.createdAt)}
              </p>
              <div className="flex items-center gap-2">
                <p>Cập nhật trạng thái: </p>
                <Select
                  className="w-2/3"
                  onSelectionChange={(value: any) =>
                    handleStatusChange(orderDetail?._id, value)
                  }
                  label="Trạng thái"
                  placeholder="Trạng thái"
                  selectedKeys={[orderDetail?.orderStatus] as any}
                >
                  {Object.keys(OrderStatus).map((statusKey) => (
                    <SelectItem className="dark:text-white" key={statusKey}>
                      {OrderStatus[statusKey as keyof typeof OrderStatus]}
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
