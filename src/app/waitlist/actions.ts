"use server";

export type WaitlistValues = Record<string, string | string[]>;

export type WaitlistState = {
  status: "idle" | "error" | "success";
  message?: string;
  errors?: Partial<Record<string, string>>;
  values?: WaitlistValues;
};

const MULTI_FIELDS = ["supportTypes", "availability"] as const;

const REQUIRED: Record<string, string> = {
  fullName: "Please enter your full name.",
  mobile: "Please enter a mobile number we can reach you on.",
  preferredContact: "Please choose how you'd like us to contact you.",
  fieldOfTraining: "Please select your field of training.",
  experience: "Please select your years of experience.",
  registrationStatus: "Please select your registration status.",
  cprStatus: "Please tell us about your CPR certification.",
  town: "Please enter your town or neighbourhood.",
  languages: "Please list the languages you speak with families.",
};

export async function joinWaitlist(
  _prev: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const values: WaitlistValues = {};
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("$ACTION") || typeof value !== "string") continue;
    if ((MULTI_FIELDS as readonly string[]).includes(key)) {
      values[key] = formData.getAll(key).map(String);
    } else {
      values[key] = value.trim();
    }
  }

  const get = (key: string) =>
    typeof values[key] === "string" ? (values[key] as string) : "";
  const errors: Record<string, string> = {};

  for (const [field, message] of Object.entries(REQUIRED)) {
    if (!get(field)) errors[field] = message;
  }

  const mobile = get("mobile").replace(/[\s-]/g, "");
  if (mobile && !/^(\+?233|0)\d{9}$/.test(mobile)) {
    errors.mobile = "Enter a Ghana mobile number, e.g. 024 123 4567.";
  }

  const email = get("email");
  if (get("preferredContact") === "Email" && !email) {
    errors.email = "Email is required if you prefer to be contacted by email.";
  } else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.supportTypes?.length) {
    errors.supportTypes = "Choose at least one type of support.";
  }
  if (!values.availability?.length) {
    errors.availability = "Choose at least one availability option.";
  }
  if (get("consent") !== "yes") {
    errors.consent = "Please agree to be contacted so we can follow up.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      errors,
      values,
    };
  }

  // TODO: persist the application (database, Google Sheet, CRM or email).
  // For now it is only logged on the server.
  console.log("[waitlist] new application", values);

  return {
    status: "success",
    message: `Thank you, ${get("fullName").split(" ")[0]}. You're on the waitlist and our recruitment team will be in touch.`,
  };
}
