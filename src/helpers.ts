import { quintOut } from 'svelte/easing';
import { crossfade } from 'svelte/transition';

const [send, receive] = crossfade({
	duration: (d) => Math.sqrt(d * 200),

	fallback(node, params) {
		const style = getComputedStyle(node);
		const transform = style.transform === 'none' ? '' : style.transform;

		return {
			duration: 600,
			easing: quintOut,
			css: (t) => `
        transform: ${transform} scale(${t});
        opacity: ${t}
      `
		};
	}
});

// export function toastPromise(loading: string, success: string, error: string) {
// 	let toast.success: (value: unknown) => void = noop
// 	let toast.error: (reason?: any) => void = noop
// 	const messages = { loading, success, error }
// 	toast.promise(new Promise((resolve, reject) => {
// 	  toast.success = resolve
// 	  toast.error = reject
// 	}), messages)
// 	return { toast.success, toast.error, messages } 
//   }
  
//   function noop(x: any) {}

  import type { QueryResult } from "houdini"



export interface ICallResult<T> {
  success: boolean
  message: string | undefined
  data: T | undefined
  code: string
}

export interface IErrorResult {
  success: false
  message: string
}

export interface IPageInfo{
	endCursor: string
	startCursor: string
	hasPreviousPage: boolean
	hasNextPage: boolean
}

export function gqlResponse<R, T>(rawResponse: QueryResult<R>, data: T) {
  if (rawResponse.errors) {
    return <ICallResult<T>>{ success: false, message: rawResponse.errors.join('. ') }
  }
  return <ICallResult<T>>{ success: true, data: data}
}

function validate(schema: any, formData: any, fieldName?: string) {
	if (fieldName) {
		const fieldSchema = schema.pick({ [fieldName]: true });
		const validationResult = fieldSchema.safeParse({ [fieldName]: formData[fieldName] });
		return validationResult.success
			? null
			: validationResult.error.formErrors.fieldErrors[fieldName];
	} else {
		const validationResult = schema.safeParse(formData);
		return validationResult.success ? null : validationResult.error.formErrors.fieldErrors;
	}
}

export function gqlError(e: unknown) {
  return <IErrorResult>{ success: false, message: (e as any)?.message || e }
}

export { send, receive, validate };


