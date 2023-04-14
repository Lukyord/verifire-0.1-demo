// import { firestore } from 'firebase-admin/app';
// import { db } from './path/to/firebaseConfig';

// // Listen for document changes on the collection
// export const watchExpiration = functions.firestore
//     .document('collectionName/{docId}')
//     .onUpdate(async (change, context) => {
//         const doc = change.after.data();

//         // Check if the expiration date is in the past
//         if (doc.expiration.toDate() <= new Date()) {
//             // If the expiration date is in the past, delete the document
//             await db.collection('collectionName').doc(context.params.docId).delete();
//         }
//     });

import React from "react";

export default function deleteExpiredMeet() {
  return <div>deleteExpiredMeet</div>;
}
