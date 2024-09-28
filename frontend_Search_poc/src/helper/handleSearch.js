import { BACKEND_SEARCH_URL } from "./contants";
import axios from "axios";

const handleSearch = async (query) => {
  const res = await axios.get(BACKEND_SEARCH_URL, {
    params: { query },
  });
  return res;
};

export default handleSearch;
