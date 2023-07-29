import { StyledForm } from '@/app/components/styles';
import { Cancel, CancelOutlined, ClearRounded } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { FormEvent, useState } from 'react';
import { StyledActionWrapper } from './styles';

interface Props {
  submitTxt: string;
  placeholder?: string;
  defaultValue?: string;
  onSubmit: (value: string) => void;
  onCancel: () => void;
}
export default function SubmitInput({ defaultValue, submitTxt, onSubmit, placeholder, onCancel }: Props) {
  const [value, setValue] = useState(defaultValue || '');
  const [inputErrorMessage, setInputErrorMessage] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      onSubmit(value);
      setValue('');
    } catch (error: any) {
      setInputErrorMessage(error?.message);
    }
  }

  return (
    <StyledForm onSubmit={(event) => handleSubmit(event)}>
      <TextField
        error={!!inputErrorMessage}
        helperText={inputErrorMessage}
        fullWidth
        placeholder={placeholder}
        required
        variant="standard"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        InputProps={{
          endAdornment: (
            <StyledActionWrapper>
              <InputAdornment position="end">
                <Button size="small" type="submit">
                  {submitTxt}
                </Button>
              </InputAdornment>

              <IconButton onClick={onCancel}>
                <ClearRounded fontSize="small" />
              </IconButton>
            </StyledActionWrapper>
          ),
        }}
      />
    </StyledForm>
  );
}
