import useScreenSize from '@/hooks/useScreenSize';

export default function useMasonryColumns() {
  const { isMobile, isTablet } = useScreenSize();
  if (isMobile) return 2;
  if (isTablet) return 3;
  return 5;
}
