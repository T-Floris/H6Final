import React from "react";
//import { Helmet } from "react-helmet";
import { HelmetProvider, Helmet } from "react-helmet-async";

const MetaDecorator = ({ title, description }) => {
  return (
    // Helmet is equipped for HTML head tag, so when going to a new page it will display the current page into browser tab like: Kanban - Home Page, Kanban - something...
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
    </HelmetProvider>
  );
};

export default MetaDecorator;
