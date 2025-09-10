"use client";

import useBookingForm from "./_hook/useBookingForm";
import BookingForm from "./BookingForm";
import BookingDetail from "./BookingDetail";

export default function Booking() {
  const {
    totalPrice,
    formik,
    isModalDisplay,
    isConfirm,
    handleCreateBooking,
    handleCancelConfirm,
  } = useBookingForm();

  return (
    <section className="mt-20">
      <div className="container">
        <h1 className="text-[72px] font-bold uppercase">Đặt lịch spa</h1>
        <div className="xl:flex">
          <BookingForm isModalDisplay={isModalDisplay} formik={formik} />
          <BookingDetail
            totalPrice={totalPrice}
            handleCancelConfirm={handleCancelConfirm}
            isConfirm={isConfirm}
            handleCreateBooking={handleCreateBooking}
            formik={formik}
          />
        </div>
      </div>
    </section>
  );
}
