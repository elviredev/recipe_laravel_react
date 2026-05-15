import { ComponentProps,
    useState
} from 'react';
import { cn } from '@/lib/utils';
import {
    UploadIcon
} from 'lucide-react';

type Props = ComponentProps<'input'> & {
    progress?: number
};

export function ImageInput({defaultValue, className, progress, ...props }: Props) {
    const [hover, setHover] = useState(false);
    const [preview, setPreview] = useState(defaultValue?.toString() ?? null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHover(false);
        const target = e.target as HTMLInputElement
        if (target.files && target.files.length > 0) {
            const file = target.files[0];
            setPreview(URL.createObjectURL(file));
        }
    }

    return <div
        className={cn(className, 'group relative grid place-items-center rounded-md overflow-hidden bg-muted hover:bg-primary/20 hover:text-primary transition-all', props['aria-invalid'] && 'ring-destructive ring-2 bg-destructive/20', hover && 'bg-primary/20 text-primary ring-primary ring-2')}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
    >
        <input
            {...props}
            type="file"
            onDragOver={() => setHover(true)}
            onDragLeave={() => setHover(false)}
            onDragEnd={() => setHover(false)}
            onChange={handleChange}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
        />
        <UploadIcon size={24} />
        {preview && <img
            className={cn("absolute inset-0 object-cover size-full transition-all", hover || props['aria-invalid'] && 'opacity-20')}
            src={preview}
            alt=""
        />}
        {progress && <div
            className="h-2 opacity-80 w-full absolute bottom-0 left-0 pointer-none origin-left bg-primary"
            style={{transform: `scaleX(${progress.toFixed(2)})`}}
        />
        }
    </div>
}
