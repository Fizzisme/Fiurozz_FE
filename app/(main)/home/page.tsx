import Description from "@/app/(main)/home/components/description";
import MainCard from "@/app/(main)/home/components/maincard";
import SeeTop3 from "@/app/(main)/home/components/seeTop3";

export default function Home() {
  return (
    <div className='pt-[120px] px-6 overflow-hidden dark:bg-primary'>
        <Description />
        <MainCard/>
        <SeeTop3/>
    </div>
  );
};