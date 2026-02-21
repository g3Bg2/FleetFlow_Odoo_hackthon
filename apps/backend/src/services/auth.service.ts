import { createHash } from "node:crypto";
import { db, users } from "@repo/db";
import { eq } from "drizzle-orm";
import * as jose from "jose";
import type { RegisterInput } from "../validators/auth.validator.js";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default-secret");
const JWT_ALG = "HS256";
const ACCESS_TOKEN_EXPIRY = "24h";

let secretKey: jose.KeyLike | undefined;

async function getSecretKey() {
  if (!secretKey) {
    secretKey = await jose.importSecretKey(JWT_SECRET);
  }
  return secretKey;
}

function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

function verifyPassword(password: string, hash: string): boolean {
  const passwordHash = hashPassword(password);
  return passwordHash === hash;
}

export async function login(username: string, password: string) {
  const [user] = await db.select().from(users).where(eq(users.username, username));

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return null;
  }

  const secret = await getSecretKey();
  const token = await new jose.SignJWT({
    sub: user.id.toString(),
    username: user.username,
    roleId: user.roleId,
  })
    .setProtectedHeader({ alg: JWT_ALG })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .sign(secret);

  return {
    token,
    user: {
      id: user.id.toString(),
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      roleId: user.roleId ?? undefined,
    },
  };
}

export async function register(data: RegisterInput) {
  const passwordHash = hashPassword(data.password);

  const [user] = await db
    .insert(users)
    .values({
      username: data.username,
      passwordHash,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      roleId: data.role_id,
    })
    .returning();

  const secret = await getSecretKey();
  const token = await new jose.SignJWT({
    sub: user.id.toString(),
    username: user.username,
    roleId: user.roleId,
  })
    .setProtectedHeader({ alg: JWT_ALG })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .sign(secret);

  return {
    token,
    user: {
      id: user.id.toString(),
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      roleId: user.roleId ?? undefined,
    },
  };
}

export async function verifyToken(token: string) {
  try {
    const secret = await getSecretKey();
    const { payload } = await jose.jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}
