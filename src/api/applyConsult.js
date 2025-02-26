import axios from "axios";
import { SV_LOCAL } from "../constants";
import { APPLY_CONSULT_TO_MENTOR } from "../settings/url";
import { getCookie } from "../cookie";

export const applyConsult = async (data) => {
  try {
    const response = await axios.post(
      `${SV_LOCAL}/${APPLY_CONSULT_TO_MENTOR}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      }
    );
  } catch (err) {
    console.error(err);
  }
};
