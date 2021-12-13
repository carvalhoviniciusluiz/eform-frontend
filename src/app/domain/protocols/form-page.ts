import {
  Control,
  UseFormHandleSubmit,
  UseFormGetValues,
  UseFormSetValue
} from 'react-hook-form'

export type FormPageProps<T> = {
  control?: Control<T>
  handleSubmit?: UseFormHandleSubmit<T>
  getValues?: UseFormGetValues<T>
  setValue?: UseFormSetValue<T>
}
