import { useEffect, useState } from 'react';

export const useScript = (scriptUrl, scriptId, content, callback) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const existingScript = document.getElementById(scriptId);

		if (!existingScript && scriptUrl !== '-' && content) {
			const script = document.createElement('script');
			if (script.src !== '-') script.src = scriptUrl;
			// script.async = true;
			script.id = scriptId;
			script.type = 'text/javascript';
			// if (content)
			//   script.text = content;
			document.body.appendChild(script);

			script.onload = () => {
				setLoading(false);
				if (callback) {
					callback();
				}
			};
		}

		if (existingScript && callback) {
			callback();
		}

		return () => {
			if (existingScript && callback) {
				existingScript.remove();
			}
		};
	}, [scriptUrl, scriptId, content, callback]);

	return { loading };
};
