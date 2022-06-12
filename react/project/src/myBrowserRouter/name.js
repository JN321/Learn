import { useContext } from "react";
import { RouterComponent } from "./browserRouter";

export default function Name() {
  const { push, goBack } = useContext(RouterComponent);
  return (
    <div>
      <h1>这里是Name</h1>
      <div>
        <button
          onClick={() => {
            push("/user");
          }}
        >
          to user
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
