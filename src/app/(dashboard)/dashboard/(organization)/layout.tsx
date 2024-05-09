import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const OrganizationLayout = (props: Props & { params: { orgId: string } }) => {
  console.log(props.params.orgId);
  return <>{props.children}</>;
};
export default OrganizationLayout;
