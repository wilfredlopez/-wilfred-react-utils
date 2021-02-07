
declare const $NestedValue: unique symbol

export type IsFlatObject<T extends object> = Extract<
    Exclude<T[keyof T], NestedValue | Date | FileList>,
    any[] | object
> extends never ? true
    : false
export type NestedValue<TValue extends any[] | object = any[] | object> = {
    [$NestedValue]: never
} & TValue


export type Primitive = string | boolean | number | symbol | null | undefined
export type FieldElement<TFieldValues extends FieldValues = FieldValues> =
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement
    | CustomElement<TFieldValues>
export type FieldValues = Record<string, any>
export type FieldName<TFieldValues extends FieldValues> = IsFlatObject<
    TFieldValues
> extends true ? Extract<keyof TFieldValues, string>
    : string

export type CustomElement<TFieldValues extends FieldValues> = {
    name: FieldName<TFieldValues>
    type?: string
    value?: any
    checked?: boolean
    options?: HTMLOptionsCollection
    files?: FileList | null
    focus?: VoidFunction
}


export function isFileInput(
    element: FieldElement,
): element is HTMLInputElement {
    return element.type === "file"
}
