import { useEffect } from 'react';
import "../components/component.css"
export const LoadingAirplaneGif = ({ loading, title }: { loading: boolean; title: string }) => {
    useEffect(() => {
        if (loading) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [loading]);
    return (
        <>
            {loading && (
                <div className="fixed w-full h-screen bg-white bg-opacity-60 top-0 z-[100] flex">
                    <div className="m-auto max-w-md max-h-1/2 w-full rounded-2xl flex flex-col justify-between">
                        <div className="p-4">
                            {/* <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500"
                        size={"xl"}/> */}
                            <img
                                src="https://media.tenor.com/lCKwsD2OW1kAAAAi/happy-cat-happy-happy-cat.gif"
                                className="mx-auto"
                            />
                        </div>
                        <h1 className="text-3xl font-bold text-center mb-6 text-royal-blue-600 flex justify-center">
                            {title}
                            <div className="text-dot-animation">
                                <span>.</span>
                                <span>.</span>
                                <span>.</span>
                            </div>
                        </h1>
                    </div>
                </div>
            )}
        </>
    );
};

export const LoadingSpinner = ({ loading }: { loading: boolean; title?: string }) => {
    useEffect(() => {
        if (loading) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [loading]);
    return (
        <>
            {loading && (
                <div className="w-full h-screen bg-white bg-opacity-50 fixed top-0 z-[100] flex">
                    <div className="m-auto max-w-md max-h-1/2 justify-center flex w-full rounded-2xl">
                        <div className="border-slate-200 h-40 w-40 animate-spin rounded-full border-[14px] border-t-royal-blue-400" />
                    </div>
                </div>
            )}
        </>
    );
};
