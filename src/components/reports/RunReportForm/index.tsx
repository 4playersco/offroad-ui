import { useQuery, useMutation } from "@apollo/client";
import { Formik, Field, FieldInputProps } from "formik";
import { useSearchParams } from "react-router-dom";

import Loading from "@/components/utility/Loading";
import ErrorMessage from "@/components/utility/ErrorMessage";
import SuccessMessage from "@/components/utility/SuccessMessage";
import FormErrorMessage from "@/components/utility/FormErrorMessage";
import Button from "@/components/common/Button";
import RichTextArea from "@/components/utility/RichTextArea";
import useUser from "@//hooks/useUser";

import Styles from "./runReportForm.module.scss";
import RUN_REPORT_QUERY from "./runReport.graphql";
import SUBMIT_RUN_REPORT_MUTATION from "./submitRunReport.graphql";
import { runReportSchema } from "./runReportForm.schema";

type FormValues = {
  eventName: string;
  eventId: string;
  trailName: string;
  trailId: string;
  runLeaderName: string;
  runLeaderId: string;
  attendees: any[];
  weather: string | null;
  trailDifficulty: string;
  trailConditions: string;
  description: string;
  bandaids: any[];
  notifyBoard: string;
};

const RunReportForm = () => {
  const { error: userError, loading: userLoading, data: userData } = useUser();
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const eventId = params.get("eventId");

  const {
    error: queryError,
    loading: queryLoading,
    data: queryData,
  } = useQuery(RUN_REPORT_QUERY, {
    variables: { eventId },
  });

  const [
    logReport,
    { error: mutationError, loading: mutationLoading, data: mutationData },
  ] = useMutation(SUBMIT_RUN_REPORT_MUTATION);

  if (queryLoading || userLoading) {
    return <div>Loading...</div>;
  }
  if (queryError || userError) {
    return <ErrorMessage error={queryError} />;
  }

  const { event } = queryData;
  const { myself } = userData;

  if (myself.id !== event.host.id || event.type !== "RUN") {
    throw new Error();
  }

  const initialValues: FormValues = {
    eventName: event.title,
    eventId: event.ID,
    trailName: event.trail.title,
    trailId: event.trail.ID,
    runLeaderName: `${event.host.firstName} ${event.host.lastName}`,
    runLeaderId: event.host.ID,
    attendees: event.RSVPs, // component
    //   members
    //   guests
    //   rigs
    weather: null, // component / dropdown
    trailDifficulty: event.trailDifficulty,
    trailConditions: "", // dropdown
    description: "",
    bandaids: [], // component
    notifyBoard: "",
  };

  return mutationData && mutationData.register ? (
    <SuccessMessage message={mutationData.register.message} />
  ) : (
    <Formik
      initialValues={initialValues}
      validationSchema={runReportSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await logReport({ variables: { ...values } });
        setSubmitting(false);
      }}
    >
      {(formikProps) => {
        const disabled =
          !formikProps.dirty ||
          !formikProps.isValid ||
          formikProps.isSubmitting ||
          mutationLoading;

        return (
          <div className={Styles["form"]}>
            <form onSubmit={formikProps.handleSubmit}>
              <div className={Styles["form-field-wrapper"]}>
                <label className={Styles["form-label"]} htmlFor="eventName">
                  Event
                </label>
                <div className={Styles["form-field"]}>
                  <Field
                    type="text"
                    id="eventName"
                    name="eventName"
                    value={event.title}
                    disabled
                  />
                </div>
              </div>

              <div className={Styles["form-field-wrapper"]}>
                <label className={Styles["form-label"]} htmlFor="trailName">
                  Trail
                </label>
                <div className={Styles["form-field"]}>
                  <Field type="text" id="trailName" name="trailName" disabled />
                </div>
              </div>

              <div className={Styles["form-field-wrapper"]}>
                <label className={Styles["form-label"]} htmlFor="runLeader">
                  Run Leader
                </label>
                <div className={Styles["form-field"]}>
                  <Field
                    type="text"
                    id="runLeader"
                    name="runLeader"
                    value={`${event.host.firstName} ${event.host.firstName}`}
                    disabled
                  />
                </div>
              </div>

              <div className={Styles["form-field-wrapper"]}>
                <label
                  className={Styles["event-form-label"]}
                  htmlFor="trailDifficulty"
                >
                  Actual Difficulty
                </label>
                <div className={Styles["event-form-field"]}>
                  <p>Expected difficulty: {event.trailDifficulty}</p>
                  <p>Was the difficulty different than what was expected?</p>
                  <Field
                    component="select"
                    name="trailDifficulty"
                    id="trailDifficulty"
                    selected={event.trailDifficulty}
                  >
                    {Object.entries(TrailDifficulties).map(
                      ([key, value]: any[]) => {
                        return (
                          <option key={key} value={key}>
                            {value}
                          </option>
                        );
                      }
                    )}
                  </Field>
                  <FormErrorMessage name="didDifficultytrailDifficultyMatch" />
                </div>
              </div>

              <div className={Styles["form-field-wrapper"]}>
                <label className={Styles["form-label"]} htmlFor="lastName">
                  Attendees
                </label>
                <div className={Styles["form-field"]}>
                  {/* <Field
                    type="text"
                    onChange={formikProps.handleChange}
                    id="lastName"
                    name="lastName"
                  /> */}
                  <FormErrorMessage name="lastName" />
                </div>
              </div>

              <div className={Styles["form-field-wrapper"]}>
                <label className={Styles["form-label"]} htmlFor="email">
                  Weather
                </label>
                <div className={Styles["form-field"]}>
                  {/* <Field
                    type="email"
                    onChange={formikProps.handleChange}
                    id="email"
                    name="email"
                  />
                  <FormErrorMessage name="email"  /> */}
                </div>
              </div>

              <div className={Styles["form-field-wrapper"]}>
                <label
                  className={Styles["form-label"]}
                  htmlFor="trailConditions"
                >
                  Trail Conditions
                </label>
                <div className={Styles["form-field"]}>
                  <Field
                    component="select"
                    name="trailConditions"
                    id="trailConditions"
                  >
                    {Object.entries(TrailConditions).map(([key, value]) => {
                      return (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      );
                    })}
                  </Field>
                  <FormErrorMessage name="trailConditions" />
                </div>
              </div>

              <div className={Styles["form-field-wrapper"]}>
                <label className={Styles["form-label"]} htmlFor="description">
                  Description of Event
                </label>
                <div className={Styles["form-field"]}>
                  <p>
                    All club members will be able to see this, so please refrain
                    from including any sensitive information.
                  </p>
                  <Field id="description" name="description">
                    {({ field }: { field: FieldInputProps<{}> }) => (
                      <RichTextArea
                        defaultText={formikProps.initialValues.description}
                        // value={field.value}
                        onChange={field.onChange(field.name)}
                      />
                    )}
                  </Field>
                  <FormErrorMessage name="description" />
                </div>
              </div>

              <div className={Styles["form-field-wrapper"]}>
                <label className={Styles["form-label"]} htmlFor="notifyBoard">
                  Notify the Board
                </label>
                <div className={Styles["form-field"]}>
                  <p>
                    If there is anything administratively or operationally
                    relevant that the officers should know about, please
                    describe it below. This information is confidential.
                  </p>
                  <Field
                    type="textarea"
                    onChange={formikProps.handleChange}
                    id="notifyBoard"
                    name="notifyBoard"
                  />
                  <FormErrorMessage name="notifyBoard" />
                </div>
              </div>

              <div className={Styles["form-field-wrapper"]}>
                <div />
                <div>
                  <Button type="submit" disabled={disabled}>
                    Submit
                  </Button>
                  <Loading loading={mutationLoading} />
                  <ErrorMessage error={mutationError} />
                </div>
              </div>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default RunReportForm;
