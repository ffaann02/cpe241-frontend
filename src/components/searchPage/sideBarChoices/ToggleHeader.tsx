import ToggleDropdown from "../ToggleDropdown";

interface ToggleHeaderProps {
    title: string;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleHeader:React.FC<ToggleHeaderProps> = ({title,isOpen,setIsOpen}:ToggleHeaderProps) => {
    return (
        <div
            className="flex justify-between cursor-pointer"
            onClick={() => {
                setIsOpen((prev) => !prev);
            }}
        >
            <h2 className="text-slate-500 font-semibold">{title}</h2>
            <ToggleDropdown isOpen={isOpen} />
        </div>
    );
};
export default ToggleHeader;
