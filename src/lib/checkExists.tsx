import type { UseFormReturn, FieldValues, Path } from 'react-hook-form';
import { useEffect } from 'react';

export function useCheckExists<T extends FieldValues>(
  form: UseFormReturn<T>,
  fieldName: Path<T>,
  checkExists: { mutateAsync: (value: string) => Promise<boolean> },
  defaultValue?: string
) {
  const { setError, clearErrors, watch } = form;
  const fieldValue = watch(fieldName);

  useEffect(() => {
    if (fieldValue && fieldValue !== defaultValue) {
      checkExists.mutateAsync(fieldValue).then(exists => {
        if (exists) {
          setError(fieldName, { type: 'manual', message: 'This name already exists' });
        } else {
          clearErrors(fieldName);
        }
      }).catch(error => {
        console.error(error);
      });
    }
  }, [fieldValue]);
}
