"use client";

import RatingBar from "./RatingBar";
import RatingCount from "./RatingCount";
import RatingAvg from "./RatingAvg";

export default function FeedbackStat({
  reviews,
  totalReview,
  reviewCount,
}: {
  reviews?: any;
  totalReview?: any;
  reviewCount?: any;
}) {
  return (
    <div>
      <div className="sticky top-24 flex gap-8">
        <RatingCount />
        <div className="w-0.5 rounded-full bg-gray-300 opacity-50" />
        <RatingAvg />
        <div className="w-0.5 rounded-full bg-gray-300 opacity-50" />
        <div className="flex flex-col">
          <RatingBar star={5} totalRating={32} />
          <RatingBar star={4} totalRating={23} />
          <RatingBar star={3} totalRating={13} />
          <RatingBar star={2} totalRating={4} />
          <RatingBar star={1} totalRating={2} />
        </div>
      </div>
    </div>
  );
}
