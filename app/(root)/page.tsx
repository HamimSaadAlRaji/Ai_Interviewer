import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import {
  getCurrentUser,
  getInterviewsFromUserId,
  getLatestInterviews,
} from "@/lib/auth.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { promise } from "zod";

const page = async () => {
  const user = await getCurrentUser();

  const [interviews, latestInterviews] = await Promise.all([
    await getInterviewsFromUserId(user?.id!),
    await getLatestInterviews({ userId: user?.id! }),
  ]);
  const hasPastInterviews = interviews && interviews.length > 0;
  const hasLatestInterviews = latestInterviews && latestInterviews.length > 0;

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col max-w-lg gap-6">
          <h2>Get Interview Ready with AI-Powered Practice & Feedback</h2>

          <p className="text-lg text-primary-100">
            Practice on Real Interviews and get instant Feedback
          </p>
          <Button asChild className="max-sm:w-full btn-primary">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
        <Image
          className=" max-sm:hidden"
          src="/robot.png"
          alt="robot"
          width={500}
          height={500}
        />
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h1>Your Interviews</h1>
        <div className="interviews-section">
          {hasPastInterviews ? (
            interviews.map((interview) => (
              <InterviewCard
                {...interview}
                key={interview.id}
                techstack={
                  Array.isArray(interview.techstack) ? interview.techstack : []
                }
              />
            ))
          ) : (
            <p>You haven&apos;t taken any Interviews yet</p>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h1>Take an Interview</h1>
        <div className="interviews-section">
          {hasLatestInterviews ? (
            latestInterviews.map((interview) => (
              <InterviewCard
                {...interview}
                key={interview.id}
                techstack={
                  Array.isArray(interview.techstack) ? interview.techstack : []
                }
              />
            ))
          ) : (
            <p>There are no new interviews available</p>
          )}
        </div>
      </section>
    </>
  );
};

export default page;
