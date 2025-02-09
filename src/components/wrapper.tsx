import React from "react";
import { ModeToggle } from "./mode-toggle";
import { Toaster } from "./ui/toaster";

export const withWrapper = <P extends object>(Component: React.ComponentType<P>) => {
  const WrappedComponent = (props: P) => (
    <>
      <ModeToggle />
      <Toaster />
      <Component {...props} />
    </>
  );

  WrappedComponent.displayName = `withWrapper(${Component.displayName || Component.name || "Component"})`;

  return WrappedComponent;
};
