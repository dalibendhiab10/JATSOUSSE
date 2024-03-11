import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const authOptions = {
 providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await prisma.admin.findUnique({
          where: { username: email},
        });

        if (user && await bcrypt.compare(password, user.password)) {
          return { id: user._id, email: user.username, name: user.fullname };
        }

        return null;
      },
    }),
 ],
 adapter: PrismaAdapter(prisma),
 callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.role = user.role;
      return token;
    },
    session: async ({ session, token }) => {
      session.user.role = token.role;
      return session;
    },
 },
 pages: {
    signIn: '/signin',
 },
 session: {
    strategy: 'jwt',
 },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };