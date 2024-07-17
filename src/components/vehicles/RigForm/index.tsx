import { FC } from "react";
import { Formik, Field } from "formik";
import Loading from "@/components/utility/Loading";
import SuccessMessage from "@/components/utility/SuccessMessage";
import ErrorMessage from "@/components/utility/ErrorMessage";
import FormErrorMessage from "@/components/utility/FormErrorMessage";
import Button from "@/components/common/Button";

import Styles from "./rigForm.module.scss";
import { rigSchema } from "./rigForm.schema";

interface RigFormProps {
  initialValues: FormValues;
  onSubmit: (
    values: FormValues,
    setSubmitting: (value: boolean) => void
  ) => void;
  loading?: boolean;
  error?: any;
  successMessage?: string;
}

const RigForm: FC<RigFormProps> = ({
  initialValues,
  onSubmit,
  loading = false,
  error,
  successMessage,
}) => {
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={rigSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values, setSubmitting);
        }}
      >
        {(formikProps) => (
          <div className={Styles["form"]}>
            <form onSubmit={formikProps.handleSubmit}>
              <div className={Styles["form-field"]}>
                <label className={Styles["rig-form-label"]} htmlFor="year">
                  Year
                </label>
                <div className={Styles["rig-form-field"]}>
                  <Field type="text" id="year" name="year" />
                  <FormErrorMessage name="year" />
                </div>
              </div>

              <div className={Styles["form-field"]}>
                <label className={Styles["rig-form-label"]} htmlFor="make">
                  Make
                </label>
                <div className={Styles["rig-form-field"]}>
                  <Field type="text" id="make" name="make" />
                  <FormErrorMessage name="make" />
                </div>
              </div>

              <div className={Styles["form-field"]}>
                <label className={Styles["rig-form-label"]} htmlFor="model">
                  Model
                </label>
                <div className={Styles["rig-form-field"]}>
                  <Field type="text" id="model" name="model" />
                  <FormErrorMessage name="model" />
                </div>
              </div>

              <div className={Styles["form-field"]}>
                <label className={Styles["rig-form-label"]} htmlFor="trim">
                  Trim
                </label>
                <div className={Styles["rig-form-field"]}>
                  <Field type="text" id="trim" name="trim" />
                  <FormErrorMessage name="trim" />
                </div>
              </div>

              <div className={Styles["form-field"]}>
                <label className={Styles["rig-form-label"]} htmlFor="name">
                  Name
                </label>
                <div className={Styles["rig-form-field"]}>
                  <Field type="text" id="name" name="name" />
                  <FormErrorMessage name="name" />
                </div>
              </div>

              <div className={Styles["form-field"]}>
                <label
                  className={Styles["rig-form-label"]}
                  htmlFor="outfitLevel"
                >
                  Outfit Level
                </label>
                <div className={Styles["rig-form-field"]}>
                  <Field
                    component="select"
                    name="outfitLevel"
                    id="outfitLevel"
                    defaultValue={formikProps.initialValues.outfitLevel}
                  >
                    {Object.entries({ 0: "n/a", ...OutfitLevel }).map(
                      (outfitLevel, idx) => (
                        <option key={idx} value={outfitLevel[0]}>
                          {outfitLevel[1]}
                        </option>
                      )
                    )}
                  </Field>
                  <FormErrorMessage name="outfitLevel" />
                </div>
              </div>

              <div className={Styles["form-field"]}>
                <label className={Styles["rig-form-label"]} htmlFor="mods">
                  Mods (comma separated)
                </label>
                <div className={Styles["rig-form-field"]}>
                  <Field type="text" id="mods" name="mods" />
                  <FormErrorMessage name="mods" />
                </div>
              </div>

              {/* <Field type="checkbox" name="isDefault" /> */}

              <div className={Styles["form-field"]}>
                <div />

                <div>
                  <Button
                    type="submit"
                    disabled={
                      !formikProps.dirty ||
                      !formikProps.isValid ||
                      formikProps.isSubmitting ||
                      Boolean(loading)
                    }
                  >
                    Update
                  </Button>
                  <Loading loading={Boolean(loading)} />
                  <ErrorMessage error={error} />
                  {successMessage && (
                    <SuccessMessage message={successMessage} />
                  )}
                </div>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default RigForm;
