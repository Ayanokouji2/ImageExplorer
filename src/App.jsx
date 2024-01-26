import Explorer from "./components/Explorer";
import './App.css'
import { BrowserRouter as Router ,Routes,Route } from "react-router-dom";
import Download from "./components/Download";
export default function App() {
	
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Explorer/>} />
					<Route exact path="/downloads" element={<Download/>} />
				</Routes>
			</Router>
		</>
	);
}
