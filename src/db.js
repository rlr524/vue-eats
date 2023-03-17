import { useFirestore, useCollection } from "vuefire";
import { collection } from "firebase/firestore";

const db = useFirestore();
export const cafeCollection = useCollection(collection(db, "cafes"));
