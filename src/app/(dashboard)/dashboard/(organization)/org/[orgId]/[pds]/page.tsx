const page = ({ params }: { params: { pds: string } }) => {
  return <div>{params.pds}</div>;
};

export default page;
