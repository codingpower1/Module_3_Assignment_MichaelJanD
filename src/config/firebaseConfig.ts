import { initializeApp, getApps } from "firebase/app";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db: any = getFirestore(app);