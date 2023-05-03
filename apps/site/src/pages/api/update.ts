import { type NextApiRequest, type NextApiResponse } from "next";

import { updateCache } from "~/cache/cache";

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
      await res.revalidate("/");

      return res.redirect("/");
    } catch (err) {
      return res.status(500).send("Error revalidating: ${err.message}");
    }
  } else {
    return res.status(401).json({ message: "Invalid token" });
  }
}
