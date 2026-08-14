import Description from '@/app/(main)/home/components/description';
import MainCard from '@/app/(main)/home/components/maincard';
import SeeTop3 from '@/app/(main)/home/components/seeTop3';
import { createStars } from '@/lib/utils';

export default function Home() {
    const smallStars = createStars(80, 0.5, 2, 2, 5);
    const bigStars = createStars(8, 2, 4, 3, 6);
    return (
        <div>
            <Description smallStars={smallStars} bigStars={bigStars} />

            <div className=" px-6 overflow-hidden dark:bg-primary relative">
                <MainCard />
                <SeeTop3 />
            </div>
        </div>
    );
}
