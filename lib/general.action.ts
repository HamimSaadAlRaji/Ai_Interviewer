import { db } from "@/firebase/admin";

export async function getInterviewsFromUserId(
  userId: string
): Promise<Interview[] | null> {
  try {
    const interviews = await db
      .collection("interviews")
      .where("userId", "==", userId)
      .get();

    if (interviews.empty) {
      return null;
    }

    return interviews.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Interview[];
  } catch (e) {
    console.error("Error getting current user:", e);
    return null;
  }
}
export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  try {
    const { userId, limit = 20 } = params;
    const interviews = await db
      .collection("interviews")
      .orderBy("createdAt", "desc")
      .where("finalized", "==", true)
      .where("userId", "!=", userId)
      .limit(limit)
      .get();

    if (interviews.empty) {
      return null;
    }

    return interviews.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Interview[];
  } catch (e) {
    console.error("Error getting current user:", e);
    return null;
  }
}

export async function getInterviewsById(id: string): Promise<Interview | null> {
  try {
    const interviews = await db.collection("interviews").doc(id).get();

    return interviews.data() as Interview;
  } catch (e) {
    console.error("Error getting current user:", e);
    return null;
  }
}
