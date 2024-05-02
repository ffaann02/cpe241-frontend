import Header from '../components/login-registerPage/LoginHeader';
import Login from '../components/login-registerPage/Login';
import { useState } from 'react';
import { LoadingSpinner } from '../components/LoadingGroup';

export default function LoginPage() {
    const [isFetching, setIsFetching] = useState<boolean>(false);

    return (
        <>
            <LoadingSpinner loading={isFetching} />
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="rounded-xl shadow-xl border-t border-t-slate-50">
                        <div className="px-6 py-8">
                            <Header
                                heading="Login to your account"
                                paragraph="Don't have an account yet? "
                                linkName="Signup"
                                linkUrl="/signup"
                            />
                            <Login isFetching={isFetching} setIsFetching={setIsFetching} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
