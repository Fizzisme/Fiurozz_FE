import MotionCarousel from '@/components/animate-ui/components/community/motion-carousel'

const myCard = (
    <div style={{ opacity: 1 }}>
        <div className="relative w-full dark:bg-neutral-800 bg-neutral-100 rounded-2xl pt-1">
            <p className="text-[22px] font-black text-muted-foreground absolute top-3 left-1/2 -translate-x-1/2">Hi</p>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 89.83 66.52">
                <path className="dark:fill-neutral-700 fill-neutral-200" d="M15.97 15.06h57.88v40.4H15.97z" />
                <path className="dark:fill-neutral-500 fill-neutral-400" d="M21.01 19.81h8.13v8.13h-8.13z" />
            </svg>
        </div>
    </div>
)
export default function MainCard() {
    return (
        <div className="mt-15">
            <MotionCarousel
                slides={[myCard, myCard, myCard, myCard, myCard]}
                cardHeight="300px"
                options={{ loop: true }}
            />
        </div>
    )
}
