import { useNavigate } from "react-router-dom";
import useUser from "./useUser";

const useProfile: () => [string, boolean] | null = () => {
  const { query } = useRouter();
  const { username } = query;
  const { error, data } = useUser();

  if (error) {
    console.error(error);
    return null;
  }

  if (!data) {
    return null;
  }

  const { myself } = data;
  const isSelf = myself.username === username;

  return [myself, isSelf];
};

export default useProfile;
