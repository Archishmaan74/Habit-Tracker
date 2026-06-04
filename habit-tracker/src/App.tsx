import { Provider } from "react-redux";
import store from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <div>Habit Tracker Setup</div>
    </Provider>
  );
}

export default App;
