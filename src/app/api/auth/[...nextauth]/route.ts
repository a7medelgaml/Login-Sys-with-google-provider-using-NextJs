import { authOptions } from "@/src/app/lib/nextAuth";
import NextAuth from "next-auth"

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }