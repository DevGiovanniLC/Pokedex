export default class Pokemon {
    id: number;
    name: string;
    spriteUrl: string;

    constructor(id: number, name: string, spriteUrl: string) {
        this.id = id;
        this.name = name;
        this.spriteUrl = spriteUrl;
    }
}