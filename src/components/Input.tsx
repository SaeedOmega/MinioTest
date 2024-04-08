type Props = {
  value: string | { key: string; value: string }
  name: string
  label: string
  placeholder?: string
  className?: string
  indexItem?: number
  onChange: (event: string | { key?: string; value?: string }) => void
}

const Input = ({
  name,
  label,
  placeholder,
  className,
  indexItem: item,
  onChange,
  value,
}: Props) => {
  return (
    <>
      {typeof value === "string" && (
        <div className={`${className} flex w-[96.5%] bg-slate-900 flex-col`}>
          <label
            htmlFor={name}
            className="bg-slate-900 relative bottom-[-10px] px-1 left-2 w-fit"
          >
            {label} :
          </label>
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            type="text"
            id={name}
            placeholder={placeholder}
            className="bg-slate-900 placeholder:opacity-70 placeholder:text-[14px] h-10 py-4 px-3 outline-none border-white border rounded-md"
          />
        </div>
      )}
      {typeof value !== "string" && (
        <div className={`${className} flex justify-between w-60`}>
          <div className="flex basis-[48%] bg-slate-900 flex-col">
            <label
              htmlFor={`key${item}`}
              className="bg-slate-900 relative bottom-[-10px] px-1 left-2 w-fit"
            >
              Key :
            </label>
            <input
              value={value.key}
              onChange={(event) => onChange({ key: event.target.value })}
              type="text"
              id={`key${item}`}
              placeholder="key"
              className="bg-slate-900 w-full placeholder:opacity-70 placeholder:text-[14px] h-10 py-4 px-3 outline-none border-white border rounded-md"
            />
          </div>
          <div className="basis-[48%] flex bg-slate-900 flex-col">
            <label
              htmlFor={`value${item}`}
              className="bg-slate-900 relative bottom-[-10px] px-1 left-2 w-fit"
            >
              Value :
            </label>
            <input
              value={value.value}
              onChange={(event) => onChange({ value: event.target.value })}
              type="text"
              id={`value${item}`}
              placeholder="value"
              className="bg-slate-900 w-full placeholder:opacity-70 placeholder:text-[14px] h-10 py-4 px-3 outline-none border-white border rounded-md"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Input
