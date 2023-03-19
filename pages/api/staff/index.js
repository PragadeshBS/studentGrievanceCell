import { getStaff, createStaff } from "@/controllers/staff/staffController";
import connectDb from "@/utils/connectDb";

export default async function handler(req, res) {
  await connectDb();
  switch (req.method) {
    case "GET":
      return getStaff(req, res);
    case "POST":
      return createStaff(req, res);
    default:
      return res.status(405).end();
  }
}
