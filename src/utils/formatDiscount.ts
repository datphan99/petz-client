const formatDiscount = (discount: any) => {
  if (typeof discount !== "number" || discount < 0) {
    return "Invalid value";
  }

  if (discount >= 1_000_000) {
    return `${discount / 1_000_000}tr`;
  }

  if (discount >= 1_000) {
    return `${discount / 1_000}k`;
  }

  return `${discount}`;
};

export default formatDiscount;
