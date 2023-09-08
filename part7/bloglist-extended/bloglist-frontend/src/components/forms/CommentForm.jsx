import { useField, useFieldCollection } from '../../hooks';
import { Form } from '../styles';

const CommentForm = ({ handleComment, close }) => {
    const text = useField('text', 'text');
    const fields = useFieldCollection([text])

    const handleSubmit = (e) => {
        e.preventDefault();
        handleComment(text.value);
        fields.reset();
        close();
    };

    return <Form fields={fields} onSubmit={handleSubmit} title='ADD COMMENT' submitLabel='ADD'/>
};
export default CommentForm;
