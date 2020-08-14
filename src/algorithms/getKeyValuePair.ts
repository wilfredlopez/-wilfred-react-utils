export function getKeyValuePair(data: Record<any, any> | Array<Record<any, any>>) {
    let record: Record<any, any> = {};
    if (Array.isArray(data))
    {
        for (let [index, val] of data.entries())
        {
            record = Object.assign(record, getKeyValuePair({ [index]: val }))
        }

    } else
    {
        for (let [k, val] of Object.entries(data))
        {
            record[k] = val
        }
    }
    return record;
}