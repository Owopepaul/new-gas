import type { Role } from '@/lib/demo-data';

export const DEMO_ROLE_COOKIE = 'newgas-demo-role';

export const demoAccounts: Record<Role, { email: string; password: string }> = {
  owner: { email: 'owner@demo.local', password: 'demo123' },
  worker: { email: 'worker@demo.local', password: 'demo123' },
  client: { email: 'client@demo.local', password: 'demo123' },
};

export function getDemoRoleCookie(): Role | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${DEMO_ROLE_COOKIE}=([^;]*)`));
  if (!match) return null;
  const value = decodeURIComponent(match[1]);
  return value === 'owner' || value === 'worker' || value === 'client' ? value : null;
}

export function setDemoRoleCookie(role: Role) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toUTCString();
  document.cookie = `${DEMO_ROLE_COOKIE}=${encodeURIComponent(role)}; path=/; expires=${expires}; SameSite=Lax`;
}

export function clearDemoRoleCookie() {
  if (typeof document === 'undefined') return;
  document.cookie = `${DEMO_ROLE_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

export function signInDemo(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPassword = password.trim();

  const role = (Object.keys(demoAccounts) as Role[]).find((key) => {
    const account = demoAccounts[key];
    return account.email === normalizedEmail && account.password === normalizedPassword;
  });

  if (!role) {
    return {
      success: false,
      message: 'Use a demo account such as owner@demo.local, worker@demo.local, or client@demo.local with the password demo123.',
    } as const;
  }

  setDemoRoleCookie(role);
  return { success: true, role } as const;
}
