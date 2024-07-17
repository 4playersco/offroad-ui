import { FC, useCallback } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface CaptchaProps {
  onChange: (value: boolean) => void;
}

const Captcha: FC<CaptchaProps> = ({ onChange }) => {
  const handleCaptchaChange = useCallback(() => {
    onChange(true);
  }, [onChange]);

  const handleCaptchaExpire = useCallback(() => {
    onChange(false);
  }, [onChange]);

  const recaptchaSiteKey = import.meta.env.RECAPTCHA_SITE_KEY ?? "";

  return (
    <ReCAPTCHA
      sitekey={recaptchaSiteKey}
      onChange={handleCaptchaChange}
      onExpired={handleCaptchaExpire}
      onErrored={handleCaptchaExpire}
    />
  );
};

export default Captcha;
