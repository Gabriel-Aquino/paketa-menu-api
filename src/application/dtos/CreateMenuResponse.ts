export default class CreateMenuResponse {
    constructor(public readonly id: string) { }

    public static build(id: string): CreateMenuResponse {
        return new CreateMenuResponse(id);
    }
}