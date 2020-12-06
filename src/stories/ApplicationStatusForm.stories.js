import React from "react";
import ApplicationStatusForm from "../Components/ApplicationStatusForm";

export default {
  title: "ApplicationStatusForm",
  component: ApplicationStatusForm,
};

export const presentation = () => (
  <ApplicationStatusForm title='Change Status' handleSubmit={() => {}} />
);
