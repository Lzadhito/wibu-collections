import dynamic from 'next/dynamic';

const LazyAddToCollectionDialog = dynamic(() => import('./index'));

export default LazyAddToCollectionDialog;
