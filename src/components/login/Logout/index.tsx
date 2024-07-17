import { useEffect } from "react";
import { useMutation, useApolloClient } from "@apollo/client";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import LOGOUT_MUTATION from "./logout.graphql";

const Logout = () => {
  const client = useApolloClient();
  const router = useRouter();
  const [logout, { data }] = useMutation(LOGOUT_MUTATION);

  useEffect(() => {
    const doEffect = async () => {
      await client.clearStore();
      router.push("/login");
    };

    if (data && data.logout.message) {
      doEffect();
    }
  }, [data, client, router]);

  return (
    <Link
      href="/logout"
      onClick={async (event) => {
        event.preventDefault();
        await logout();
      }}
    >
      Logout
    </Link>
  );
};

export default Logout;
