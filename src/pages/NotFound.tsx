import { Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <>
            <div className="h-screen flex flex-col items-center justify-center">
                <div className="m-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -50, scale: 0.3, color: '#211c4a', rotate: 0 }}
                        animate={{ opacity: 1, y: 0, scale: 1.1, color: '#605DEC', rotate: 360 }}
                        transition={{
                            repeatType: 'mirror',
                            repeat: Infinity,
                            duration: 1,
                            type: 'spring',
                            stiffness: 100,
                        }}
                        className="text-9xl font-bold"
                    >
                        404
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.3 }}
                        animate={{ opacity: 1, y: 0, scale: 1.1 }}
                        transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 120 }}
                        className="text-xl flex flex-col"
                    >
                        <div className="flex">
                            Sorry, the page &nbsp;<span className="text-[#605DEC]">{location.pathname.substring(1)}</span>&nbsp; does not exist.
                        </div>
                        <Button
                            colorScheme="teal"
                            size="lg"
                            mt={4}
                            variant={'outline'}
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            Go back
                        </Button>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default NotFound;
