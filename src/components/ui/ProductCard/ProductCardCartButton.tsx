import { Product } from "@/types/Product";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useAddItemToCartMutation } from "@/libs/features/services/cart";
import { useEffect } from "react";
import { message } from "antd";
import { animatePageOut } from "@/utils/animation";
import { useRouter } from "next/navigation";
import { errorModal } from "@/utils/callModalANTD";
import { cartAction } from "@/libs/features/cart/cart";
interface ProductCardSelectWeightProps {
  Product: Product;
}

export default function ProductCardCartButton({
  Product,
}: ProductCardSelectWeightProps) {
  const dispatch = useDispatch();
  const session = useSession();
  const { update: sessionUpdate } = useSession();
  const [messageApi, contextHolder] = message.useMessage();
  const authStatus = session?.status;

  const [addToCart, { data: newCart }] = useAddItemToCartMutation();
  const router = useRouter();
  const success = () => {
    message.success({
      content: (
        <div className="flex gap-2">
          Thêm giỏ hàng thành công.{" "}
          <div
            onClick={() => {
              animatePageOut("/cart", router);
            }}
            className="cursor-pointer text-blue-500"
          >
            Xem ngay
          </div>
        </div>
      ),
      duration: 1,
      className: "custom-message",
    });
  };

  const errorModal = () => {
    message.error({
      content: (
        <div className="flex gap-2">
          Bạn cần đăng nhập để thêm vào giỏ hàng.{" "}
          <div
            onClick={() => {
              animatePageOut("/auth", router);
            }}
            className="cursor-pointer text-blue-500"
          >
            Đăng nhập
          </div>
        </div>
      ),
      duration: 1,
      className: "custom-message", // Optionally for further styling if needed
    });
  };

  function handleAddToCart() {
    const cartItem = {
      productId: Product._id,
      productName: Product.productName,
      productOption: Product.productOption[0].name,
      productPrice: Product.productOption[0].productPrice,
      productQuantity: 1,
      salePercent: Product.salePercent,
      productImage: Product.productThumbnail,
      productSlug: Product.productSlug,
      cartId: session.data?.user?.userCart?._id || null,
    };

    if (authStatus === "authenticated") {
      addToCart(cartItem);
      success();
    }

    if (authStatus === "unauthenticated") {
      dispatch(cartAction.addToCart(cartItem));
      success();
    }
  }

  useEffect(() => {
    if (newCart) {
      sessionUpdate({
        ...session,
        user: {
          ...session?.data?.user,
          userCart: newCart,
        },
      });
    }
  }, [newCart]);

  return (
    <div className="group absolute right-2 top-1 text-white lg:right-2 lg:top-2 2xl:right-6">
      <button
        onClick={handleAddToCart}
        className="w-fit rounded-full bg-white p-1 text-black transition delay-75 duration-300 group-hover:bg-gray-100 md:p-3 lg:p-3"
      >
        <Icon className="size-4 lg:size-5" icon="icon-park-outline:mall-bag" />
      </button>
      {contextHolder}
    </div>
  );
}
