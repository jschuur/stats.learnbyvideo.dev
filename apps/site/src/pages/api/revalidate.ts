import { type NextApiRequest, type NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for secret to confirm this is a valid request
  try {
    await res.revalidate("/");
    return res.redirect("/");
  } catch (err) {
    return res.status(500).send("Error revalidating: ${err.message}");
  }
}
