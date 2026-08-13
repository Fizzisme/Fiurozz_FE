import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";
import Navigate from "@/components/ui/navigate";
import Header from "@/components/ui/header";
import * as React from "react";
import RouteProgressBar from '@/components/ui/route-progress-bar';
import { userService } from '@/services/user-service';
import { AuthHydrator } from '@/components/auth-hydrator';
// import Navigate from "@/components/Navigate/Navigate";
// import { Providers } from '@/components/Providers/Providers'
// import Chatbot from '@/components/ChatBot/ChatBot'



const lexendDeca = Lexend_Deca({
    subsets: ["latin"],
    weight: ["200", "300", "400", "600", "700"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://fiurozz.com"),

    title: {
        default: "Fiurozz - Software Engineer Portfolio",
        template: "%s - Fiurozz",
    },

    description:
        "Explore software engineering projects, full-stack development, backend architecture, UI design, and technical blogs by Phi.",

    keywords: [
        "Fiurozz",
        "Portfolio",
        "Software Engineer",
        "Backend Developer",
        "Full Stack",
        "NestJS",
        "Spring Boot",
        "Go",
        "React",
        "Next.js",
        "Microservices",
    ],

    authors: [
        {
            name: "Nguyen Le Tuan Phi",
        },
        {
            name: "Phan Dinh Phuc"
        }
    ],

    creator: "Nguyen Le Tuan Phi",

    publisher: "Fiurozz",

    robots: {
        index: true,
        follow: true,
    },

    openGraph: {
        title: "Fiurozz | Software Engineer Portfolio",
        description:
            "Discover projects, blogs and technical articles about backend engineering, system architecture and UI development.",
        url: "https://fiurozz.com",
        siteName: "Fiurozz",
        locale: "en_US",
        type: "website",

        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Fiurozz",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Fiurozz | Software Engineer Portfolio",
        description:
            "Software Engineer Portfolio showcasing projects and blogs.",
        images: ["/og-image.png"],
    },

    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },

    alternates: {
        canonical: "https://fiurozz.com",
    },
};

export default async function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    const user = await userService.getMe();

    return (
        <html lang="en" className='mdl-js' suppressHydrationWarning>
        <body
            className={`${lexendDeca.className} antialiased`}
        >

        <div>
            <AuthHydrator initialUser={user}/>
            <RouteProgressBar />
            <Navigate/>
            <Header />
            {/*<Chatbot />*/}
            {children}
        </div>
        </body>
        </html>
    );
}
