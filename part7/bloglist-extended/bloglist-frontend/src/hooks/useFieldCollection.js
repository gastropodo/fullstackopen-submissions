const useFieldCollection = (fields) => {
    const reset = () => {
        fields.forEach((field) => {
            field.reset();
        });
    };

    const values = () => {
        const obj = {};
        fields.forEach((field) => {
            obj[field.name] = field.value;
        });
        return obj;
    };

    return { array: fields, values, reset };
};

export default useFieldCollection;
