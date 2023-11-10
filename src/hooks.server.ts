import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import GitHub from '@auth/core/providers/github';
import {
    GITHUB_ID,
    GITHUB_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
} from '$env/static/private';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { prisma } from '$lib/server/prisma-client';




async function authorization({ event, resolve }) {
    console.log(process.env.VERCEL_ENV)
    if (process.env.VERCEL_ENV === 'edge') {
        return resolve(event);
    };

    if (!event.url.pathname.startsWith('/login')) {
        const session = await event.locals.getSession();
        if (!session) {
            throw redirect(303, '/login');
        }
    }
    // if the request is still here, just proceed as normally
    return resolve(event);
}

export const handle: Handle = sequence(
    SvelteKitAuth({
        adapter: PrismaAdapter(prisma),
        providers: [
            GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
            Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET })
        ],
        pages: {
            signIn: '/login',
            signOut: '/login'
        }
    }),
    authorization
);
