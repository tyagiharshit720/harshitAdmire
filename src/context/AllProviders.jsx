// AllProviders.js
import React from "react";
import { BlogDetailsProvider } from "./BlogContext";


export const AllProviders = ({ children }) => {
  return (
    <BlogDetailsProvider>
     
          {children}
       
    </BlogDetailsProvider>
  );
};
