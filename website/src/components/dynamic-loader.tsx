import { type ComponentType, type JSX, lazy, Suspense } from "react";

type DynamicLoaderProps = {
  loader: () => Promise<{ default: ComponentType }>;
  fallback: JSX.Element;
};

export const dynamicLoader = ({ loader, fallback }: DynamicLoaderProps) => {
  const Lazy = lazy(loader);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const LoaderComponent = (props: any) => {
    return (
      <Suspense fallback={fallback}>
        <Lazy {...props} />
      </Suspense>
    );
  };

  LoaderComponent.displayName = "LoaderComponent";

  return LoaderComponent;
};
