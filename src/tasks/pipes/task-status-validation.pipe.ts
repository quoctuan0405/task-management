import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]

    protected isStatusValid(status: any): boolean {
        const index = this.allowedStatuses.indexOf(status);

        return index !== -1;
    }

    transform(value: any) {
        const uppercaseValue = value.toUpperCase();

        if (!this.isStatusValid(uppercaseValue)) {
            throw new BadRequestException(`${value} is an invalid status`);
        }

        return uppercaseValue;
    }
}