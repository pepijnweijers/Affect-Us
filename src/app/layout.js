import { Poppins } from 'next/font/google'
import "./globals.css";

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    weight: ['100', '200', '400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({ children }) {
    return (
        <html lang="nl">
            <body className={poppins.className}>
                {children}
            </body>
        </html>
    );
}
