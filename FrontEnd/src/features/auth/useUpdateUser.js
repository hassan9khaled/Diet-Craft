import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: editUser, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    }
  });

  return { editUser, isPending };
}

export default useUpdateUser;
