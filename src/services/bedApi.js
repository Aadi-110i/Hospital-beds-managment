import axios from "axios";

export const getBeds = async () => {
  const response = await axios.get("http://localhost:5000/api/beds");
  return response.data;
};
