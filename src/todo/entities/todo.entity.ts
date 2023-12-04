import { ApiProperty } from "@nestjs/swagger";

export class Todo {
    @ApiProperty()
    id: number;
    @ApiProperty()
    checked: boolean;
    @ApiProperty()
    name: string;
}
