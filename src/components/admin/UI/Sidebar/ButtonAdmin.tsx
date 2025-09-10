import { Button, ButtonProps } from "@nextui-org/react";

export default function ButtonAdmin({ ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      className="block w-fit bg-primary text-white hover:bg-[#c4514b] dark:bg-white dark:hover:bg-[#f2f2f2]"
    ></Button>
  );
}
