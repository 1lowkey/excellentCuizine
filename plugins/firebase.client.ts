import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    const firebaseConfig = {
        apiKey: "AIzaSyA0mL8ACKm1mR5aMfUNJb6eVpbdbyqG3KM",
        authDomain: "excellentcuizine.firebaseapp.com",
        projectId: "excellentcuizine",
        storageBucket: "excellentcuizine.firebasestorage.app",
        messagingSenderId: "1038679668650",
        appId: "1:1038679668650:web:4688ed5c8dc68b86e05dd3",
        measurementId: "G-L6PW3RFBBW"
    };

    const app = initializeApp(firebaseConfig);
    const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
    const storage = getStorage(app);

    return {
        provide: {
            firebaseApp: app,
            firebaseAnalytics: analytics,
            firebaseStorage: storage
        }
    };
});
