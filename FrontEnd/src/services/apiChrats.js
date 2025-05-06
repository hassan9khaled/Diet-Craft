import supabase from "./supabase";

export async function getFakeData() {
  let { data: fakeDataAsApi, error } = await supabase
    .from("fakeData")
    .select("*")
    .range(6210, 7210);
  if (error) {
    console.error("Error fetching data:", error);
  }
  return fakeDataAsApi;
}
