import { type AnalyticsProps, computeRoute } from "@vercel/analytics";
import { Analytics as AnalyticsScript } from "@vercel/analytics/react";
import { useLocation, useParams } from "react-router";

export const VercelAnalytics = (props: Omit<AnalyticsProps, "route">) => {
  const params = useParams();
  const { pathname } = useLocation();

  return (
    <AnalyticsScript
      route={computeRoute(pathname, params as never)}
      path={pathname}
      {...props}
      framework="react-router"
    />
  );
};
