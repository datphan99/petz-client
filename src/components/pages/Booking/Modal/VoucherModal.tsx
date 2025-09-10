import NoVouccherIcon from "@@/public/images/no-voucher.png";
import React, { useEffect, useState } from "react";
import { useGetVouchersHeldQuery } from "@/libs/features/services/user";
import formatDate from "@/utils/formatDate";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import formatDiscount from "@/utils/formatDiscount";
import { successModal } from "@/utils/callModalANTD";
import Image from "next/image";
import Link from "next/link";
import { skipToken } from "@reduxjs/toolkit/query";

interface ModalAddProps {
  isDialogOpen: boolean;
  formik: any;
  handleCloseDialog: () => void;
  totalPrice: number;
}

export default function VoucherModal({
  isDialogOpen,
  formik,
  handleCloseDialog,
  totalPrice,
}: ModalAddProps) {
  const { data: session } = useSession();

  const { data: voucher } = useGetVouchersHeldQuery(
    session?.user._id ? { userId: session.user._id, limit: 100 } : skipToken,
  );

  const [selectedVoucher, setSelectedVoucher] = useState<string | null>(null);
  const [selectedVoucherType, setSelectedVoucherType] = useState<string | null>(
    null,
  );
  const [selectedVoucherDiscount, setSelectedVoucherDiscount] = useState<
    number | null
  >(null);

  useEffect(() => {
    setSelectedVoucher(formik.values.voucherId);
  }, [formik.values.voucherId]);

  function handleApplyVoucher() {
    formik.setFieldValue("voucherType", selectedVoucherType);
    formik.setFieldValue("voucherDiscount", selectedVoucherDiscount);
    formik.setFieldValue("voucherId", selectedVoucher);

    handleCloseDialog();
    successModal({ content: "Đã áp dụng mã khuyến mãi." });
  }

  function handleSelectedVoucher(
    voucherId: any,
    voucherType: any,
    discountAmount: any,
  ) {
    setSelectedVoucher(voucherId);
    setSelectedVoucherDiscount(discountAmount);
    setSelectedVoucherType(voucherType);
  }

  return (
    <Modal
      placement="center"
      size="lg"
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
              Áp dụng mã khuyến mãi
            </ModalHeader>
            <ModalBody className="max-h-[500px] overflow-y-auto">
              {!session?.user &&
                "Bạn phải đăng nhập mới có thể sử dụng Voucher"}
              {voucher?.vouchers.length == 0 && (
                <div className="flex flex-col items-center justify-center">
                  <div className="w-1/2">
                    <Image
                      className="w-full"
                      src={NoVouccherIcon}
                      alt="no image icon"
                    />
                  </div>
                  <div>
                    <span>Rất tiếc! Bạn không có Voucher.</span>
                    <Link
                      className="ml-1 font-bold text-primary underline"
                      href="/user/change-voucher"
                    >
                      Đổi ngay
                    </Link>
                  </div>
                </div>
              )}
              {voucher?.vouchers.map((voucher) => (
                <div
                  key={voucher.voucherId._id}
                  className={`flex min-h-[140px] cursor-pointer`}
                  {...(voucher.voucherId.voucherType !==
                    "SHIPPING_DISCOUNT" && {
                    onClick: () =>
                      handleSelectedVoucher(
                        voucher.voucherId._id,
                        voucher.voucherId.voucherType,
                        voucher.voucherId.voucherType === "ON_ORDER_SAVINGS"
                          ? voucher.voucherId.salePercent
                          : voucher.voucherId.flatDiscountAmount,
                      ),
                  })}
                >
                  <div
                    className={`flex w-1/2 max-w-[130px] flex-col items-center justify-center rounded-l-[5px] ${
                      voucher.voucherId.voucherType === "SHIPPING_DISCOUNT"
                        ? "bg-gray-500"
                        : "bg-primary"
                    } text-white`}
                  >
                    <Icon
                      className="mb-1"
                      icon="mdi:voucher-outline"
                      width="24"
                      height="24"
                    />
                    Giảm{" "}
                    {voucher.voucherId.voucherType === "FLAT_DISCOUNT" &&
                      formatDiscount(voucher.voucherId.flatDiscountAmount)}
                    {voucher.voucherId.voucherType === "ON_ORDER_SAVINGS" &&
                      voucher.voucherId.salePercent + "%"}
                    {voucher.voucherId.voucherType === "SHIPPING_DISCOUNT" &&
                      voucher.voucherId.shippingDiscountAmount + "%"}
                  </div>
                  <div
                    className={`flex flex-grow flex-col justify-center rounded-r-[5px] border ${
                      voucher.voucherId.voucherType === "SHIPPING_DISCOUNT"
                        ? "border-gray-500"
                        : "border-primary"
                    } p-4`}
                  >
                    <div className="flex items-center">
                      <div>
                        <p className="text-[14px] font-medium">
                          {voucher.voucherId.voucherDescription}
                        </p>
                        <div
                          className={`my-2 w-fit rounded-[12px] border ${
                            voucher.voucherId.voucherType ===
                            "SHIPPING_DISCOUNT"
                              ? "border-gray-500 text-gray-500"
                              : "border-primary text-primary"
                          } px-2 py-1 text-[12px]`}
                        >
                          {voucher.expirationDate && "Ưu đãi có hạn"}
                        </div>
                        <p
                          className={`text-[12px] ${voucher.voucherId.voucherType === "SHIPPING_DISCOUNT" ? "text-gray-500" : "text-primary"}`}
                        >
                          Hết hạn vào:{" "}
                          {formatDate((voucher as any).expirationDate)}
                        </p>
                        <p
                          className={`text-[12px] ${voucher.voucherId.voucherType === "SHIPPING_DISCOUNT" ? "text-gray-500" : "hidden"}`}
                        >
                          Chỉ áp dụng cho mua hàng
                        </p>
                      </div>
                      <div className="svg-container ml-auto">
                        <div
                          className={`rounded-full border ${
                            voucher.voucherId.voucherType ===
                            "SHIPPING_DISCOUNT"
                              ? "border-gray-400" // Màu viền xám cho SHIPPING_DISCOUNT
                              : selectedVoucher === voucher.voucherId._id
                                ? "border-transparent"
                                : "border-primary"
                          }`}
                        >
                          <svg
                            className="ft-green-tick size-6"
                            xmlns="http://www.w3.org/2000/svg"
                            height="100"
                            width="100"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <circle
                              className={`origin-center transition-all duration-300 ${
                                selectedVoucher === voucher.voucherId._id
                                  ? "scale-100"
                                  : "scale-0"
                              }`}
                              fill="#ef4444"
                              cx="24"
                              cy="24"
                              r="22"
                            />
                            <path
                              strokeDasharray={30}
                              strokeDashoffset={
                                selectedVoucher === voucher.voucherId._id
                                  ? 0
                                  : -30
                              }
                              className="transition-all delay-300 duration-300"
                              fill="none"
                              stroke="#fff"
                              stroke-width="4"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-miterlimit="6"
                              d="M14 27l5.917 4.917L34 17"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={handleApplyVoucher}
                className="w-full rounded-full bg-primary text-white"
              >
                Áp dụng
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
