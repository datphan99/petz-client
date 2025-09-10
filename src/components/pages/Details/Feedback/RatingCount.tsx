import { Icon } from "@iconify/react/dist/iconify.js";

export default function RatingCount({
  totalReview,
  highRatingsCount,
}: {
  totalReview?: any;
  highRatingsCount?: any;
}) {
  return (
    <div className="flex flex-col">
      <h4>Tổng lượt đánh giá</h4>
      <div className="mt-auto">
        <div className="flex items-center gap-2">
          <h3 className="text-h2 font-bold">60</h3>
          <div className="flex items-center gap-0.5 rounded-[20px] bg-primary px-4 py-1 text-[12px] text-white">
            <Icon icon="bxs:smile" />
            75% tỉ lệ hài lòng
          </div>
        </div>
        <p className="mt-4 text-[14px] text-gray-500">
          Đánh giá của khách hàng dành cho sản phẩm này
        </p>
      </div>
    </div>
  );
}
