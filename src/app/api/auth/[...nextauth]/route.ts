import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth, { AuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

interface Credentials {
 username: string;
 password: string;
}

interface UserWithRole extends User {
  role?: string;
 }

export const authOptions: AuthOptions = {
 providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('Credentials are missing');
        }
        const { username, password } = credentials;
        console.log('Credentials:', credentials); // Debugging line
        if (!username) {
          throw new Error('Username is missing');
        }
        const user = await prisma.admin.findUnique({
          where: { username },
        });
      
        if (user && await bcrypt.compare(password, user.password)) {
          return { id: user.adminId.toString(), name: user.fullname, email: user.username };
        }
      
        return null;
      },
    }),
 ],
 adapter: PrismaAdapter(prisma),
 callbacks: {
    jwt: async ({ token, user }) => {
      if (user && 'role' in user) {
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      const userWithRole = session.user as UserWithRole;
      if (userWithRole && typeof token.role === 'string') {
        userWithRole.role = token.role;
      }
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