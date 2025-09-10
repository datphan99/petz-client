const formatSelectedKeys = (keysSet: any) => {
  if (keysSet) {
    return Array.from(keysSet).join(", ").replaceAll(" ", " ");
  }
};

export default formatSelectedKeys;
