export interface Book{
    id: string;
    title: string;
    authors: string[];
    image: string;
    shelf: 'currentlyReading' | 'wantToRead' | 'read' | 'none';
}