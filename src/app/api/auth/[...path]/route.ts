import { getAuth } from '@/lib/auth/server';

type Context = { params: Promise<{ path: string[] }> };

export async function GET(request: Request, context: Context) {
  const { path } = await context.params;
  if (path.join('/') !== 'get-session') {
    return Response.json({ message: 'This authentication operation is not enabled.' }, { status: 403 });
  }
  const auth = getAuth();
  if (!auth) return Response.json({ message: 'Neon Auth environment configuration is not ready.' }, { status: 503 });
  return auth.handler().GET(request, context);
}

export async function POST(request: Request, context: Context) {
  const { path } = await context.params;
  // Only existing-account sign-in and sign-out are enabled before safe role provisioning.
  if (!['sign-in/email', 'sign-out'].includes(path.join('/'))) {
    return Response.json({ message: 'Account provisioning is not enabled. Development branch setup is required.' }, { status: 403 });
  }
  const auth = getAuth();
  if (!auth) return Response.json({ message: 'Neon Auth environment configuration is not ready.' }, { status: 503 });
  return auth.handler().POST(request, context);
}
