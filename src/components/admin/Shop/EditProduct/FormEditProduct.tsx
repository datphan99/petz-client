/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect } from "react";
import FormEditProductType from "./FormEditProductType";
import useAddProductForm from "./_hook/useEditProductForm";
import { useLazyGetSubCategoriesQuery } from "@/libs/features/services/subcategories";
import { useGetCategoriesQuery } from "@/libs/features/services/categories";
import FormEditProductThumnail from "./ProductImage/FormEditProductThumbnail";
import GerneralInformation from "./GerneralInfor/GerneralInformation";
import { Icon } from "@iconify/react/dist/iconify.js";
import NormalTransitionLink from "@/components/ui/NormalTransitionLink";
import { Button, Input } from "@nextui-org/react";

interface FormEditProductProps {
  slug: string;
}

export default function FormEditProduct({ slug }: FormEditProductProps) {
  const { data: categories } = useGetCategoriesQuery("");

  const { formik, duplicatedMessage, productOption } = useAddProductForm({
    slug,
  });

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

        <Button type="submit" onClick={handleButtonSubmit} variant="flat">
          Lưu
        </Button>
      </div>
      <form encType="multipart/form-data">
        <div className="flex gap-8">
          <FormEditProductThumnail formik={formik} />
          <div className="w-3/4">
            <GerneralInformation
              productOption={productOption}
              formik={formik}
              duplicatedMessage={duplicatedMessage}
            />

            <div className="mt-4 flex gap-4">
              <div className="w-full space-y-4 rounded-lg bg-gray-50 p-4">
                <Input
                  onChange={formik.handleChange}
                  name="salePercent"
                  type="number"
                  label="Nhập phần trăm giảm giá"
                  value={formik.values.salePercent as any}
                  className="w-full focus:outline-none"
                  errorMessage={formik.errors.salePercent}
                  isInvalid={!!formik.errors.salePercent}
                  max={100}
                  onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                    e.currentTarget.blur()
                  }
                />
                <FormEditProductType
                  visitedInput={formik.touched.productCategory}
                  errorMessage={formik.errors.productCategory}
                  defaultValue={formik.values.productCategory}
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
