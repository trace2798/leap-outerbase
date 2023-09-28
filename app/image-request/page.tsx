import { FC } from "react";
import { NewImageForm } from "./request-form/form";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <div className="flex flex-col justify-center pt-24 items-center h-[80vh]">
        <h1>
          Due to limit from Leap AI I am disabling this functionality but feel
          free to clone this repo and use our own command
        </h1>
        <NewImageForm />
      </div>
    </>
  );
};

export default page;
