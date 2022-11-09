//Input Validation
export interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function validate(validateObj: Validatable) {
  let isValid = true;
  if (validateObj.required) {
    isValid = isValid && validateObj.value.toString().length !== 0;
  }
  if (validateObj.minLength != null && typeof validateObj.value === "string") {
    isValid = isValid && validateObj.value.length >= validateObj.minLength;
  }
  if (validateObj.maxLength != null && typeof validateObj.value === "string") {
    isValid = isValid && validateObj.value.length <= validateObj.maxLength;
  }
  if (validateObj.min != null && typeof validateObj.value === "number") {
    isValid = isValid && validateObj.value >= validateObj.min;
  }
  if (validateObj.max != null && typeof validateObj.value === "number") {
    isValid = isValid && validateObj.value <= validateObj.max;
  }
  return isValid;
}
