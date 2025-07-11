import { useState } from "react";
import styles from "./Login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === "secretUser" && password === "secretPass") {
      setSecret(true);
    } else {
      alert("Неверный логин или пароль");
    }
  };

  return (
    <div className={styles.container}>
      {secret ? (
        <div className={styles.secret}>
          🎉 Вот твоя пасхалка! 💖 <br />
          <span>Ты самая лучшая!</span>
        </div>
      ) : (
        <form onSubmit={handleLogin} className={styles.form}>
          <h2 className={styles.title}>Вход</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Войти
          </button>
        </form>
      )}
    </div>
  );
}
