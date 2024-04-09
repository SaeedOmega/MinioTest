import { Button, TextField, styled } from "@mui/material"

type Props = {
  /**
   * value of input
   */
  value: string | { key: string; value: string }
  /**
   * a string for show as label of input
   */
  label?: string
  /**
   * a string for show placeholder
   */
  placeholder?: string
  // style for component
  className?: string
  /**
   * count of item for uniqe id
   */
  indexItem?: number
  /**
   * a function for onchange inputs
   * */
  onChange: (event: string | { key?: string; value?: string }) => void
  /**
   * a function for delete action
   */
  deleteFunc?: () => void
}

const CssTextField = styled(TextField)({
  "& label": {
    color: "#e2e8f0",
  },
  "& label.Mui-focused": {
    color: "#e2e8f0",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#e2e8f0",
  },
  "& .MuiInput": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "12px",
      borderColor: "#e2e8f0",
    },
    "& input": {
      color: "white",
    },
    "&:hover fieldset": {
      borderColor: "#e2e8f0",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#e2e8f0",
    },
  },
})

const Input = ({
  label,
  placeholder,
  className,
  indexItem: item,
  onChange,
  value,
  deleteFunc,
}: Props) => {
  return (
    <>
      {typeof value === "string" && (
        <CssTextField
          fullWidth
          value={value}
          placeholder={placeholder}
          label={label}
          onChange={(event) => onChange(event.target.value)}
          sx={{ color: "white" }}
        />
      )}
      {typeof value !== "string" && (
        <div className={`${className} flex mt-5 justify-between w-full`}>
          <CssTextField
            label="Key :"
            value={value.key}
            placeholder="key"
            onChange={(event) => onChange({ key: event.target.value })}
            className="!w-28"
          />
          <CssTextField
            className="!w-28"
            label="Value :"
            value={value.value}
            placeholder="value"
            onChange={(event) => onChange({ value: event.target.value })}
            sx={{ marginLeft: 1 }}
          />
          <Button
            onClick={deleteFunc}
            className="pr-2 ml-2"
            sx={{
              color: "white",
              "&:hover ": {
                backgroundColor: "#0f172a",
                color: "#475569",
              },
            }}
          >
            delete
          </Button>
        </div>
      )}
    </>
  )
}

export default Input
