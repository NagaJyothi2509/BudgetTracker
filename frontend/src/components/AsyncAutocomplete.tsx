import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useWallet } from "../hooks/api/useWallet";
import { CustomLabel } from "../models/CustomLabel";

interface Props {
  onChange: any;
  value: CustomLabel | null;
  helperText?: string;
  error?: boolean;
}

export default function AsyncAutocomplete(props: Props) {
  const { getWallet } = useWallet();
  const [open, setOpen] = useState(false);

  const { data: wallet, isLoading } = useQuery({
    queryKey: ["wallet"],
    queryFn: () => getWallet(),
    enabled: true,
  });

  return (
    <Autocomplete
      size="small"
      loading={isLoading}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      options={wallet?.labels ?? []}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      onChange={(_, data) => props.onChange(data)}
      value={props.value}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Label"
          error={props.error}
          helperText={props.helperText}
          sx={{
            '& label.Mui-focused': {
              color: 'black',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'black',
              },
              '&:hover fieldset': {
                borderColor: 'black',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black',
              },
            },
            '& .MuiInputBase-input': {
              color: 'black', // <-- this sets the typed text color to black
            },
            '& .MuiInputLabel-root': {
              color: 'black', // placeholder/label color
            },
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      fullWidth
    />
  );
}
