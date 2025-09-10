import Logo from "@/components/ui/Header/Logo";
import formatMoney from "@/utils/formatMoney";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  RadioGroup,
  Radio,
  Button,
} from "@nextui-org/react";
import ConfirmBooking from "./Modal/ConfirmBooking";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import VoucherModal from "./Modal/VoucherModal";
import formatDiscount from "@/utils/formatDiscount";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import Image from "next/image";

interface BookingDetailProps {
  formik: any;
  isConfirm: boolean;
  handleCreateBooking: () => void;
  handleCancelConfirm: () => void;
  totalPrice: number;
}

export default function BookingDetail({
  formik,
  isConfirm,
  handleCreateBooking,
  handleCancelConfirm,
  totalPrice,
}: BookingDetailProps) {
  const [isSelectVoucher, setIsSelectVoucher] = useState<boolean>(false);
  const servicesArray = Object.values(formik.values.selectedServices);
  const discountAmount = formik.values.discountAmount;
  const selectedVoucherType = formik.values.voucherType;
  const selectedVoucherDiscount = formik.values.voucherDiscount;
  const selectedPaymentMethod = formik.values.paymentMethod;

  function handleSelectVoucher() {
    setIsSelectVoucher((prevState) => !prevState);
  }

  function calculateDiscount(totalPrice: any, voucherType: any, discount: any) {
    if (voucherType === "ON_ORDER_SAVINGS") {
      return (totalPrice * discount) / 100;
    }
    return discount;
  }

  function handleChangePaymentMethod(paymentMethod: string) {
    formik.setFieldValue("paymentMethod", paymentMethod);
  }

  useEffect(() => {
    const updatedDiscount = calculateDiscount(
      totalPrice,
      selectedVoucherType,
      selectedVoucherDiscount,
    );

    formik.setFieldValue("discountAmount", updatedDiscount);
  }, [totalPrice, selectedVoucherType, selectedVoucherDiscount]);

  return (
    <div className="relative px-4 pb-8 xl:w-1/2">
      <div className="absolute right-0 top-0 h-full w-[1px] rounded-[10px] bg-gray-200" />

      <div className="relative mb-4">
        <div className="absolute right-0 top-0 h-[1px] w-screen rounded-[10px] bg-gray-200" />
        <div className="absolute bottom-0 right-0 h-[1px] w-screen rounded-[10px] bg-gray-200" />
        <h1 className="text-h1 font-semibold uppercase">Chi tiết</h1>
      </div>

      <div className="px-4">
        <Card className="w-full px-4 py-2" shadow="sm">
          <CardHeader className="flex gap-3">
            <Logo />
            <div className="flex flex-col">
              <p className="text-md">{formik.values.customerName}</p>
              <p className="text-small text-default-500">
                {formik.values.customerPhone}
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>
              <span className="font-bold">Giờ:</span>{" "}
              {formik.values.bookingHours || "Chưa chọn giờ"}
            </p>
            <p className="my-2">
              <span className="font-bold">Ngày:</span>{" "}
              {formik.values.bookingDate
                ? formik.values.bookingDate.split("T")[0]
                : "Chưa chọn ngày"}
            </p>
            <table className="mt-2 w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left">Dịch vụ</th>
                  <th className="text-right">Thời gian - Giá tiền</th>
                </tr>
              </thead>
              <tbody>
                {servicesArray.length === 0 && (
                  <tr>
                    <td className="py-2 text-[14px] text-gray-900">
                      Chưa chọn dịch vụ
                    </td>
                  </tr>
                )}
                {servicesArray.map((service: any) => (
                  <tr
                    key={service.serviceId}
                    className="border-b border-[#e5e7eb] text-[14px]"
                  >
                    <td className="py-2 text-gray-900">
                      {service.serviceName}
                    </td>
                    <td className="space-x-1 py-2 text-right text-[#4a4a4a]">
                      <span> {service.serviceDuration} phút </span>
                      <span>-</span>
                      <span>{formatMoney(service.servicePrice)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="mt-1 w-full border-collapse text-[14px]">
              <tbody>
                <tr>
                  <th className="text-left text-[#4a4a4a]">Tổng dịch vụ:</th>
                  <th className="text-right text-[#4a4a4a]">
                    {formatMoney(totalPrice)}
                  </th>
                </tr>
                {discountAmount > 0 && (
                  <tr>
                    <th className="text-left text-[#4a4a4a]">Mã khuyến mãi:</th>
                    <th className="text-right text-[#4a4a4a]">
                      -{formatMoney(discountAmount)}
                    </th>
                  </tr>
                )}

                <tr>
                  <th className="text-left text-[#4a4a4a]">Tổng cộng:</th>
                  <th className="text-right text-[#4a4a4a]">
                    {formatMoney(totalPrice - discountAmount)}
                  </th>
                </tr>
              </tbody>
            </table>
            <button
              onClick={handleSelectVoucher}
              className="group mt-4 flex items-center justify-between border-y py-2 text-[14px]"
            >
              <div className="flex items-center gap-1">
                <Icon icon="mdi:voucher-outline" width="24" height="24" />
                <span>Thêm voucher</span>
              </div>

              <div className="flex items-center">
                <span>Chọn voucher</span>
                <Icon
                  className="transition duration-300 group-hover:translate-x-1"
                  icon="ic:round-chevron-right"
                  width="24"
                  height="24"
                />
              </div>
            </button>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleChangePaymentMethod("COD")}
                className={`w-1/2 rounded-full border transition duration-300 ${selectedPaymentMethod == "COD" ? "border-primary" : "border-gray-300"} py-2`}
              >
                Tiền mặt
              </button>
              <button
                onClick={() => handleChangePaymentMethod("BANKING")}
                className={`w-1/2 rounded-full border transition duration-300 ${selectedPaymentMethod == "BANKING" ? "border-primary" : "border-gray-300"} py-2`}
              >
                <p>Ví momo</p>
              </button>
            </div>
          </CardBody>
          <Divider />
          <CardFooter>
            <button
              type="button"
              onClick={formik.handleSubmit}
              className="w-full rounded-full bg-primary py-2 font-bold text-white"
            >
              Đặt lịch ngay
            </button>
          </CardFooter>
        </Card>
      </div>
      {isConfirm && (
        <ConfirmBooking
          isDialogOpen={isConfirm}
          handleCloseDialog={handleCancelConfirm}
          formik={formik}
          handleCreateBooking={handleCreateBooking}
        />
      )}
      {isSelectVoucher && (
        <VoucherModal
          isDialogOpen={isSelectVoucher}
          handleCloseDialog={handleSelectVoucher}
          formik={formik}
          totalPrice={totalPrice}
        />
      )}
    </div>
  );
}
