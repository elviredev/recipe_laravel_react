import { ComponentProps } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export type SelectOption = { value: string, label: string };

type Props = {
    items: SelectOption[],
    placeholder?: string,
    className?: string,
    name: string,
    defaultValue?: string
} & ComponentProps<typeof SelectTrigger>

export function SelectWithItems({ items, placeholder, name, defaultValue, ...props}: Props) {
    return <Select name={name} defaultValue={defaultValue}>
        <SelectTrigger {...props} className="w-[180px]">
            <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
                {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                ))}
        </SelectContent>
    </Select>
}
