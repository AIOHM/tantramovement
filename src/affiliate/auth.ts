import { clearAffiliateSession, createAffiliateUser, findAffiliateUserById, validateAffiliateCredentials, getAffiliateSessionUserId, setAffiliateSessionUserId } from "./localAffiliateStore";
import type { AffiliateUser } from "./types";

export async function signUpAffiliate(data: {
  name: string;
  email: string;
  password: string;
  affiliateId: string;
}) {
  const user = createAffiliateUser({
    id: `${Date.now()}`,
    name: data.name,
    email: data.email,
    affiliateId: data.affiliateId,
    createdAt: new Date().toISOString(),
    password: data.password,
  });
  setAffiliateSessionUserId(user.id);
  return user;
}

export async function loginAffiliate(email: string, password: string) {
  const user = validateAffiliateCredentials(email, password);
  if (!user) {
    throw new Error("Invalid email or password.");
  }
  setAffiliateSessionUserId(user.id);
  return user;
}

export function logoutAffiliate() {
  clearAffiliateSession();
}

export function getCurrentAffiliateUser(): AffiliateUser | null {
  const userId = getAffiliateSessionUserId();
  if (!userId) return null;
  return findAffiliateUserById(userId);
}
