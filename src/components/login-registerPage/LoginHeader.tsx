import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    heading: string;
    paragraph: string;
    linkName: string;
    linkUrl: string;
}

const Header: React.FC<HeaderProps> = ({ heading, paragraph, linkName, linkUrl = '#' }) => {
    return (
        <div className="mb-10">
            <div className="flex justify-center">
                {/* Replace this with the appropriate image import or src */}
                <img
                    alt=""
                    className="h-14 w-14"
                    src="https://cdn.iconscout.com/icon/free/png-256/free-plane-3802463-3168528.png?f=webp"
                />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{heading}</h2>
            <p className="text-center text-sm text-gray-600 mt-5">
                {paragraph}{' '}
                <Link to={linkUrl} className="font-medium text-purple-600 hover:text-purple-500">
                    {linkName}
                </Link>
            </p>
        </div>
    );
};

export default Header;
