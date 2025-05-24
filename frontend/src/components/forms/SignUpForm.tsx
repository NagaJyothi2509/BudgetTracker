import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { grey, green } from "@mui/material/colors";
import { SignUpFormData, signUpFormSchema } from "../../schemas/signUpSchema";

function SignUpForm() {
  let navigate = useNavigate();
  const { SignUp } = useAuth();
  const { handleSubmit, control } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  });

  const { mutateAsync } = useMutation({
    mutationFn: SignUp,
    onSuccess: () => {
      navigate("/");
    },
    onError: () => {
      console.log("No server response");
    },
  });

  async function signUp(data: SignUpFormData) {
    await mutateAsync({
      user: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      },
    });
  }

  // Shared input field styles for green outline and black input text
  const inputFieldStyles = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: green[500],
      },
      "&:hover fieldset": {
        borderColor: green[700],
      },
      "&.Mui-focused fieldset": {
        borderColor: green[800],
      },
    },
    "& input": {
      color: "black",
    },
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.9)", // Light greyish box
        padding: 4,
        borderRadius: 2,
        boxShadow: 3,
        minWidth: 400,
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <Box>
        <Typography
          variant="h5"
          component="h1"
          fontWeight={600}
          lineHeight={1.8}
          color={"black"}
        >
          Create an account
        </Typography>
        <Typography variant="body2" component="p" color={grey[600]}>
          Please sign up to access your account
        </Typography>
      </Box>
      <form
        onSubmit={handleSubmit(signUp)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Controller
            name="firstName"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                fullWidth
                size="small"
                autoComplete="new-password"
                helperText={error ? error.message : null}
                error={!!error}
                onChange={onChange}
                value={value}
                label="First name"
                variant="outlined"
                sx={inputFieldStyles}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                fullWidth
                size="small"
                autoComplete="new-password"
                helperText={error ? error.message : null}
                error={!!error}
                onChange={onChange}
                value={value}
                label="Last name"
                variant="outlined"
                sx={inputFieldStyles}
              />
            )}
          />
        </Box>

        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              fullWidth
              size="small"
              autoComplete="new-password"
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              label="Email"
              variant="outlined"
              sx={inputFieldStyles}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              fullWidth
              size="small"
              autoComplete="new-password"
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              label="Password"
              variant="outlined"
              type="password"
              sx={inputFieldStyles}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              fullWidth
              size="small"
              autoComplete="new-password"
              helperText={error ? error.message : null}
              error={!!error}
              onChange={onChange}
              value={value}
              label="Confirm password"
              variant="outlined"
              type="password"
              sx={inputFieldStyles}
              inputProps={{
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
              }}
            />
          )}
        />

        <Button type="submit" variant="contained" size="medium">
          Sign Up
        </Button>
        <Typography
          color="text.secondary"
          variant="body2"
          component="p"
          textAlign="center"
        >
          Already have an account? <Link to="/auth/sign-in">Sign in</Link>
        </Typography>
      </form>
    </Box>
  );
}

export default SignUpForm;
