/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import {
  useCreateBookingMutation,
  useCreateBookingMomoMutation,
} from "@/libs/features/services/booking";
import { useSession } from "next-auth/react";
import { errorModal, successModal, warningModal } from "@/utils/callModalANTD";
import { animatePageOut } from "@/utils/animation";

interface errorsValues {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  selectedServices: string;
  bookingDate: string;
  bookingHours: string;
}

export default function useBookingForm() {
  const router = useRouter();
  const [createBooking, { data, error: createBookingError }] =
    useCreateBookingMutation();

  const [createBookingMomo, { data: momoData, error: momoError, isLoading }] =
    useCreateBookingMomoMutation();
  const [isModalDisplay, setIsModalDisplay] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const session = useSession();

  const formik = useFormik({
    initialValues: {
      customerName: "",
      customerPhone: session?.data?.user.userPhone || "",
      customerEmail: session?.data?.user.userEmail || "",
      selectedServices: {},
      bookingDate: "",
      bookingHours: "",
      voucherId: "",
      discountAmount: 0,
      voucherType: "",
      voucherDiscount: 0,
      paymentMethod: "COD",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      setIsConfirm(true);
    },
    validate: (values) => {
      let errors: Partial<errorsValues> = {};
      const hasSelectedService =
        Object.keys(values.selectedServices).length > 0;

      const phoneRegex = /^[0-9]{10}$/;

      if (!values.customerName) {
        errors.customerName = "Vui lòng nhập tên ";
      }

      if (!values.customerPhone) {
        errors.customerPhone = "Vui lòng nhập thông tin liên hệ";
      }

      if (!phoneRegex.test(values.customerPhone)) {
        errors.customerPhone = "Vui lòng số điện thoại hợp lệ";
      }

      if (!values.customerEmail) {
        errors.customerEmail = "Vui lòng nhập Email";
      }

      if (!hasSelectedService) {
        errors.selectedServices = "Vui lòng chọn ít nhất 1 dịch vụ";
      }

      if (!values.bookingDate) {
        errors.bookingDate = "Vui lòng chọn ngày";
      }

      if (!values.bookingHours) {
        errors.bookingHours = "Vui lòng chọn giờ đặt lịch ";
      }

      return errors;
    },
  });

  const totalPrice = Object.values(formik.values.selectedServices).reduce(
    (total, service: any) => total + service.servicePrice,
    0,
  ) as number;

  useEffect(() => {
    if (data) {
      successModal({ content: `${data?.message},quay lại trang chủ sau 3s` });
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
    if (createBookingError) {
      errorModal({ content: (createBookingError as any)?.data.message });
    }
  }, [data, createBookingError]);

  useEffect(() => {
    if (momoData) {
      router.push(momoData?.payUrl);
    }
    if (momoError) {
      console.log(momoError);
      errorModal({ content: (createBookingError as any)?.data.message });
    }
  }, [momoData, momoError]);

  async function handleCreateBooking() {
    if (session.data?.user._id == null) {
      return warningModal({
        content: (
          <div className="flex gap-2">
            <p>Bạn phải đăng nhập mới có thể đặt lịch.</p>
            <div
              onClick={() => {
                animatePageOut("/auth", router);
              }}
              className="cursor-pointer text-blue-500"
            >
              Đăng nhập.
            </div>
          </div>
        ),
        duration: 2,
      });
    }

    const bookingObject = {
      userId: session.data?.user._id || null,
      ...formik.values,
      totalPrice: totalPrice,
      totalAfterDiscount: totalPrice - formik.values.discountAmount,
    };

    if (formik.values.paymentMethod == "COD") {
      createBooking(bookingObject);
      setIsConfirm(false);
    } else {
      createBookingMomo(bookingObject);
      setIsConfirm(false);
    }
  }

  function handleCancelConfirm() {
    setIsConfirm(false);
  }

  return {
    formik,
    isModalDisplay,
    isConfirm,
    handleCreateBooking,
    handleCancelConfirm,
    totalPrice,
  };
}
