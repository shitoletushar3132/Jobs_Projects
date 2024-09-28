import { BACKEND_SERACH_SUGGESTION } from "./contants";
import axios from "axios";

const showSuggestions = async (query) => {
  const res = await axios.get(BACKEND_SERACH_SUGGESTION, {
    params: { q: query },
  });
  return res?.data;
};

export default showSuggestions;
