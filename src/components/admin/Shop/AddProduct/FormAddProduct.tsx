/* eslint-disable @next/next/no-img-element */
"use client";
import FormAddProductType from "./FormAddProductType";
import useAddProductForm from "./_hook/useAddProductForm";
import { useGetCategoriesQuery } from "@/libs/features/services/categories";
import FormAddProductThumbnail from "./ProductImage/FormAddProductThumbnail";
import GerneralInformation from "./GerneralInfor/GerneralInformation";
import { Icon } from "@iconify/react/dist/iconify.js";
import NormalTransitionLink from "@/components/ui/NormalTransitionLink";
import { Button, Input } from "@nextui-org/react";

export default function FormAddProduct() {
  const { data: categories } = useGetCategoriesQuery("");

  const { formik, duplicatedMessage } = useAddProductForm();

  function handleButtonSubmit() {
    formik.handleSubmit();
  }

  return (
    <>
      <div className="mb-2 flex justify-between text-xl">
        <NormalTransitionLink
          className="flex items-center gap-1 dark:text-white"
          href="/admin/shop"
        >
          <Icon icon="gravity-ui:arrow-left" />
          Quay về
        </NormalTransitionLink>

        <Button variant="flat" onClick={handleButtonSubmit} className="">
          Thêm sản phẩm
        </Button>
      </div>
      <form encType="multipart/form-data">
        <div className="flex gap-8">
          <FormAddProductThumbnail formik={formik} />
          <div className="w-3/4">
            <GerneralInformation
              formik={formik}
              duplicatedMessage={duplicatedMessage}
            />

            <div className="mt-4 flex gap-4">
              <div className="w-full space-y-4 rounded-lg bg-gray-50 p-4">
                <Input
                  onChange={formik.handleChange}
                  name="salePercent"
                  type="number"
                  label="Nhập phần trăm giảm"
                  value={formik.values.salePercent as any}
                  className="w-full focus:outline-none"
                  max={100}
                  onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                    e.currentTarget.blur()
                  }
                />
                <FormAddProductType
                  visitedInput={formik.touched.productCategory}
                  errorMessage={formik.errors.productCategory}
                  onChangeEvent={formik.handleChange}
                  defaultText="Chọn danh mục"
                  inputName="productCategory"
                  optionValues={(categories as any)?.map((data: any) => (
                    <option key={data._id} value={data._id}>
                      {data.categoryName}
                    </option>
                  ))}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
