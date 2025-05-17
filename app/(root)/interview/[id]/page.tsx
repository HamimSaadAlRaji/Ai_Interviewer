import Agent from "@/components/Agent";
import DisplayTechStack from "@/components/DisplayTechStack";
import { getCurrentUser } from "@/lib/auth.action";
import { getInterviewsById } from "@/lib/general.action";
import { getRandomInterviewCover } from "@/lib/utils";
import { get } from "http";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const [user, interview] = await Promise.all([
    await getCurrentUser(),
    await getInterviewsById(id),
  ]);

  if (!interview) {
    redirect("/");
  }
  return (
    <>
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4 items-center ">
            <Image
              src={getRandomInterviewCover()}
              alt="cover"
              width={40}
              height={40}
              className="rounded-full size-[40px] object-cover"
            />
            <h3 className="capitalize">{interview.role} interview</h3>
          </div>
          <DisplayTechStack techStack={interview.techstack} />
        </div>
        <p className="bg-dark-200 px-4 py-2 rounded-full h-fit capitalize">
          {interview.type}
        </p>
      </div>
      <Agent
        userName={user?.name!}
        userId={user?.id}
        interviewId={id}
        type="interview"
        questions={interview.questions}
      />
    </>
  );
};

export default page;
