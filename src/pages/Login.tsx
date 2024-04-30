import Header from '../components/login-registerPage/LoginHeader';
import Login from '../components/login-registerPage/Login';

export default function LoginPage() {
    return (
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
                        <Login />
                    </div>
                </div>
            </div>
        </div>
    );
}
