import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import GitHub from "@auth/core/providers/github";
import { GITHUB_ID, GITHUB_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";
import { PrismaAdapter } from "@auth/prisma-adapter";
import {PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const handle = SvelteKitAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
      GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
      Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET }),
  ],
});

