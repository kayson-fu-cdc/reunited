import React, { FC, useEffect, useState } from "react";

globalThis.ReactFromComp = React;

const CompInSrc: FC = () => {
  const [s, ss] = useState("");

  useEffect(() => {
    const f = async () => {
      const data = await (await fetch("https://www.google.com")).json();
      ss(JSON.stringify(data));
    };

    f();
  }, []);

  return (
    <>
      <div>CompInSrc component</div>
      <div>status is: {s}</div>
    </>
  );
};
export default CompInSrc;
