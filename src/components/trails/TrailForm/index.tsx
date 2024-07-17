import { FC } from "react";
import { Formik, Field, FieldInputProps } from "formik";
import cn from "classnames";

import RichTextArea from "@/components/utility/RichTextArea";
import Loading from "@/components/utility/Loading";
import ErrorMessage from "@/components/utility/ErrorMessage";
import FormErrorMessage from "@/components/utility/FormErrorMessage";
import Button from "@/components/common/Button";

import Styles from "./trailForm.module.scss";
import { trailSchema } from "./trailForm.schema";

const createSlug = (title: any) => {
  return encodeURI(title.toLowerCase().replace(" ", "-").replace("'", ""));
};

interface TrailFormProps {
  initialValues: any;
  onSubmit: any;
  loading?: boolean;
  error?: any;
  submitLabel?: string;
}

const TrailForm: FC<TrailFormProps> = ({
  initialValues,
  onSubmit,
  loading = "",
  error,
  submitLabel = "Submit",
}) => {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={trailSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values, setSubmitting);
        }}
      >
        {(formikProps) => {
          return (
            <div className={cn(Styles["form"], Styles["trail-form--user"])}>
              <form onSubmit={formikProps.handleSubmit}>
                <div className={Styles["form-field-wrapper"]}>
                  <label className={Styles["trail-form-label"]} htmlFor="name">
                    Name
                  </label>
                  <div className={Styles["trail-form-field"]}>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      onChange={(event: any) => {
                        formikProps.setFieldValue(
                          "slug",
                          createSlug(event.target.value)
                        );
                        formikProps.handleChange(event);
                      }}
                    />
                    <FormErrorMessage name="name" />
                  </div>
                </div>

                <div className={Styles["form-field-wrapper"]}>
                  <label className={Styles["trail-form-label"]} htmlFor="slug">
                    URL Slug
                  </label>
                  <div className={Styles["trail-form-field"]}>
                    <Field
                      type="text"
                      id="slug"
                      name="slug"
                      onChange={(event: any) => {
                        formikProps.setFieldValue(
                          "slug",
                          event.target.value.replace(" ", "-")
                        );
                      }}
                    />
                    <br />
                    <small>
                      4-playersofcolorado.org/trail/
                      <strong>{formikProps.values.slug}</strong>
                    </small>
                    <FormErrorMessage name="slug" />
                  </div>
                </div>

                <div className={Styles["form-field-wrapper"]}>
                  <label
                    className={Styles["trail-form-label"]}
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <div className={Styles["trail-form-field"]}>
                    <Field id="description" name="description">
                      {({ field }: { field: FieldInputProps<{}> }) => (
                        <RichTextArea
                          defaultText={formikProps.initialValues.description}
                          onChange={field.onChange(field.name)}
                        />
                      )}
                    </Field>
                  </div>
                </div>

                <div className={Styles["form-field-wrapper"]}>
                  <label
                    className={Styles["trail-form-label"]}
                    htmlFor="trailheadCoords"
                  >
                    Trailhead Coordinates (Longitude, Latitude)
                  </label>
                  <div className={Styles["trail-form-field"]}>
                    <Field
                      type="text"
                      id="trailheadCoords"
                      name="trailheadCoords"
                      placeholder="Ex: 40.811850,-105.590210"
                    />
                    <FormErrorMessage name="trailheadCoords" />
                  </div>
                </div>

                <div className={Styles["form-field-wrapper"]}>
                  <label
                    className={Styles["trail-form-label"]}
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <div className={Styles["trail-form-field"]}>
                    <Field type="text" id="address" name="address" />
                    <FormErrorMessage name="address" />
                  </div>
                </div>

                <div className={Styles["form-footer"]}>
                  <Button
                    type="submit"
                    disabled={
                      Object.keys(formikProps.errors).length > 0 ||
                      formikProps.isSubmitting ||
                      Boolean(loading)
                    }
                  >
                    {submitLabel}
                  </Button>
                  <Loading loading={Boolean(loading)} />
                  <ErrorMessage error={error} />
                </div>
              </form>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

export default TrailForm;
