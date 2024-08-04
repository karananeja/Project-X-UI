import { xApiPost } from './x';

export async function signUp(payload: SignUpPayload) {
  return await xApiPost(`/user/signup`, payload);
}
