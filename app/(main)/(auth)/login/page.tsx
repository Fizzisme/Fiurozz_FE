import Login from '@/views/Login';
import { createStars } from '@/lib/utils';

export default function LoginPage() {
    const smallStars = createStars(80, 0.5, 2, 2, 5);
    const bigStars = createStars(8, 2, 4, 3, 6);
    return <Login smallStars={smallStars} bigStars={bigStars} />;
}
