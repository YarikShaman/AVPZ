export function SaveJWT(): string {
    const localJWT = localStorage.getItem("jwt");
    const sessionJWT = sessionStorage.getItem("jwt");

    if (localJWT) {
        return localJWT;
    } else if (sessionJWT) {
        return sessionJWT;
    } else {
        return "error";
    }
}