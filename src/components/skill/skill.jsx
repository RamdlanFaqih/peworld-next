import styles from "./styles.module.css";

const Skill = ({ name }) => {
  return (
    <div className={`${styles.skillsBox} text-center py-2`}>
      <h1 className={styles.skills}>{name}</h1>
    </div>
  );
};



export default Skill;
