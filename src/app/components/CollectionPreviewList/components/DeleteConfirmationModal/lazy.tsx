import dynamic from 'next/dynamic';

const LazyDeleteConfirmationModal = dynamic(() => import('./index'));

export default LazyDeleteConfirmationModal;
