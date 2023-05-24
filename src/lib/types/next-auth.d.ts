import NextAuth from "next-auth";

declare module "next-auth" {

  // interface Session {
  //   refreshTokenExpires?: number;
  //   accessTokenExpires?: string;
  //   refreshToken?: string;
  //   token?: string;
  //   error?: string;
  //   user?: User;
  // }

  // interface User {
  //   firstName?: string;
  //   lastName?: string;
  //   email?: string | null;
  //   id?: string;
  //   contactAddress?: {
  //     id?: string;
  //   };
  // }


  interface Session {
    user: {
      id: number;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      email: string;
      image: string;
    };
    token: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    refreshTokenExpires?: number;
    accessTokenExpires?: number;
    refreshToken?: string;
    token: string;
    exp?: number;
    iat?: number;
    jti?: string;
  }
}
