"use client";
import React, { useEffect } from "react";
import { useGetProductsQuery } from "@/libs/features/services/product";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import "./index.css";
import SuggestedProducts from "@/components/pages/Details/SuggestedProducts";
import { useAddItemToCartMutation } from "@/libs/features/services/cart";
import { useSession } from "next-auth/react";
import { message } from "antd";
import { animatePageOut } from "@/utils/animation";
import { Icon } from "@iconify/react/dist/iconify.js";
import NormalTransitionLink from "@/components/ui/NormalTransitionLink";
import { useDispatch } from "react-redux";
import { cartAction } from "@/libs/features/cart/cart";
export const Index = () => {
  const { slug } = useParams();
  const [addToCart, { data: newCart }] = useAddItemToCartMutation();
  const productSlug = Array.isArray(slug) ? slug[0] : slug;
  const { data, error, isLoading } = useGetProductsQuery({ productSlug });
  const [quantity, setQuantity] = useState(1);
  const [index, setIndex] = useState(0);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [option, setOption] = useState("");
  const session = useSession();
  const { update: sessionUpdate } = useSession();
  const userId = session.data?.user?._id;
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    document.body.classList.remove("dark");

    return () => {
      document.body.classList.remove("dark");
    };
  }, []);

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

  const handleQuantity = (action: string) => {
    if (action === "increase") {
      if (quantity < maxQuantity) {
        setQuantity(quantity + 1);
      }
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
  };

  const dispatch = useDispatch();

  const formatCurrency = (amount: any) => {
    return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ`;
  };
  const handleAddToCart = (
    name: string,
    id: string,
    price: number,
    salePercent: number,
  ) => {
    const cart_obj = {
      productName: name,
      productId: id,
      productPrice: price,
      salePercent: salePercent,
      productQuantity: quantity,
      productOption: option
        ? option
        : data?.products[0]?.productOption[0]?.name,
      productImage: data?.products[0]?.productThumbnail,
      cartId: session.data?.user?.userCart?._id || null,
      userId: userId || null,
    };
    if (userId) {
      addToCart(cart_obj);
      success();
    } else {
      dispatch(cartAction.addToCart(cart_obj));
      success();
    }
  };

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
    <div className="bg-[#F4F2EE] px-[20px] py-[110px]">
      {data?.products?.map((item, i) => {
        const salePrice =
          Math.ceil(
            (item?.productOption[index]?.productPrice *
              (1 - item.salePercent / 100)) /
              1000,
          ) * 1000;

        return (
          <div key={i}>
            <NormalTransitionLink href="./" className="flex font-bold">
              <Icon icon="ic:round-chevron-left" width="24" height="24" />
              Quay về
            </NormalTransitionLink>
            <div className="flex flex-col justify-between xl:flex-row xl:items-center">
              <div className="w-full lg:w-[36%]">
                <div className="flex flex-row items-center justify-between gap-[20px]">
                  <h1 className="text-[20px] font-black leading-[40px] lg:text-[32px]">
                    {item.productName}
                  </h1>
                  {item.salePercent > 0 && (
                    <span className="rounded-full bg-black px-[15px] py-[4px] text-[14px] font-[500] text-white">
                      -{item.salePercent}%
                    </span>
                  )}
                </div>
                <div className="mt-[50px] hidden w-full flex-row items-center justify-between rounded-[25px] bg-primary px-12 py-2 text-white lg:w-[350px] xl:flex">
                  <div className="flex flex-row items-center gap-[5px]">
                    <button onClick={() => handleQuantity("decrease")}>
                      -
                    </button>
                    <span className="ml-[10px] inline-block w-[20px]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => {
                        handleQuantity("increase");
                        setMaxQuantity(
                          item?.productOption[index]?.productQuantity,
                        );
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div className="flex flex-row gap-[7px]">
                    <p>{formatCurrency(salePrice)}</p>
                    {item?.salePercent > 0 && (
                      <del className="text-[15px] text-gray-400">
                        {formatCurrency(
                          item?.productOption[index]?.productPrice,
                        )}
                      </del>
                    )}
                  </div>
                  <div>
                    {item?.productOption[index]?.productQuantity === 0 ? (
                      <button className="text-[14px] font-[500] text-primary">
                        OUT OF STOCK
                      </button>
                    ) : (
                      <button
                        className="cursor-pointer text-[14px] font-[500] tracking-[0.5px]"
                        onClick={() =>
                          handleAddToCart(
                            item.productName,
                            item._id,
                            item?.productOption[index]?.productPrice,
                            item.salePercent,
                          )
                        }
                      >
                        Thêm vào giỏ
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-center xl:block xl:w-[38%]">
                <Image
                  unoptimized
                  src={item.productThumbnail}
                  width="500"
                  height="400"
                  alt=""
                />
              </div>
              <div className="mx-auto mb-8 mt-[50px] flex w-full flex-row items-center justify-between rounded-[25px] bg-primary px-12 py-2 text-white lg:w-[450px] xl:hidden">
                <div className="flex flex-row items-center gap-[5px]">
                  <button onClick={() => handleQuantity("decrease")}>-</button>
                  <span className="ml-[10px] inline-block w-[20px]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => {
                      handleQuantity("increase");
                      setMaxQuantity(
                        item?.productOption[index]?.productQuantity,
                      );
                    }}
                  >
                    +
                  </button>
                </div>
                <div className="flex flex-row gap-[7px]">
                  <p>{formatCurrency(salePrice)}</p>
                  {item?.salePercent > 0 && (
                    <del className="text-[15px] text-gray-400">
                      {formatCurrency(item?.productOption[index]?.productPrice)}
                    </del>
                  )}
                </div>
                <div>
                  {item?.productOption[index]?.productQuantity === 0 ? (
                    <button className="text-[14px] font-[500] text-primary">
                      OUT OF STOCK
                    </button>
                  ) : (
                    <button
                      className="cursor-pointer text-[14px] font-[500] tracking-[0.5px]"
                      onClick={() =>
                        handleAddToCart(
                          item.productName,
                          item._id,
                          item?.productOption[index]?.productPrice,
                          item.salePercent,
                        )
                      }
                    >
                      Thêm vào giỏ
                    </button>
                  )}
                </div>
              </div>
              <div className="mb-8 flex flex-row gap-4 xl:w-[350px]">
                <p className="font-bold">Mô tả:</p>
                <div className="text-sm">{item?.productDescription}</div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-[10px] lg:flex-row">
              <div className="w-full lg:w-[35%]">
                <h1 className="mb-[30px] text-[28px] font-[600]">BỘ SƯU TẬP</h1>
                <div className="flex flex-wrap gap-[10px]">
                  {item?.productImages.map((img, i) => {
                    return (
                      <Image
                        unoptimized
                        src={img}
                        width={150}
                        height={300}
                        alt=""
                        key={i}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="my-8 w-full text-[14px] lg:w-[30%]">
                Thức ăn cho mèo giàu chất dinh dưỡng là sản phẩm lý tưởng giúp
                chăm sóc sức khỏe và sự phát triển toàn diện của mèo cưng. Được
                chế biến từ các thành phần tự nhiên chất lượng cao, sản phẩm này
                cung cấp nguồn dinh dưỡng phong phú, đáp ứng nhu cầu của mèo ở
                mọi lứa tuổi.
                <br />
                <strong>Thành phần</strong>: Thức ăn chứa protein từ thịt gà, cá
                và các nguồn thực phẩm khác, giúp xây dựng và duy trì cơ bắp.
                Ngoài ra, sản phẩm còn bổ sung chất béo lành mạnh, vitamin A, D,
                E và khoáng chất như canxi, phốt pho để tăng cường hệ miễn dịch
                và hỗ trợ sức khỏe xương khớp. Các axit béo omega-3 và omega-6
                trong công thức giúp cải thiện tình trạng da và lông, mang đến
                bộ lông bóng mượt.
                <br />
                Với thức ăn cho mèo giàu chất dinh dưỡng, bạn có thể yên tâm
                mang lại cho thú cưng một chế độ ăn uống lành mạnh, góp phần kéo
                dài tuổi thọ và cải thiện chất lượng cuộc sống của chúng. Hãy
                chọn sản phẩm này để chăm sóc sức khỏe cho mèo yêu của bạn!
              </div>
              <div className="hidden w-[35%] md:block">
                <Image
                  unoptimized
                  src={item.productThumbnail}
                  width="500"
                  height="400"
                  alt=""
                />
              </div>
            </div>
          </div>
        );
      })}
      <div id="this-zone">
        <h1 className="mt-8 text-[28px] font-[500]">SẢN PHẨM GỢI Ý</h1>
        <div>
          <div>
            <SuggestedProducts
              categoryId={data?.products[0]?.productCategory || ""}
            />
          </div>
        </div>
      </div>
      {contextHolder}
    </div>
  );
};
