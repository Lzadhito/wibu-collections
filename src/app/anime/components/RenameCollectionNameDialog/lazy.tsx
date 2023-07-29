import dynamic from 'next/dynamic';

const LazyRenameCollectionNameDialog = dynamic(() => import('./index'));

export default LazyRenameCollectionNameDialog;
