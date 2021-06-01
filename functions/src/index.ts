import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const scheduledFunctionPlainEnglish = functions.pubsub
  .schedule("every 5 minutes")
  .onRun(async () => {
    return (await admin.firestore().collection("items").get()).docs.forEach(
      (doc) => {
        admin.firestore().collection("items").doc(doc.id).delete();
      }
    );
  });