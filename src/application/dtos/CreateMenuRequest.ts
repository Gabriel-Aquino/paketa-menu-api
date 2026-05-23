export class CreateMenuRequest {
    constructor(
        public readonly name: string,
        public readonly relatedId: string | null,
    ) { }

    public static build(name: string, relatedId: string | null): CreateMenuRequest {
        return new CreateMenuRequest(name, relatedId);
    }
}