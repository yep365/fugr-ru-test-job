import { axios } from "../../core";
export default {
  getAll: () => axios.get("/client-info"),
  getAllsmall: () => axios.get("client-info-small"),
};
