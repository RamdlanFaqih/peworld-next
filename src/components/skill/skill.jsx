import styles from "./styles.module.css";

const Skill = ({ name }) => {
  return (
    <div className={styles.skillsBox}>
      <h1 className={styles.skills}>{name}</h1>
    </div>
  );
};



export default Skill;
