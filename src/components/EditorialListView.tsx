import React from 'react';
export interface EditorialCollection { id: string; title: string; subtitle: string; image: string; keywords: string[]; }
export const EditorialListView = ({ onBack }: any) => <div onClick={onBack} className="p-4 text-white">Editorial List View. Click to go back.</div>;