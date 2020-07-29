import { axios } from "../../core";

export default {
  getAll: () => axios.get("/client-info"),
  getAllsmall: () => axios.get("/client-info-small"),
  uploadNewClient: (client, dbType) =>
    axios.post(
      `${dbType === "big" ? `/client-info` : `/client-info-small`}`,
      client,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ),
};
