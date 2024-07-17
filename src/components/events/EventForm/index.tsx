import { FC } from "react";
import { Formik, Field, FormikProps, FieldInputProps } from "formik";
import cn from "classnames";
import { startOfDay } from "date-fns";

import { runEventSchema, nonRunEventSchema } from "./eventForm.schema";
import RichTextArea from "@/components/utility/RichTextArea";
import Loading from "@/components/utility/Loading";
import ErrorMessage from "@/components/utility/ErrorMessage";
import FormErrorMessage from "@/components/utility/FormErrorMessage";
import { DateTimePickerField } from "@/components/utility/DateFields";
// import EventImageUploader from '../EventImageUploader';
import UploadImagePreview from "@/components/common/UploadImagePreview";

import Styles from "./eventForm.module.scss";
import { FormValues } from "../CreateEvent/types";

interface EventFormProps {
  initialValues: any;
  onSubmit: (
    values: FormValues,
    setSubmitting: (value: boolean) => void
  ) => void;
  runLeaders?: any[];
  trails?: any[];
  loading?: boolean;
  error?: any;
  submitLabel?: string;
}

const EventForm: FC<EventFormProps> = ({
  initialValues,
  onSubmit,
  runLeaders = [],
  trails = [],
  loading = "",
  error,
  submitLabel = "Submit",
}) => {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={
          initialValues.type === "RUN" ? runEventSchema : nonRunEventSchema
        }
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values, setSubmitting);
        }}
      >
        {(formikProps) => {
          return (
            <div className={cn(Styles["form"], Styles["event-form--user"])}>
              <form onSubmit={formikProps.handleSubmit}>
                <div className={Styles["form-field-wrapper"]}>
                  <label className={Styles["event-form-label"]} htmlFor="type">
                    Event Type
                  </label>
                  <div className={Styles["event-form-field"]}>
                    <Field
                      component="select"
                      name="type"
                      id="type"
                      defaultValue={formikProps.initialValues.type}
                    >
                      {Object.entries(EventTypes).map((diff, idx) => (
                        <option value={diff[0]} key={idx}>
                          {diff[1]}
                        </option>
                      ))}
                    </Field>
                    <FormErrorMessage name="type" />
                  </div>
                </div>

                <div className={Styles["form-field-wrapper"]}>
                  <label className={Styles["event-form-label"]} htmlFor="title">
                    Title
                  </label>
                  <div className={Styles["event-form-field"]}>
                    <Field type="text" id="title" name="title" />
                    <FormErrorMessage name="title" />
                  </div>
                </div>

                <div className={Styles["form-field-wrapper"]}>
                  <label
                    className={Styles["event-form-label"]}
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <div className={Styles["event-form-field"]}>
                    <Field id="description" name="description">
                      {({ field }: { field: FieldInputProps<{}> }) => (
                        <RichTextArea
                          defaultText={formikProps.initialValues.description}
                          onChange={() => field.onChange(field.value)}
                        />
                      )}
                    </Field>
                    <FormErrorMessage name="description" />
                  </div>
                </div>

                <div className={Styles["form-field-wrapper"]}>
                  <label
                    className={Styles["event-form-label"]}
                    htmlFor="startDateTime"
                  >
                    Start Date
                  </label>
                  <div>
                    <DateTimePickerField
                      id="startDateTime"
                      name="startDateTime"
                      value={formikProps.values.startDateTime}
                      minDate={startOfDay(new Date())}
                      onChange={(name, value) => {
                        const hours = formikProps.values.endDateTime.getHours();
                        const mins =
                          formikProps.values.endDateTime.getMinutes();
                        const newEndDateTime = new Date(value.toString());

                        formikProps.setFieldValue(name, value);
                        formikProps.setFieldValue(
                          "endDateTime",
                          new Date(newEndDateTime.setHours(hours, mins, 0, 0))
                        );
                      }}
                      disableClock
                      className={Styles["event-date-field"]}
                    />
                    <br />
                    <small>Mountain Timezone</small>
                    <FormErrorMessage name="startDateTime" />
                  </div>
                </div>

                <div className={Styles["form-field-wrapper"]}>
                  <label
                    className={Styles["event-form-label"]}
                    htmlFor="endDateTime"
                  >
                    End Date
                  </label>
                  <div>
                    <DateTimePickerField
                      id="endDateTime"
                      name="endDateTime"
                      value={formikProps.values.endDateTime}
                      minDate={formikProps.values.startDateTime}
                      onChange={formikProps.setFieldValue}
                      disableClock
                      className={Styles["event-date-field"]}
                    />
                    <br />
                    <small>Mountain Timezone</small>
                    <FormErrorMessage name="endDateTime" />
                  </div>
                </div>

                {formikProps.values.type === "RUN" ? (
                  <div className={Styles["form-field-wrapper"]}>
                    <label
                      className={Styles["event-form-label"]}
                      htmlFor="rallyAddress"
                    >
                      Rally Place
                    </label>
                    <div className={Styles["event-form-field"]}>
                      <Field
                        type="text"
                        id="rallyAddress"
                        name="rallyAddress"
                      />
                      <FormErrorMessage name="rallyAddress" />
                    </div>
                  </div>
                ) : (
                  <div className={Styles["form-field-wrapper"]}>
                    <label
                      className={Styles["event-form-label"]}
                      htmlFor="address"
                    >
                      Address
                    </label>
                    <div className={Styles["event-form-field"]}>
                      <Field type="text" id="address" name="address" />{" "}
                      <small>
                        <i>(optional)</i>
                      </small>
                      <FormErrorMessage name="address" />
                    </div>
                  </div>
                )}

                {/* <div className={Styles['form-field-wrapper']}>
                  <label
                    className={Styles['event-form-label']}
                    htmlFor="trailNotes"
                  >
                    Trail Notes
                  </label>
                  <div className={Styles['event-form-field']}>
                    <Field
                      type="text"
                      onChange={formikProps.handleChange}
                      id="trailNotes"
                      name="trailNotes"
                    />
                    <FormErrorMessage
                      name="trailNotes"
                    />
                  </div>
                </div> */}

                <div className={Styles["form-field-wrapper"]}>
                  <label
                    className={Styles["event-form-label"]}
                    htmlFor="membersOnly"
                  >
                    Members Only?
                  </label>
                  <div className={Styles["event-form-field"]}>
                    <Field
                      type="checkbox"
                      id="membersOnly"
                      name="membersOnly"
                      checked={formikProps.values.membersOnly}
                    />
                    <FormErrorMessage name="membersOnly" />
                  </div>
                </div>

                <div className={Styles["form-field-wrapper"]}>
                  <label
                    className={Styles["event-form-label"]}
                    htmlFor="changeDisabled"
                  >
                    Disable ability to update RSVP? (One and Done™)
                  </label>
                  <div className={Styles["event-form-field"]}>
                    <Field
                      type="checkbox"
                      id="changeDisabled"
                      name="changeDisabled"
                      checked={formikProps.values.changeDisabled}
                    />
                    <FormErrorMessage name="changeDisabled" />
                  </div>
                </div>

                <div className={Styles["form-field-wrapper"]}>
                  <label className={Styles["event-form-label"]} htmlFor="host">
                    {initialValues.type === "RUN" ? "Run Leader" : "Host"}
                  </label>
                  <div className={Styles["event-form-field"]}>
                    <Field
                      component="select"
                      name="host"
                      id="host"
                      disabled={runLeaders.length === 1}
                      defaultValue={formikProps.initialValues.host}
                    >
                      {runLeaders
                        .sort((a, b) => {
                          if (a.lastName < b.lastName) {
                            return -1;
                          }
                          if (a.lastName > b.lastName) {
                            return 1;
                          }

                          // names must be equal
                          return 0;
                        })
                        .sort((a, b) => {
                          if (a.firstName < b.firstName) {
                            return -1;
                          }
                          if (a.firstName > b.firstName) {
                            return 1;
                          }

                          // names must be equal
                          return 0;
                        })
                        .map((leader, idx) => (
                          <option value={leader.username} key={leader.username}>
                            {leader.firstName} {leader.lastName}
                          </option>
                        ))}
                    </Field>
                    <FormErrorMessage name="host" />
                  </div>
                </div>

                {formikProps.values.type === "RUN" ? (
                  <>
                    <div className={Styles["form-field-wrapper"]}>
                      <label
                        className={Styles["event-form-label"]}
                        htmlFor="trail"
                      >
                        Trail
                      </label>
                      <div className={Styles["event-form-field"]}>
                        <Field
                          component="select"
                          name="trail"
                          id="trail"
                          defaultValue={formikProps.initialValues.trail}
                        >
                          {trails
                            .sort((a, b) => {
                              console.log(a);
                              if (a.name < b.name) {
                                return -1;
                              }
                              if (a.name > b.name) {
                                return 1;
                              }

                              // names must be equal
                              return 0;
                            })
                            .map((trail) => (
                              <option value={trail.id} key={trail.id}>
                                {trail.name}
                              </option>
                            ))}
                        </Field>
                        <FormErrorMessage name="trail" />
                      </div>
                    </div>
                    <div className={Styles["form-field-wrapper"]}>
                      <label
                        className={Styles["event-form-label"]}
                        htmlFor="trailDifficulty"
                      >
                        Difficulty
                      </label>
                      <div className={Styles["event-form-field"]}>
                        <Field
                          component="select"
                          name="trailDifficulty"
                          id="trailDifficulty"
                          defaultValue={
                            formikProps.initialValues.trailDifficulty
                          }
                        >
                          {Object.entries(TrailDifficulties).map(
                            (diff, idx) => (
                              <option value={diff[0]} key={idx}>
                                {diff[1]}
                              </option>
                            )
                          )}
                        </Field>
                        <FormErrorMessage name="trailDifficulty" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className={Styles["form-field-wrapper"]}>
                    {formikProps.values.newImage && (
                      <UploadImagePreview file={formikProps.values.newImage} />
                    )}

                    {!formikProps.values.newImage && initialValues.image && (
                      <img src={initialValues.image} alt="" width="400" />
                    )}
                    <label
                      className={Styles["event-form-label"]}
                      htmlFor="newImage"
                    >
                      Featured Image
                    </label>
                    <div className={Styles["event-form-field"]}>
                      <Field
                        name="newImage"
                        id="newImage"
                        component={({
                          form,
                        }: {
                          form: FormikProps<FormValues>;
                        }) => (
                          <input
                            id="file"
                            name="file"
                            type="file"
                            onChange={(event: any) => {
                              form.setFieldValue(
                                "newImage",
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                        )}
                      />
                      <FormErrorMessage name="newImage" />
                    </div>
                  </div>
                )}

                <div className={Styles["form-field-wrapper"]}>
                  <label
                    className={Styles["event-form-label"]}
                    htmlFor="maxAttendees"
                  >
                    Max number of attendees
                  </label>
                  <div className={Styles["event-form-field"]}>
                    <Field
                      type="number"
                      min="-1"
                      step="1"
                      id="maxAttendees"
                      name="maxAttendees"
                    />
                    <br />
                    <small>-1 is unlimited</small>
                    <FormErrorMessage name="maxAttendees" />
                  </div>
                </div>

                {formikProps.values.type === "RUN" && (
                  <div className={Styles["form-field-wrapper"]}>
                    <label
                      className={Styles["event-form-label"]}
                      htmlFor="maxRigs"
                    >
                      Max number of rigs
                    </label>
                    <div className={Styles["event-form-field"]}>
                      <Field
                        type="number"
                        min="-1"
                        id="maxRigs"
                        name="maxRigs"
                      />
                      <br />
                      <small>-1 is unlimited</small>
                      <FormErrorMessage name="maxRigs" />
                    </div>
                  </div>
                )}

                <div className={Styles["form-footer"]}>
                  <button
                    type="submit"
                    disabled={
                      Object.keys(formikProps.errors).length > 0 ||
                      formikProps.isSubmitting ||
                      Boolean(loading)
                    }
                  >
                    {submitLabel}
                  </button>
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

export default EventForm;
