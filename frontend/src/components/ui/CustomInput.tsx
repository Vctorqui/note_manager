import { ChangeEvent, useState } from 'react'
import { FormControl, StandardTextFieldProps, TextField } from '@mui/material'

interface validationTypes {
  validate: () => boolean
  msg: string
}

interface FancyInputTypes extends StandardTextFieldProps {
  validation?: validationTypes[]
  onlyNumber?: boolean
  maxLength?: number
  validateSubmit?: boolean
  mb?: number
}

export function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email)
}

const CustomInput = ({
  label,
  name,
  value,
  variant,
  required,
  validation,
  type,
  multiline,
  helperText,
  onChange,
  maxLength,
  validateSubmit,
  mb,
  ...rest
}: FancyInputTypes) => {
  const [touched, setTouched] = useState(false)

  const isNumber = () => type === 'number'

  const isEmptyString = (str: string) => {
    return str === ''
  }

  const stringIsOnlyDigits = (str: string) => {
    return /^[0-9]+([.])?([0-9]+)?$/.test(str)
  }

  const onChangeCustom = (e: ChangeEvent<HTMLInputElement>) => {
    setTouched(true)
    if (
      isNumber() &&
      !isEmptyString(e.target.value) &&
      !stringIsOnlyDigits(e.target.value)
    )
      return
    if (onChange) onChange(e)
  }

  const getMessageError = () => {
    if (validation) {
      for (const v of validation) {
        if (!v.validate()) return v.msg
      }
      return ''
    }
  }

  const requiredCondition = (touched || validateSubmit) && !value && required
  const showCustomError =
    (touched || validateSubmit) && validation && !!getMessageError()
  const hasError = requiredCondition || showCustomError

  return (
    <>
      <FormControl fullWidth error={hasError}>
        <TextField
          label={label}
          style={mb !== undefined ? { marginBottom: mb } : { marginBottom: 10 }}
          size='small'
          error={hasError}
          helperText={
            requiredCondition
              ? '* Required'
              : showCustomError
              ? getMessageError()
              : helperText ?? ''
          }
          variant={variant ? variant : 'outlined'}
          name={name}
          multiline={multiline}
          value={value}
          onChange={onChangeCustom}
          slotProps={{
            input: {
              className: required ? 'textField-required' : '',
            },
            htmlInput: {
              maxLength: maxLength,
              style: multiline
                ? {
                    backgroundColor: 'transparent',
                    borderRadius: 4,
                    margin: '-8.5px -14px',
                    padding: '8.5px 14px',
                  }
                : {
                    backgroundColor: 'transparent',
                    borderRadius: 4,
                  },
              autoComplete: 'off',
              form: {
                autoComplete: 'off',
              },
            },
          }}
          {...rest}
        />
      </FormControl>
    </>
  )
}

export default CustomInput
