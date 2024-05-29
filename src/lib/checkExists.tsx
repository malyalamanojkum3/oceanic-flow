import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

export function useCheckExists(
  form: UseFormReturn<any>,
  fieldName: string,
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
      });
    }
  }, [fieldValue]);
}
