import React from 'react';
export const MenuView = ({ onNavigate }: any) => <div onClick={() => onNavigate('home')} className="p-4 text-white">Menu View. Click to go home.</div>;