export function formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    let result = '';

    if (hours > 0) {
        result += `${hours} ${remainingMinutes > 0 ? 'ชม.' : 'ชั่วโมง'} `;
    }

    if (remainingMinutes > 0) {
        result += `${remainingMinutes} นาที`;
    }

    return result;
}