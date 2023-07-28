import { CardContent, Typography } from '@mui/material';
import type { AnimeListItem } from '@/app/types/anime';

import { StyledCard, StyledCardMedia, StyledCheckbox } from './styles';

interface Props {
  anime: AnimeListItem;
  showCheckbox?: boolean;
  checked?: boolean;
  onClick: (anime: AnimeListItem) => void;
}

export default function AnimeCard({ anime, showCheckbox, checked, onClick }: Props) {
  return (
    <StyledCard onClick={() => (showCheckbox ? onClick(anime) : {})} key={anime.id}>
      {showCheckbox && <StyledCheckbox disabled checked={checked} />}
      <StyledCardMedia image={anime.coverImage.large} height="180" $showCheckbox={!!showCheckbox} />
      <CardContent>
        <Typography align="center" fontWeight="bold">
          {anime.title.english || anime.title.native || ''}
        </Typography>
      </CardContent>
    </StyledCard>
  );
}
