import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const scheduledFunctionPlainEnglish = functions.pubsub
  .schedule("0 1 * * *")
  .timeZone("Australia/Brisbane")
  .onRun(async () => {
    return (await admin.firestore().collection("items").get()).docs.forEach(
      (doc) => {
        admin.firestore().collection("items").doc(doc.id).delete();
      }
    );
  });
