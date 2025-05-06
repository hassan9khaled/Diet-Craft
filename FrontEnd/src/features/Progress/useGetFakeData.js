import { useQuery } from "@tanstack/react-query";
import { getFakeData } from "../../services/apiChrats";

function useGetFakeData() {
  const { data: fakeData, isPending } = useQuery({
    queryFn: getFakeData,
    queryKey: ["fakeData"]
  });
  return { fakeData, isPending };
}

export default useGetFakeData;
