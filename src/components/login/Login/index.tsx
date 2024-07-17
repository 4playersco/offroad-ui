import { FC, useState, useEffect } from "react";
import { useMutation, useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import LOGIN_MUTATION from "./login.graphql";
// Refetch
import CURRENT_USER_QUERY from "@/hooks/useUser/useUser.graphql";

import Loading from "@/components/utility/Loading";
import ErrorMessage from "@/components/utility/ErrorMessage";
import Button from "@/components/common/Button";

import Styles from "./login.module.scss";

interface LoginProps {
  redirect?: string;
}

const Login: FC<LoginProps> = ({ redirect = "" }) => {
  const client = useApolloClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [login, { error, loading, data }] = useMutation(LOGIN_MUTATION);

  useEffect(() => {
    if (data && data.login.message) {
      router.push(decodeURIComponent(redirect));
    }
  }, [data, router, redirect]);

  return (
    <form
      className={Styles["form"]}
      onSubmit={async (e) => {
        e.preventDefault();
        await client.clearStore();
        await login({
          variables: { email, password },
          refetchQueries: [{ query: CURRENT_USER_QUERY }],
          awaitRefetchQueries: true,
        });
      }}
    >
      <h3>Login</h3>
      <ErrorMessage error={error} />
      <fieldset
        disabled={loading}
        aria-busy={loading}
        className={Styles["fieldset"]}
      >
        <label htmlFor="email">
          <input
            className={Styles["field"]}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label htmlFor="password">
          <input
            className={Styles["field"]}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <footer>
          <span>
            <Button ghost type="submit">
              Login
            </Button>
            <Loading loading={loading} />
          </span>
          <Link
            className={Styles["forgot-password-link"]}
            href="/forgot-password"
          >
            Forgot password?
          </Link>
        </footer>
      </fieldset>
    </form>
  );
};

export default Login;
