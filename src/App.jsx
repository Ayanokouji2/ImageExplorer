import axios from "axios";
import { useState } from "react";

export default function App() {
	const [images, setImages] = useState([]);

	const fetchImage = async () => {
		const res = await axios(
			`https://api.unsplash.com/photos/?client_id=${process.env.API_KEY}`
		);
		const ImageData = await res.data;
		console.log(ImageData);
		setImages(ImageData);
	};

	return (
		<div>
			<input type="search"  />
			<button
				className="primary"
				type="button"
				onClick={fetchImage}>
				Get Image
			</button>

			<div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-10">
				{images &&
					images.map((image, index) => {
						const imageURL =
							image.urls.small;
						return (
							<img
								className="h-72 w-full object-cover rounded-lg shadow-md"
								src={imageURL}
								alt={
									image.alt_description
								}
							/>
						);
					})}
			</div>
		</div>
	);
}
