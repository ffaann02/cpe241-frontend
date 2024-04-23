import Header from '../components/login-registerPage/LoginHeader';
import Signup from '../components/login-registerPage/Signup';
export default function SignupPage() {
    return (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <Header
                            heading="Signup to create an account"
                            paragraph="Already have an account? "
                            linkName="Login"
                            linkUrl="/Login"
                        />
                        <Signup />
                    </div>
                </div>
            </div>
        </div>
    )
}

