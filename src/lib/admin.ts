import { db } from "@/lib/prisma";
import { UserRole } from "@prisma/client";

export const ADMIN_EMAIL_HEADER = "x-admin-email";

export async function isAdminEmail(email?: string | null) {
  if (!email) {
    return false;
  }

  const configuredAdmin = process.env.ADMIN_EMAIL;
  if (configuredAdmin && configuredAdmin.toLowerCase() === email.toLowerCase()) {
    return true;
  }

  const user = await db.user.findUnique({
    where: { email },
    select: { role: true },
  });

  return user?.role === UserRole.ADMIN;
}

export async function assertAdminEmail(email?: string | null) {
  const allowed = await isAdminEmail(email);

  if (!allowed) {
    throw new Error("ADMIN_REQUIRED");
  }
}
