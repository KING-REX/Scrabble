module.exports = {
	presets: ["module:metro-react-native-babel-preset"],
	plugins: [
		[
			"react-native-reanimated/plugin",
			{
				relativeSourceLocation: true,
			},
		],
		[
			"module-resolver",
			{
				root: ["."],
				resolvePath(sourcePath, currentFile, opt) {
					var path = require("path");
					if (
						sourcePath === "react-native" &&
						!(
							(
								currentFile.includes("node_modules/react-native/") || // macos/linux paths
								currentFile.includes("node_modules\\react-native\\")
							) // windows path
						) &&
						!(
							currentFile.includes("resolver/react-native/") ||
							currentFile.includes("resolver\\react-native\\")
						)
					) {
						return path.resolve(__dirname, "resolver/react-native");
					}
					var resolve = require("babel-plugin-module-resolver").resolvePath(
						sourcePath,
						currentFile,
						opt
					);
					return resolve;
				},
			},
		],
	],
};
//Make sure react-native-reanimated plugin is listed
//last in the plugins
