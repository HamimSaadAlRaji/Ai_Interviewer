import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { getRandomInterviewCover } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import DisplayTechStack from "./DisplayTechStack";

const InterviewCard = ({
  id,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback = null as Feedback | null;
  const normalizedtype = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM DD YYYY");
  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div className="">
          <div className="absolute px-4 py-2  rounded-2xl top-0 right-0 w-fit rounded-bl-lg bg-light-600">
            <p className="badge-text">{normalizedtype}</p>
          </div>
          <Image
            src={getRandomInterviewCover()}
            alt="cover"
            width={70}
            height={70}
            className="rounded-full"
          />
          <h3 className="mt-5 capitalize">{role} interview</h3>
          <div className="flex flex-row gap-5 mt-5">
            <div className="flex flex-row gap-2">
              <Image
                src={"/calendar.svg"}
                alt="calender"
                width={20}
                height={20}
              />
              <p className="text-sm">{formattedDate}</p>
            </div>
            <div className="flex flex-row gap-2">
              <Image src={"/star.svg"} alt="star" width={20} height={20} />
              <p className="text-sm">{feedback?.totalScore || "---"}/100</p>
            </div>
          </div>
          <p className="line-clamp-2 mt-5">
            {feedback?.totalScore || "You have not taken this interview"}
          </p>
          <div className="flex flex-row justify-between mt-7">
            <DisplayTechStack techStack={techstack} />

            <Button className="btn-primary">
              <Link
                href={
                  feedback ? `/interview/${id}/feedback` : `/interview/${id}`
                }
              >
                {feedback ? "View Feedback" : "Start Interview"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
