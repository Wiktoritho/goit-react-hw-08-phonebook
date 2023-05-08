import { useSelector, useDispatch } from "react-redux";
import { selectFilter, setFilter } from "../redux/contactsSlice";
import css from "../App.module.css"

export default function Filter() {
  const value = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div className={css.form}>
      <label>
      Find contacts by name
      </label>
      <input type="text" value={value} onChange={handleChange} />
    </div>
  );
}
