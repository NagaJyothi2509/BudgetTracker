import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box, Grid, IconButton, Skeleton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { Wallet } from "../../models/Wallet";
import { formatValue } from "../../utils/utils";
import EditBalanceForm from "../forms/EditBalanceForm";

interface Props {
  wallet?: Wallet;
  isPending: boolean;
  isError: boolean;
}

function WalletGridRow(props: Props) {
  const [isEditingBalance, setIsEditingBalance] = useState(false);

  return (
    <Grid container spacing={3} direction={"column"}>
      {/* Balance Section */}
      <Grid item xs={8} sm={3}>
        <Box height={"60%"}>
          <Typography>Balance</Typography>
          {props.isPending ? (
            <Skeleton variant="rectangular" width={210} height={50} />
          ) : props.isError ? (
            <Typography
              component="p"
              variant="body1"
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 14,
                textAlign: "center",
              }}
            >
              Unable to load data.
            </Typography>
          ) : (
            <Box display="flex" alignItems="center" gap={2}>
              {!isEditingBalance ? (
                <Typography component="span" variant="h5" fontWeight={300}>
                  {formatValue(props.wallet!.current_amount, 10_000)}
                </Typography>
              ) : (
                <EditBalanceForm setState={setIsEditingBalance} />
              )}

              <Box display={"flex"}>
                {isEditingBalance && (
                  <IconButton
                    form="editBalance"
                    sx={{
                      borderRadius: 2,
                      color: grey[500],
                      "&:hover": { backgroundColor: grey[900] },
                    }}
                    size="small"
                    type="submit"
                  >
                    <DoneIcon />
                  </IconButton>
                )}

                <Box onClick={() => setIsEditingBalance(!isEditingBalance)}>
                  {isEditingBalance ? (
                    <IconButton
                      sx={{
                        borderRadius: 2,
                        color: grey[500],
                        "&:hover": { backgroundColor: grey[900] },
                      }}
                      size="small"
                      aria-label="cancel"
                    >
                      <CloseIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      sx={{
                        borderRadius: 2,
                        color: grey[500],
                        "&:hover": { backgroundColor: grey[900] },
                      }}
                      size="small"
                      aria-label="edit"
                    >
                      <ModeEditIcon />
                    </IconButton>
                  )}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Grid>

      {/* Monthly Earnings */}
      <Grid item xs={8} sm={3}>
        <Box height={"60%"}>
          <Typography component="h2" variant="body1" mb={1}>
            Monthly Earnings
          </Typography>
          {props.isPending ? (
            <Skeleton variant="rectangular" width={210} height={50} />
          ) : props.isError ? (
            <Typography
              component="p"
              variant="body1"
              sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              Unable to load data.
            </Typography>
          ) : (
            <Box display="flex" alignItems="center" gap={2}>
              <Typography component="span" variant="h5" fontWeight={300}>
                +{formatValue(props.wallet!.monthly_earnings, 10_000)}
              </Typography>
            </Box>
          )}
        </Box>
      </Grid>

      {/* Monthly Expenses */}
      <Grid item xs={8} sm={3}>
        <Box height={"60%"}>
          <Typography component="h2" variant="body1" mb={1}>
            Monthly Expenses
          </Typography>
          {props.isPending ? (
            <Skeleton variant="rectangular" width={210} height={50} />
          ) : props.isError ? (
            <Typography
              component="p"
              variant="body1"
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 14,
                textAlign: "center",
              }}
            >
              Unable to load data.
            </Typography>
          ) : (
            <Box display="flex" alignItems="center" gap={2}>
              <Typography component="span" variant="h5" fontWeight={300}>
                -{formatValue(props.wallet!.monthly_expenses, 10_000)}
              </Typography>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default WalletGridRow;
