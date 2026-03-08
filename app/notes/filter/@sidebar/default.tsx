import Link from "next/link";
import css from "./SidebarNotes.module.css"

const tags = ["Todo", "Shopping", "Meeting", "Personal", "Work"]

const tagsLink = tags.map(el => {
  return (<li key={el} className={css.menuItem}> <Link className={css.menuLink} href={`/notes/filter/${el}`}> {el} </Link> </li>)
})

const SidebarNotes = async () => {
  return (
    <ul className={css.menuList}>

      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {tagsLink}
    </ul>



  );
};

export default SidebarNotes;
