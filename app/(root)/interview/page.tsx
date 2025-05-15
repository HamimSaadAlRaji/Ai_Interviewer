import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/auth.action";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <>
      <h1 className="">Interview</h1>
      <Agent userName={user?.name} userId={user?.id} type="generate" />
    </>
  );
};

export default page;
