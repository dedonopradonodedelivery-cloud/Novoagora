import React from 'react';
export const StoreDetailView = ({ store, onBack }: any) => <div onClick={onBack} className="p-4 text-white">Store Detail for {store?.name}. Click to go back.</div>;