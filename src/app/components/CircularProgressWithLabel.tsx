import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import {
  StyledCircularProgress,
  StyledCircularProgressContainer,
  StyledCircularProgressLabelContainer,
} from './styles';

export default function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
  return (
    <StyledCircularProgressContainer>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        {...props}
        value={100}
      />
      <StyledCircularProgress variant="determinate" {...props} />
      <StyledCircularProgressLabelContainer>
        <Typography
          fontSize={props.size ? (props.size as number) / 3 : undefined}
          variant="caption"
          component="div"
          fontWeight="bold"
        >{`${Math.round(props.value)}`}</Typography>
      </StyledCircularProgressLabelContainer>
    </StyledCircularProgressContainer>
  );
}
