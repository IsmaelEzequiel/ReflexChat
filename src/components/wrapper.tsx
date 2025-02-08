import React from "react";
import { ModeToggle } from "./mode-toggle";

export const withWrapper = <P extends object>(Component: React.ComponentType<P>) => {
  const WrappedComponent = (props: P) => (
    <>
      <ModeToggle />
      <Component {...props} />
    </>
  );

  WrappedComponent.displayName = `withWrapper(${Component.displayName || Component.name || "Component"})`;

  return WrappedComponent;
};
