import { barbarian } from "./barbarian"


export class role {
    public static getRoles() {
        return [
            "barbarian",
        ]
    }

    public static getRole(role: string) {
        switch (role) {
            case "Barbarian":
                return barbarian;
            default:
                return null;
        }
    }
}
