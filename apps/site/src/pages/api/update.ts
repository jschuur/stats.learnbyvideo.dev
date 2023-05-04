import { type NextApiRequest, type NextApiResponse } from "next";

import { updateCache } from "~/cache/cache";
import { env } from "~/env.mjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for secret to confirm this is a valid request
  if (
    process.env.REVALIDATE_SECRET_TOKEN === "none" ||
    req.query.secret === process.env.REVALIDATE_SECRET_TOKEN
  ) {
    try {
      await updateCache();
      // await res.revalidate("/");

      // workaround for res.revalidate() not working via cron https://github.com/vercel/next.js/discussions/49164
      await fetch(
        `${env.NEXTAUTH_URL}/api/revalidate?secret=${env.REVALIDATE_SECRET_TOKEN}`
      );

      return res.redirect("/");
    } catch (err: unknown) {
      return res
        .status(500)
        .send(`Error revalidating: ${(err as Error).message}`);
    }
  } else {
    return res.status(401).json({ message: "Invalid token" });
  }
}
