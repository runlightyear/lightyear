export interface PhoneNumberProperty {
  id: string;
  type: "phone_number";
  phoneNumber: string;
}

export interface PhoneNumberPropertyInput {
  phoneNumber: string;
}
