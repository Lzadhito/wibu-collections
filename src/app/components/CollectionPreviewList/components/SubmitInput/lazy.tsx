import dynamic from 'next/dynamic';

const LazySubmitInput = dynamic(() => import('./index'));

export default LazySubmitInput;
