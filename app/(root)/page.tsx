import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
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
          <p>You haven&apos; taken any Interviews yet</p>
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h1>Take an Interview</h1>
        <div className="interviews-section">
          <p>There are no Interviews available</p>
        </div>
      </section>
    </>
  );
};

export default page;
