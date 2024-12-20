import React, { ComponentType, SVGProps } from 'react';

interface ButtonProps {
    color?: string;
    textColor?: string;
    icon?: ComponentType<SVGProps<SVGSVGElement>>;
    text?: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ color, icon: Icon, text, onClick }) => {
    return (
        <div
            className={`${color ? color : ''} flex items-center text-slate-500 hover:text-black cursor-default hover:bg-slate-100 p-1 rounded-md shadow-sm shadow-slate-400 max-w-max`}
            onClick={onClick}>
            {Icon && <Icon className='size-4 text-gray-400 mr-0.5' />}
            {text && <div>{text}</div>}
        </div>
    );
};

export default Button;