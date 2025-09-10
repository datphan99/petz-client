import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "@nextui-org/react";
import { FormikProps } from "formik";
import React, { useState } from "react";
import { NumericFormat } from "react-number-format"; // Import NumericFormat

interface FormAddProductTagInputProps {
  inputPlaceHolder: string;
  inputName: string;
  errorMessage?: string;
  formik: FormikProps<any>;
  className?: string;
}

export default function FormAddProductTagInput({
  inputPlaceHolder,
  inputName,
  errorMessage,
  formik,
  className = "",
}: FormAddProductTagInputProps) {
  const [tagInput, setTagInput] = useState("");
  const [duplicateError, setDuplicateError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
    setDuplicateError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      if (
        formik.values[inputName].some(
          (option: any) => option.name === tagInput.trim(),
        )
      ) {
        setDuplicateError("Tag already exists!");
      } else {
        formik.setFieldValue(inputName, [
          ...formik.values[inputName],
          { name: tagInput.trim(), price: "", quantity: "" }, // Add price and quantity fields
        ]);
        setTagInput("");
      }
    }
  };

  const handleTagRemove = (index: number) => {
    const updatedOptions = formik.values[inputName].filter(
      (_: any, i: number) => i !== index,
    );
    formik.setFieldValue(inputName, updatedOptions);
  };

  const handleOptionChange = (
    index: number,
    field: string,
    value: string | number,
  ) => {
    const updatedOptions = [...formik.values[inputName]];
    updatedOptions[index] = { ...updatedOptions[index], [field]: value };
    formik.setFieldValue(inputName, updatedOptions);
  };

  function formatNumberWithDots(value: number | string): string {
    const stringValue = String(value).replace(/\D/g, ""); // Loại bỏ ký tự không phải số
    if (!stringValue) return "";
    return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <div className={className}>
      <p className="text-sm text-red-500">
        {formik.touched[inputName] && errorMessage}
        {duplicateError}
      </p>
      <div className="mt-1 flex w-full flex-wrap items-center gap-2">
        <Input
          className="flex-grow bg-transparent focus:outline-none"
          label={inputPlaceHolder}
          type="text"
          value={tagInput}
          name={inputName}
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
          onKeyDown={handleKeyDown}
        />
      </div>
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
