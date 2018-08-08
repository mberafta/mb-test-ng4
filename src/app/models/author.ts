export class Author {
    id: string;
    firstname: string;
    lastname: string;
    nickname: string;
    email: string;
    age: number;
    gender: string;
    city: string;

    constructor(
        firstname?: string,
        lastname?: string,
        nickname?: string,
        email?: string,
        age?: number,
        gender?: string,
        city?: string
    ) {
        this.id = "Auth" + (Math.random() * 10);
        this.firstname = firstname || "";
        this.lastname = lastname || "";
        this.nickname = nickname || "";
        this.email = email || "";
        this.age = age || 0;
        this.gender = gender || "male";
        this.city = city || "Aucune ville renseignée";
    }

}