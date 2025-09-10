import { errorModal } from "@/utils/callModalANTD";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "@nextui-org/react";
import { FormikProps } from "formik";
import React, { useState } from "react";

interface FormAddProductTagInputProps {
  inputPlaceHolder: string;
  inputName: string;
  errorMessage?: string;
  formik: FormikProps<any>;
  className?: string;
  productOption: any;
}

export default function FormEditProductTagInput({
  inputPlaceHolder,
  inputName,
  errorMessage,
  formik,
  className = "",
  productOption,
}: FormAddProductTagInputProps) {
  const [tagInput, setTagInput] = useState("");
  const [duplicateError, setDuplicateError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
    setDuplicateError(null);
  };

  function formatNumberWithDots(value: number | string): string {
    const stringValue = String(value).replace(/\D/g, ""); // Loại bỏ ký tự không phải số
    if (!stringValue) return "";
    return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();

      if (Array.isArray(formik.values[inputName])) {
        if (
          formik.values[inputName].some(
            (option: any) => option.name === tagInput.trim(),
          )
        ) {
          setDuplicateError("Tag already exists!");
        } else {
          formik.setFieldValue(inputName, [
            ...formik.values[inputName],
            { name: tagInput.trim(), productPrice: "", productQuantity: "" },
          ]);
          setTagInput("");
        }
      } else {
        setDuplicateError("Invalid form input");
      }
    }
  };

  const handleTagRemove = (index: number) => {
    const currentOption = formik.values[inputName][index];

    if (
      currentOption?.productQuantity &&
      Number(currentOption.productQuantity) !== 0
    ) {
      errorModal({ content: "Không thể xóa vì lựa chọn này còn hàng" });
    } else {
      const updatedOptions = formik.values[inputName].filter(
        (_: any, i: number) => i !== index,
      );
      formik.setFieldValue(inputName, updatedOptions);
    }
  };

  const handleOptionChange = (
    index: number,
    field: string,
    value: string | number,
  ) => {
    const updatedOptions = [...formik.values[inputName]];

    const newValue =
      field === "productPrice" || field === "productQuantity"
        ? Number(value)
        : value;

    updatedOptions[index] = { ...updatedOptions[index], [field]: newValue };
    formik.setFieldValue(inputName, updatedOptions);
  };

  return (
    <div className={className}>
      <p className="text-sm text-red-500">
        {formik.touched[inputName] && errorMessage}
        {duplicateError}
      </p>
      <Input
        className="flex-grow bg-transparent focus:outline-none"
        placeholder={inputPlaceHolder}
        type="text"
        value={tagInput}
        name={inputName}
        onChange={handleInputChange}
        onBlur={formik.handleBlur}
        onKeyDown={handleKeyDown}
      />
      <div className="flex flex-col gap-2">
        {formik.values[inputName].map((option: any, index: number) => (
          <div key={index} className="mt-2">
            <div className="flex items-center gap-1">
              <span className="text-lg">{option.name}</span>
              <button
                type="button"
                className="rounded-full bg-gray-100 p-1 text-red-500"
                onClick={() => handleTagRemove(index)}
              >
                <Icon icon="iconamoon:close-bold" width="16" height="16" />
              </button>
            </div>
            <Input
              label="Giá sản phẩm"
              className="mt-2 w-full"
              value={formatNumberWithDots(option.productPrice)}
              onChange={(e) => {
                const numericValue = Number(e.target.value.replace(/\./g, ""));
                handleOptionChange(index, "productPrice", numericValue);
              }}
            />
            <Input
              type="number"
              label="Số lượng sản phẩm"
              className="mt-2 w-full"
              value={option.productQuantity}
              onChange={(e) =>
                handleOptionChange(index, "productQuantity", e.target.value)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
