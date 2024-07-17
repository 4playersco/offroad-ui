import { FC, useCallback } from "react";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
3;

import NOTIFICATIONS_FORM_MUTATION from "../EditNotifications/editNotifications.graphql";

import { notificationsSettings, type NotificationSetting } from "@/constants";
// import Loading from '../../utility/Loading/index.jsx';

interface SettingsCheckboxProps {
  setting: NotificationSetting;
}

const SettingsCheckbox: FC<SettingsCheckboxProps> = ({ setting }) => {
  // @TODO fix this logic
  const key = setting;
  const value = true;

  const [setNotifications, { loading: mutationLoading }] = useMutation(
    NOTIFICATIONS_FORM_MUTATION
  );

  const handleChange = useCallback(
    (settingName: NotificationSetting, value: boolean) => {
      const fn = async () => {
        try {
          await setNotifications({
            variables: {
              settings: {
                [settingName]: value,
              },
            },
          });

          toast.success(
            `${notificationsSettings[settingName]} setting successfully updated`
          );
        } catch (error) {
          // @ts-ignore
          toast.error(error.message.replace("GraphQL error: ", ""));
        }
      };

      fn();
    },
    [setNotifications]
  );

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          defaultChecked={value}
          disabled={mutationLoading}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(key, event.target.checked);
          }}
        />
      </td>
      <td>{notificationsSettings[key]}</td>
    </tr>
  );
};

export default SettingsCheckbox;
