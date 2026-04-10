import { sign } from "jsonwebtoken";

interface IDataToken {
  id: number;
  role?: string;
}

const secretKey = process.env.SECRET_KEY_TKN || "secret";

export const createToken = (data: IDataToken) => {
  return sign(
    {
      id: data.id,
    },
    secretKey,
    {
      expiresIn: "1h",
    }
  );
};
