import { FormikProps } from "formik";
import FormEditProductTagInput from "./FormEditProductTagInput";
import { Input, Textarea } from "@nextui-org/react";

interface GerneralInformationProps {
  duplicatedMessage?: string;
  formik: FormikProps<any>;
  productOption: any;
}

export default function GerneralInformation({
  formik,
  duplicatedMessage,
  productOption,
}: GerneralInformationProps) {
  return (
    <div className="rounded-lg bg-gray-50 px-4 py-8">
      <h1 className="mb-4 text-xl font-bold">Thông tin sản phẩm</h1>

      <div className="mb-4">
        <p className="mb-1 font-[500]">Tên sản phẩm</p>
        <p className="text-sm text-red-500">
          {formik.touched.productName &&
          typeof formik.errors.productName === "string"
            ? formik.errors.productName
            : undefined}
        </p>
        <p className="text-sm text-red-500">{duplicatedMessage}</p>
        <Input
          className="mt-1 w-full rounded-md focus:outline-none"
          label="Tên sản phẩm"
          type="text"
          value={formik.values.productName}
          onBlur={formik.handleBlur}
          name="productName"
          onChange={formik.handleChange}
        />
      </div>

      <div className="mb-4">
        <p className="mb-1 font-[500]">Mô tả sản phẩm</p>
        <Textarea
          onChange={formik.handleChange}
          rows={5}
          value={formik.values.productDescription}
          label="Nhập mô tả sản phẩm"
          name="productDescription"
          id="productDescription"
          className="focus w-full rounded-lg focus:outline-none"
        />
      </div>

      <div>
        <p className="mb-1 font-[500]">Tùy chọn sản phẩm</p>
        <FormEditProductTagInput
          productOption={productOption}
          errorMessage={
            typeof formik.errors.productOption === "string"
              ? formik.errors.productOption
              : undefined
          }
          inputName="productOption"
          formik={formik}
          inputPlaceHolder="Nhập và nhấn Enter để thêm tag"
        />
      </div>
    </div>
  );
}
