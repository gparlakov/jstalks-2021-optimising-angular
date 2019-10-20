export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export module User {
  export const empty: User = {} as User;
}
