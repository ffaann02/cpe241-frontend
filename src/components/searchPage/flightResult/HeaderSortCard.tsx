import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const HeaderSortCard = ({
    sortType,
    selectSortType,
    sortBy,
    setSortBy,
}: {
    sortType: string;
    selectSortType: (type: string) => void;
    sortBy: number;
    setSortBy: React.Dispatch<React.SetStateAction<number>>;
}) => {
    return (
        <div className="border border-neutral-300 rounded-md bg-white grid grid-cols-4">
            <button
                onClick={() => selectSortType('recommend')}
                className={`hover:bg-royal-blue-50 text-sm rounded-l-md border-b-2 py-2 
                    transition-all duration-200 ease-linear text-center
                    ${
                        sortType === 'recommend'
                            ? 'text-royal-blue-500 border-b-royal-blue-400'
                            : 'text-slate-500 border-b-transparent'
                    }`}
            >
                <div className="w-full border-r border-r-royal-blue-200 py-1">
                    <p className="font-bold text-md">เที่ยวบินแนะนำ</p>
                    <div className="flex gap-x-1 justify-center">
                        <span className="font-bold">฿</span>
                        <p className="font-semibold">700</p>
                    </div>
                </div>
            </button>
            <button
                onClick={() => selectSortType('price')}
                className={`hover:bg-royal-blue-50 text-sm border-b-2 py-2
                    transition-all duration-200 ease-linear text-center
                    ${
                        sortType === 'price'
                            ? 'text-royal-blue-500 border-b-royal-blue-400'
                            : 'text-slate-500 border-b-transparent'
                    }`}
            >
                <div className="w-full border-r border-r-royal-blue-200 py-1">
                    <p className="font-bold text-md">ราคาถูกที่สุด</p>
                    <div className="flex gap-x-1 justify-center">
                        <span className="font-bold">฿</span>
                        <p className="font-semibold">700</p>
                    </div>
                </div>
            </button>
            <button
                onClick={() => selectSortType('fastest')}
                className={`hover:bg-royal-blue-50 text-sm border-b-2 py-2
                    transition-all duration-200 ease-linear text-center
                    ${
                        sortType === 'fastest'
                            ? 'text-royal-blue-500 border-b-royal-blue-400'
                            : 'text-slate-500 border-b-transparent'
                    }`}
            >
                <div className="w-full border-r border-r-royal-blue-200 py-1">
                    <p className="font-bold text-md">เดินทางเร็วที่สุด</p>
                    <div className="flex gap-x-1 justify-center">
                        <span className="font-bold">฿</span>
                        <p className="font-semibold">700</p>
                    </div>
                </div>
            </button>
            <Menu>
                <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    height={'100%'}
                    textAlign={'left'}
                    borderRadius={0}
                    backgroundColor={'transparent'}
                    _hover={{ backgroundColor: 'transparent' }}
                    _focus={{ backgroundColor: 'transparent' }}
                    _expanded={{ backgroundColor: 'transparent' }}
                >
                    <p className="ml-1 text-slate-500">จัดเรียงโดย</p>
                    <p className="ml-1 text-slate-500 text-sm font-normal">
                        {sortBy === 1
                            ? 'เที่ยวบินแรก - สุดท้าย'
                            : sortBy === 2
                              ? 'ราคาต่ำสุด - สูงสุด'
                              : 'เดินทางเร็วสุด - ช้าสุด'}
                    </p>
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={()=>{setSortBy(1)}}>เที่ยวบินแรก - สุดท้าย</MenuItem>
                    <MenuItem onClick={()=>{setSortBy(2)}}>ราคาต่ำสุด - สูงสุด</MenuItem>
                    <MenuItem onClick={()=>{setSortBy(3)}}>เดินทางเร็วสุด - ช้าสุด</MenuItem>
                </MenuList>
            </Menu>
        </div>
    );
};
export default HeaderSortCard;
