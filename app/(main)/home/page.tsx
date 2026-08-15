import Home from '@/views/Home';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Showcase Developer Projects & Connect With Creators',
    description:
        'Discover and showcase developer projects, explore inspiring work, and connect with creators who love building and sharing.',

    alternates: {
        canonical: '/home',
    },
};

export default function HomePage() {
    return <Home />;
}
