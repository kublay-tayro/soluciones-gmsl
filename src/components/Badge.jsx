import React from 'react';

const Badge = ({ children, type }) => {
    const colors = {
        "Oportunidad Única": "bg-amber-500 text-white",
        "Liquidación": "bg-red-500 text-white",
        "Alto Valor": "bg-slate-800 text-white border border-slate-600",
        "default": "bg-blue-600 text-white"
    };
    return (
        <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${colors[type] || colors['default']}`}>
            {children}
        </span>
    );
};

export default Badge;
