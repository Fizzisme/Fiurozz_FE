import {SearchIcon} from "@/components/animate-ui/icons/search";
import {AnimateIcon} from "@/components/animate-ui/icons/icon";

export default function Search() {
  return (
      <AnimateIcon animateOnHover
                   className=" border-2 p-1 px-[6px] hover:bg-primary  border-black dark:border-primary rounded bg-[#f6f6f7] text-gray-500 text-xs select-none cursor-pointer flex gap-1"
                   style={{ width: '200px', height: '25px', background: '#f6f6f7' }}
      >


          <div className="relative top-[-2px]" >
              <SearchIcon className={'x size-4'} />
          </div>


          <input type="text"
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
};