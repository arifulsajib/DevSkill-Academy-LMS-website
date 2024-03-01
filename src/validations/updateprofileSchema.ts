import * as yup from "yup";

export const updateprofileSchema = yup.object().shape({
  name: yup.string().required("Name is required").max(30, "Name must be at most 30 characters"),
  mobile: yup.number().required("Mobile is required").positive("Mobile must be positive").integer("Mobile must be an integer").min(1000000000, "Mobile must be at least 10 digits").max(999999999999, "Mobile must be at most 12 digits"),
  avater: yup.lazy((value) => (/^data/.test(value) ? yup.string().matches(/^data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*)$/i, "Must be a valid data URI") : yup.string().url("Must be a valid URL")))
});
