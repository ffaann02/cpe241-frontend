

function Footer() {
    return (
        <>
            <section className="p-8 grid md:grid-cols-10">
                <section className="mx-4 col-span-6">
                    <div className="text-indigo-600 text-2xl">
                        block 1
                    </div>
                </section>
                    <div>
                        block 2
                    </div>
                    <div>
                        block 3
                    </div>
                    <div>
                        block 4
                    </div>
                    <div>
                        block 5
                    </div>
            </section>
            <section className="grid grid-cols-5 gap-4">
                <div className="object-center space flex flex-col space-y-5">
                    <div className="object-center px-20">
                    <img src="assets/logo-test.png" className="h-auto w-30" alt="" />
                    </div>
                </div>                
                <div className="text-center space flex flex-col space-y-5">
                    <div className="text-xl">About</div>
                    <div>press</div>
                    <div>blog</div>
                    <div>forum</div>
                </div>
                <div className="text-center space flex flex-col space-y-5">
                    <div className="text-xl">Partner with us</div>
                    <div>program</div>
                    <div>partner</div>
                    <div>community</div>
                </div>
                <div className="text-center space flex flex-col space-y-5">
                    <div className="text-xl">Support</div>
                    <div>Help center</div>
                    <div>Contact us</div>
                    <div>Privacy policy</div>
                </div>
                <div className="text-center space flex flex-col space-y-5">
                    <div className="text-xl">Get the app</div>
                    <div>IOS</div>
                    <div>Android</div>
                    <div>PC</div>                   
                </div>

            </section>
        </>
    );
}

export default Footer;
