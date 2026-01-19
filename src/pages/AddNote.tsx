import { useNavigate } from "react-router-dom";
import NoteForm from "../components/NoteForm";

interface AddNoteProps {
  onAdd: (title: string, body: string) => void;
}

const AddNote = ({ onAdd }: AddNoteProps) => {
  const navigate = useNavigate();

  const handleSubmit = (title: string, body: string) => {
    onAdd(title, body);
    navigate("/");
  };

  return <NoteForm onSubmit={handleSubmit} />;
};

export default AddNote;
