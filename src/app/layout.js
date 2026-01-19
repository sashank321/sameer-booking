import Providers from '@/components/Providers';
import Navbar from '@/components/Navbar';
import '@/styles/globals.css';

export const metadata = {
    title: 'Sameer – Book Your Dog Companion',
    description: 'Spend quality time with Sameer, the friendliest dog in town!',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                        <Navbar />
                        <main style={{ flex: 1 }}>{children}</main>
                        <footer style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'var(--surface)', marginTop: '4rem' }}>
                            <p style={{ color: 'var(--text-muted)' }}>&copy; {new Date().getFullYear()} Sameer Dog Booking. All wags reserved.</p>
                        </footer>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
