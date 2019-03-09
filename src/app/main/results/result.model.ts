/* Define model for result in order to populate the search results correctly. */
export class Result {
    public category: string; // A result should have a category property of string type.
    public keywords: string[]; // A result should have a keywords property that holds an array of strings.
    public link: string; // A result should have a link property of string type.
    public technology: string; // A result should have a technology property of string type.
    public title: string; // A result should have a title property of string type.
    public searchString ?: string; // A result can have a searchString property of string type.
    public image ?: string; // A result can have an image property of string type.

    constructor(
        category: string,
        keywords: string[],
        link: string,
        technology: string,
        title: string,
        searchString: string,
        image: string
    ) {
        this.category = category;
        this.keywords = keywords;
        this.link = link;
        this.technology = technology;
        this.title = title;
        this.searchString = searchString;
        this.image = image;
    }
}
