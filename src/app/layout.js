import Providers from '@/components/Providers';
import Navbar from '@/components/Navbar';
import dynamic from 'next/dynamic';
import '@/styles/globals.css';

const Background = dynamic(() => import('@/components/Background'), { ssr: false });

export const metadata = {
    title: 'Sameer – Book Your Dog Companion',
    description: 'Spend quality time with Sameer, the friendliest dog in town!',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <Background />
                    <Navbar />
                    <main>{children}</main>
                    <footer style={{
                        padding: '2rem 1rem',
                        textAlign: 'center',
                        marginTop: '2rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                    }}>
                        <p className="body-caption" style={{ color: 'var(--text-tertiary)' }}>
                            &copy; {new Date().getFullYear()} Sameer Dog Booking. All wags reserved.
                        </p>
                    </footer>
                </Providers>
            </body>
        </html>
    );
}
