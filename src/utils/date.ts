import dayjs = require("dayjs");
import utc = require("dayjs/plugin/utc");
import timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin
dayjs.extend(utc);
dayjs.extend(timezone);

export function msToDate(ms: number): string {
    return dayjs(ms * 1000).tz("America/Chicago").format("LTS");
}
