import { useRouter } from "next/navigation";
import useAuthStore from "../store/authStore";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore();
  const router = useRouter();

  if (!user) {
    router.push("/sign_in");
    return null;
  }

  return <>{children}</>;
}
