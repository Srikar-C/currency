// App.js
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
import './App.css';

function App() {

	const [info, setInfo] = useState([]);
	const [input, setInput] = useState(0);
	const [from, setFrom] = useState("usd");
	const [to, setTo] = useState("inr");
	const [options, setOptions] = useState([]);
	const [output, setOutput] = useState(0);

	useEffect(() => {
		Axios.get(
`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
			.then((res) => {
				setInfo(res.data[from]);
			})
	}, [from]);

	useEffect(() => {
		setOptions(Object.keys(info));
		convert();
	}, [info])

	function convert() {
		var rate = info[to];
		setOutput(input * rate);
	}

	function swit() {
		var temp = from;
		setFrom(to);
		setTo(temp);
	}

	return (
		<div className="App">
			<h1>Currency converter</h1>
			<div className="container">
				<div className="left">
					<h3>Enter value</h3>
					<input type="text"
						placeholder="Enter the amount"
						onChange={(e) => setInput(e.target.value)} />
				</div>
				<div className="middle">
					<h3>From</h3>
					<Dropdown options={options}
						onChange={(e) => { setFrom(e.value) }}
						value={from} placeholder="From" />
				</div>
				<div className="switch">
					<HiSwitchHorizontal size="30px"
						onClick={() => { swit() }} />
				</div>
				<div className="right">
					<h3>To</h3>
					<Dropdown options={options}
						onChange={(e) => { setTo(e.value) }}
						value={to} placeholder="To" />
				</div>
			</div>
			<div className="result">
				<button onClick={() => { convert() }}>Submit</button>
				<h2>Converted Value:</h2>
				<p>{input + " " + from + " = " + output.toFixed(2) + " " + to}</p>

			</div>
		</div>
	);
}

export default App;
