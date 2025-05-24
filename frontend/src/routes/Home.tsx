
import { Box, Button, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import LatestTransactions from "../components/LatestTransactions";
import ProfileChart from "../components/charts/ProfileChart";
import WalletGridRow from "../components/dashboard/WalletGridRow";
import AddLabel from "../components/modals/AddLabel";
import AddTransaction from "../components/modals/AddTransaction";
import ImportInvoice from "../components/modals/ImportInvoices";
import { useTransactions } from "../hooks/api/useTransactions";
import { useWallet } from "../hooks/api/useWallet";
import { Transaction } from "../models/Transaction";

const QUERY_LIMIT = 10;
function Home() {
  const { getTransactions } = useTransactions();
  const { getWallet } = useWallet();
  const [_, setSearchParams] = useSearchParams();

  const { data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(QUERY_LIMIT),
  });

  const {
    data: wallet,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["wallet"],
    queryFn: () => getWallet(),
  });

  return (
    <Box
      sx={{
        backgroundColor: "white",       // Set background to white
        color: "black",                 // Make all text black by default
        minHeight: "100vh",             // Optional: full viewport height
        padding: 3,                    // Optional: padding around content
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          justifyContent: "space-between",
          alignItems: {
            xs: "start",
            md: "center",
          },
        }}
      >
        <Typography component="h1" variant="h4" fontWeight={600} color="inherit">
          Dashboard
        </Typography>
        <Box sx={{ marginTop: { xs: 2, md: 0 } }}>
          <Button
            variant="contained"
            size="medium"
            // startIcon={<AddIcon />}
            onClick={() =>
              setSearchParams((state) => {
                if (!state.get("transaction")) state.set("transaction", "1");
                return state;
              })
            }
          >
            Add transaction
          </Button>
        </Box>
      </Box>
      <Grid mt={2} container spacing={2} alignItems={"stretch"}>
        <WalletGridRow wallet={wallet} isPending={isPending} isError={isError} />
        <Grid item xs={12} lg={6}>
          <ProfileChart />
        </Grid>
        <Grid item xs={12}>
          <Box height={"auto"}>
            <Typography component="h2" variant="h6" mb={1} mt={2} color="inherit">
              Latest transactions
            </Typography>
            {Array.isArray(transactions) &&
 transactions.length > 0 &&
 "id" in transactions[0] && // <-- check it's Transaction[]
 (
  <>
    <LatestTransactions data={transactions as Transaction[]} headOnly={true} />
    <Link to={"/transactions"}>
      <Button variant="contained" size="medium" sx={{ marginTop: 2 }}>
        Show more
      </Button>
    </Link>
  </>
)}

          </Box>
        </Grid>
      </Grid>

      <ImportInvoice />
      <AddTransaction />
      <AddLabel />
    </Box>
  );
}

export default Home;
