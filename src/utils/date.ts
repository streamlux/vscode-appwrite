import dayjs = require('dayjs');

export function msToDate(ms: number): string {
    return dayjs(ms).format("LTS");
}
