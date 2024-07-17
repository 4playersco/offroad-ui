import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";

const RvForm = () => {
  return null;
  // return (
  //   <div>
  //     <Formik
  //       initialValues={{
  //         rvYear: 0,
  //         rvMake: "",
  //         rvModel: "",
  //         rvLengthInFt: 0,
  //         rvWidthinFt: 0,
  //         rvWidthPopoutsInFt: 0,
  //       }}
  //       validate={(values) => {
  //         let errors = {};
  //         if (!values.email) {
  //           errors.email = "Required";
  //         } else if (
  //           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  //         ) {
  //           errors.email = "Invalid email address";
  //         }
  //         return errors;
  //       }}
  //       onSubmit={(values, { setSubmitting }) => {
  //         setTimeout(() => {
  //           alert(JSON.stringify(values, null, 2));
  //           setSubmitting(false);
  //         }, 400);
  //       }}
  //     >
  //       {({ isSubmitting }) => (
  //         <Form>
  //           {/* <VehicleImageUploader onUpdate={() => {}} current={'meow'} /> */}

  //           <Field type="text" name="rvYear" />
  //           <ErrorMessage name="rvYear" component="div" />

  //           <Field type="text" name="rvMake" />
  //           <ErrorMessage name="rvMake" component="div" />

  //           <Field type="text" name="rvModel" />
  //           <ErrorMessage name="rvModel" component="div" />

  //           <Field type="text" name="rvLengthInFt" />
  //           <ErrorMessage name="rvLengthInFt" component="div" />

  //           <Field type="text" name="rvWidthInFt" />
  //           <ErrorMessage name="rvWidthInFt" component="div" />

  //           <Field type="checkbox" name="hasPopup" />
  //           <Field type="text" name="rvWidthPopoutInFt" />
  //           <ErrorMessage name="rvWidthPopoutInFt" component="div" />

  //           <Field type="text" name="rvMods" />
  //           <ErrorMessage name="rvMods" component="div" />

  //           <button type="submit" disabled={isSubmitting}>
  //             Submit
  //           </button>
  //         </Form>
  //       )}
  //     </Formik>
  //   </div>
  // );
};

export default RvForm;
