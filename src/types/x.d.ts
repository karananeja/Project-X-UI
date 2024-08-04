declare interface ErrResp {
  status: number;
  errcode: string;
  msg: string;
  errdata: { [key: string]: string } | string;
}

declare interface SignUpPayload {
  email: string;
  name: string;
  mobile: string;
  password: string;
}

type JSONPrimitive = string | number | boolean | null | undefined;
type JSONValue = JSONPrimitive | JSONValue[] | { [key: string]: JSONValue };

declare interface SignUpResponse {
  userid: string;
  email: string;
  mobile: string;
  name: string;
  ispendingapproval: boolean;
  isenabled: boolean;
  updatedat: number;
  usermeta: JSONValue;
}
