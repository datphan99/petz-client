import { useSession } from "next-auth/react";

export default function useGetToken() {
  const session = useSession();
  return <div>useGetToken</div>;
}
