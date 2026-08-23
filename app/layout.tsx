import type {Metadata, Viewport} from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";
import Navigate from "@/components/ui/navigate";
import Header from "@/components/ui/header";
import * as React from "react";
import RouteProgressBar from '@/components/ui/route-progress-bar';
import { userService } from '@/services/user-service';
import { AuthHydrator } from '@/components/auth-hydrator';
import { ThemeProvider } from '@/components/ui/theme-provider';
import {baseUrl} from "@/lib/constanst";
import { FloatingMenuBubble } from '@/components/ui/floating-menu-bubble';
// import Navigate from "@/components/Navigate/Navigate";
// import { Providers } from '@/components/Providers/Providers'
// import Chatbot from '@/components/ChatBot/ChatBot'



const lexendDeca = Lexend_Deca({
    subsets: ["latin"],
    weight: ["200", "300", "400", "600", "700"],
});

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),

    title: {
        default: "Showcase Developer Projects & Connect Creators | Fiurozz",
        template: "%s | Fiurozz",
    },

    description:
        "Fiurozz is a modern platform to showcase developer projects, discover inspiring work, and connect with developers and designers who love building.",

    keywords: [
        "Fiurozz",
        "web project showcase",
        "developer portfolio platform",
        "web development projects",
        "web developer projects",
        "web developer portfolio",
        "personal web projects",
        "showcase personal web projects",
        "developer community",
        "connect developers and designers",
        "web creators community",
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
        title: "Showcase Developer Projects & Connect Creators | Fiurozz",
        description:
            "Fiurozz is a modern platform to showcase your developer projects, discover inspiring work, and connect with developers and designers who love building.",
        url: baseUrl,
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

    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },

    alternates: {
        canonical: baseUrl,
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
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

        <ThemeProvider attribute="class" defaultTheme='system' enableSystem>
            <AuthHydrator initialUser={user}/>
            <RouteProgressBar />
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}
