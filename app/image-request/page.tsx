import { FC } from "react";
import { NewBookForm } from "./request-form/form";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <NewBookForm/>
    </>
  );
};

export default page;
