import Register from '@/views/Register';
import { createStars } from '@/lib/utils';

interface Country {
    country: string;
    region: string;
}

// Fetch api to get countries
const getCountries = async (): Promise<string[]> => {
    const res = await fetch('https://api.first.org/data/v1/countries?limit=249', {
        cache: 'force-cache',
    });

    const data = await res.json();

    return Array.from(
        new Set(
            Object.values(data.data as Record<string, Country>).map((item) =>
                item.country.replace(/\s*\(.*?\)\s*/g, '').trim(),
            ),
        ),
    ).sort();
};

export default async function RegisterPage() {
    const countries: string[] = await getCountries();
    const smallStars = createStars(80, 0.5, 2, 2, 5);
    const bigStars = createStars(8, 2, 4, 3, 6);

    return <Register countries={countries} smallStars={smallStars} bigStars={bigStars} />;
}
