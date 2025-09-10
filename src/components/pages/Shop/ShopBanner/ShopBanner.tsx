import Image from "next/image";
import ShopImage from "@@/assets/images/shop-image.jpeg";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
export default function ShopBanner() {
  return (
    <div className="flex">
      <div className="flex w-full items-center rounded-[20px] bg-[#fcd600] p-8 text-black lg:w-1/2 lg:rounded-l-[20px] lg:bg-[#f4f2ee]">
        <div>
          <div className="flex text-[14px]">
            <Link className="font-bold" href="/">
              Trang chủ
            </Link>
            <Icon icon="si:chevron-right-fill" width="24" height="24" />
            <p>Cửa hàng</p>
          </div>
          <h2 className="bottom-0 my-4 max-w-[300px] text-h2 font-bold">
            Tất cả sản phẩm cho mèo cưng của bạn
          </h2>
          <p>
            Khám phá phụ kiện, thức ăn, và đồ chơi hoàn hảo cho thú cưng của
            bạn.
          </p>
        </div>
      </div>
      <div className="hidden h-[350px] w-1/2 rounded-r-[20px] lg:block">
        <Image
          src={ShopImage}
          className="h-full w-full rounded-r-[20px] object-cover object-[100%_75%]"
          alt="Shop Image"
        />
      </div>
    </div>
  );
}
