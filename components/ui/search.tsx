import { SearchIcon } from '@/components/animate-ui/icons/search';
import { AnimateIcon } from '@/components/animate-ui/icons/icon';

export default function Search() {
    return (
        <AnimateIcon
            animateOnHover
            className="  p-1 px-[6px] rounded bg-[#f6f6f7] dark:bg-[#262626] text-gray-500 dark:text-[#a1a1a1] text-xs select-none cursor-pointer flex gap-1"
            style={{ width: '200px', height: '25px' }}
        >
            <div className="relative top-[1.5px]">
                <SearchIcon className={'x size-3'} />
            </div>

            <input
                type="text"
                className="
                        border-none
                        outline-none
                        ring-0
                        focus:outline-none
                        focus:ring-0
                        focus:border-none
                        w-full
  "
                placeholder="Search..."
            />
        </AnimateIcon>
    );
}
