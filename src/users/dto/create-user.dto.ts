export class CreateUserDto{
    userId: number;
    email: string;
    password: string;
    name: string;
    age: number;
    date?: {now:Date}[];
    answers?: { text: string; questionId: number }[]
}
