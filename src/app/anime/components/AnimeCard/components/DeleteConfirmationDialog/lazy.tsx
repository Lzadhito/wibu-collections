import dynamic from 'next/dynamic';

const LazyDeleteConfirmationDialog = dynamic(() => import('./index'));

export default LazyDeleteConfirmationDialog;
