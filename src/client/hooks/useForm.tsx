import { useState } from 'react';

export const useForm = (initialValues: { [key: string]: string } = {}) => {
	const [values, setValues] = useState(initialValues);

	const handleChanges = (e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
		setValues(p => ({ ...p, [e.target.name]: e.target.value }));
	};

	const clearForm = () => {
		setValues({});
	};

	return { values, setValues, handleChanges, clearForm };
};
