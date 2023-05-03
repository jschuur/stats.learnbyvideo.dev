import "dotenv/config";
import { updateCache } from "~/cache/cache";

(async () => {
  try {
    await updateCache();
    await fetch(
      `${
        process.env.NEXTAUTH_URL ||
        process.env.VERCEL_URL ||
        "https://localhost:3000"
      }/api/revalidate?secret=${process.env.REVALIDATE_SECRET_TOKEN || "none"}`
    );
  } catch (err: unknown) {
    console.error((err as Error).message);
  }
})();
