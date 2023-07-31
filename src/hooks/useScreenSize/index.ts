import { useMediaQuery } from '@mui/material';

export default function useScreenSize() {
  const isDesktop: boolean = useMediaQuery('(min-width:1200px)');
  const isTablet: boolean = useMediaQuery('(min-width:768px) and (max-width:1199px)');
  const isMobile: boolean = useMediaQuery('(min-width:320px) and (max-width:767px)');

  return {
    isDesktop,
    isTablet,
    isMobile,
  };
}
