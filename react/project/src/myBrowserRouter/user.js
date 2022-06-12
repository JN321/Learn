import { useContext } from "react";
import { RouterComponent } from "./browserRouter";

export default function User() {
  const { push, goBack } = useContext(RouterComponent);
  return (
    <div>
      <h1>这里是User</h1>
      <div>
        <button
          onClick={() => {
            push("/");
          }}
        >
          to name
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            goBack();
          }}
        >
          返回
        </button>
      </div>
    </div>
  );
}
