import FeedbackItem from "./FeedbackItem";
import FeedbackStat from "./FeedbackStat";
import dummyFeedback from "./dummyFeedback";

export default function Feedback({
  productId,
  totalReview,
  reviewCount,
}: {
  productId: string;
  totalReview: any;
  reviewCount: any;
}) {
  return (
    <section className="mt-[100px]">
      <h2 className="sticky top-4 text-h2 font-bold">Đánh giá</h2>
      <div className="mt-6 flex gap-24">
        <FeedbackStat />
        <div>
          {dummyFeedback.map((review: any) => (
            <FeedbackItem review={review} key={review._id} />
          ))}
        </div>
      </div>
    </section>
  );
}
