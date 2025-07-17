import { type Permissions } from "@/permissions/permission.types";

// START SEND OTP

export interface TSendOtp {
  phoneNumber: string;
  sendOTP?: boolean;
}

export interface TSendOtpResponse {
  message: string;
  isExist?: boolean;
  isPasswordSet?: boolean;
}

// END SEND OTP

// START LOGIN OTP

export interface TLogin {
  code?: string;
  phoneNumber: string;
  firstName?: string;
  lastName?: string;
  token?: string;
  password?: string;
}

export interface TLoginResponse {
  accessToken: string;
  message: string;
  token: string;
  refreshToken: string;
}

// END LOGIN OTP

// START FORGET PASSWORD

export interface TForgetPassword {
  phoneNumber?: string;
  code?: string;
  password?: string;
  repeatPassword?: string;
  token?: string;
}

export interface TForgetPasswordResponse {
  accessToken: string;
  refreshToken: string;
  message: string;
  token: string;
}

// END FORGET PASSWORD

// START EDIT PROFILE

export interface TEditProfile {
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  code?: string;
  token?: string;
  address?: string;
  approxiteAddress?: string;
  fixPhoneNumber?: string;
  education?: string;
  birthDate?: string;
}

export interface TEditProfileResponse {
  message: string;
  token: string;
}

// END EDIT PROFILE

// START GET USER INFO

export interface TUserInfoResponse {
  data: {
    message: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    address: string;
    approximateAddress: string;
    fixPhoneNumber: string;
    education: string;
    birthdate: string;
    accessPerms: Permissions[];
  };
}

// END GET USER INFO
