import assert from "assert";
import React from "react";
import { useSetRecoilState } from "recoil";
import { localState } from "../../atoms/local";
import Input from "../lib/input";
import Label from "./label";
import PreForm from "./pre-form";

export default function RequestName() {
  const setLocal = useSetRecoilState(localState);
  const [name, setName] = React.useState<string>(
    localStorage.getItem("name") ?? ""
  );

  const submitName = React.useCallback(() => {
    setLocal((local) => {
      assert(local.status === "requestingName");
      localStorage.setItem("name", name);
      return { ...local, name, status: "requestingPermissions" };
    });
  }, [name, setLocal]);

  return (
    <PreForm
      body={
        <>
          <Label htmlFor="name" text="Your name" />
          <Input
            handleChange={setName}
            id="name"
            placeholder="Enter your name"
            value={name}
          />
        </>
      }
      handleSubmit={submitName}
      submitText="Continue"
    />
  );
}