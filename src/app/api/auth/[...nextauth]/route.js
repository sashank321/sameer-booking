import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "hello@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Accept any email/password combination
                if (!credentials?.email || !credentials?.password) return null;

                // Create user from whatever they type
                return {
                    id: credentials.email,
                    name: credentials.email.split('@')[0],
                    email: credentials.email,
                    role: credentials.email.includes('admin') ? 'ADMIN' : 'USER',
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        }
    },
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET || 'sameer-dog-booking-secret-2026',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
