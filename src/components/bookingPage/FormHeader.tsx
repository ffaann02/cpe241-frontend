const FormHeader = ({ title, description, span, className }: { title: string; description: string; span?: any,className?:string }) => {
    return (
        <div className={className}>
            <h1 className="text-blue-500 text-3xl mb-4">{title}</h1>
            <p className="mb-8 text-[#7C8DB0] text-base font-normal">
                {description} {span}
            </p>
        </div>
    );
};
export default FormHeader;
