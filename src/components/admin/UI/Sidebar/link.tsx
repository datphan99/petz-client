import { Icon } from "@iconify/react/dist/iconify.js";

export const links = [
  {
    url: "/admin/dashboard",
    icon: <Icon className="size-6" icon="mage:dashboard" />,
    label: "Bảng điều khiển",
  },
  {
    url: "/admin/shop",
    icon: <Icon className="size-6" icon="iconoir:shop" />,
    label: "Sản phẩm",
  },
  {
    url: "/admin/category",
    icon: <Icon icon="mdi:category-outline" className="size-6" />,
    label: "Danh mục",
  },
  {
    url: "/admin/voucher",
    icon: <Icon className="size-6" icon="mdi:voucher-outline" />,
    label: "Voucher",
  },
  {
    url: "/admin/services",
    icon: <Icon className="size-6" icon="material-symbols:self-care" />,
    label: "Dịch vụ",
  },

  {
    url: "/admin/bookings",
    icon: <Icon className="size-6" icon="uil:schedule" />,
    label: "Lịch đặt",
  },
  {
    url: "/admin/users",
    icon: <Icon className="size-6" icon="quill:user-sad" />,
    label: "Người dùng",
  },
  {
    url: "/admin/staff",
    icon: <Icon className="size-6" icon="icon-park-outline:file-staff" />,
    label: "Nhân viên",
  },
  {
    url: "/admin/orders",
    icon: <Icon className="size-6" icon="iconamoon:box-light" />,
    label: "Đơn hàng",
  },
];
