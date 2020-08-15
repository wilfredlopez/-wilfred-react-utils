
export function isObjectLike(value: any) {
    return typeof value === 'object' && value !== null
}
export function getTag(value: any) {
    if (value == null)
    {
        return value === undefined ? "[object Undefined]" : "[object Null]";
    }
    return Object.prototype.toString.call(value);
}

export function isPlainObject(value: any) {
    if (!isObjectLike(value) || getTag(value) != '[object Object]')
    {
        return false
    }
    if (Object.getPrototypeOf(value) === null)
    {
        return true
    }
    let proto = value
    while (Object.getPrototypeOf(proto) !== null)
    {
        proto = Object.getPrototypeOf(proto)
    }
    return Object.getPrototypeOf(value) === proto
}


export function isSerializable(obj: any) {
    var isNestedSerializable;
    function isPlain(val: any) {
        return (typeof val === 'undefined'
            || typeof val === 'string'
            || typeof val === 'boolean'
            || typeof val === 'number'
            || Array.isArray(val) ||
            isPlainObject(val));
    }
    if (!isPlain(obj))
    {
        return false;
    }
    for (var property in obj)
    {
        if (obj.hasOwnProperty(property))
        {
            if (!isPlain(obj[property]))
            {
                return false;
            }
            if (typeof obj[property] == "object")
            {
                isNestedSerializable = isSerializable(obj[property]);
                if (!isNestedSerializable)
                {
                    return false;
                }
            }
        }
    }
    return true;
}