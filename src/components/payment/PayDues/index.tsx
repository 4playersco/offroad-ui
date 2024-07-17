import { FC, useCallback, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useMutation } from "@apollo/client";

import PAY_DUES_MUTATION from "./payDues.graphql";
// Refetch
import ACCOUNT_FORM_QUERY from "@/components/user/AccountForm/accountForm.graphql";
import CURRENT_USER_QUERY from "@/hooks/useUser/useUser.graphql";

import useUser from "@/hooks/useUser";
import ErrorMessage from "@/components/utility/ErrorMessage";
import Loading from "@/components/utility/Loading";

import { getDuesAmount, convertToCents, whatYearIsIt } from "@/lib";

interface PayDuesProps {
  onLoading: (loading: boolean) => void;
  children: React.ReactNode;
}

const PayDues: FC<PayDuesProps> = ({ onLoading, children }) => {
  const { loading, error, data } = useUser();
  const [payMembershipDues, { error: mutationError }] =
    useMutation(PAY_DUES_MUTATION);

  const handleToken = useCallback(
    ({ id }: any) => {
      const asyncFn = async () => {
        onLoading(true);

        await payMembershipDues({
          variables: {
            data: {
              token: id,
            },
          },
          refetchQueries: [
            {
              query: CURRENT_USER_QUERY,
            },
            {
              query: ACCOUNT_FORM_QUERY,
            },
          ],
          awaitRefetchQueries: true,
        });

        onLoading(false);
      };

      asyncFn();
    },
    [payMembershipDues, onLoading]
  );

  useEffect(() => () => onLoading(false));

  if (loading) {
    return <Loading loading />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!data) {
    return null;
  }

  const { myself } = data;
  const dues = getDuesAmount();

  return (
    <>
      {children}
      <ErrorMessage error={mutationError} />
      <StripeCheckout
        amount={convertToCents(dues)}
        name="4-Players of Colorado"
        description={`${whatYearIsIt()} dues payment`}
        image="/img/logo-round.png"
        stripeKey={import.meta.env.STRIPE_KEY ?? ""}
        currency="USD"
        email={myself.email}
        token={handleToken}
      />
    </>
  );
};

export default PayDues;
