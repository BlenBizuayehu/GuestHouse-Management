import { ReportsService } from './reports.service';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    getRevenueByRoomType(): Promise<{
        name: string;
        value: number;
    }[]>;
}
