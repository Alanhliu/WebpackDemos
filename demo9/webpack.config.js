const webpack = require("webpack");
const path = require('path'); // 导入路径包
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const plugins = [
		new webpack.optimize.CommonsChunkPlugin({
			name: "js/common",//这里如果你喜欢和src中的公共样式命名相同的名字，可以改成"background"
			filename: "js/common.bundle.js",
			minChunks: 2
		}),
		//https://doc.webpack-china.org/plugins/extract-text-webpack-plugin/
		new ExtractTextPlugin({
			//这里的name是entry对象的key
			//上面公共部分的name是"common"
			//所以分离出来的css文件是css目录下
			// css/js/index.min.css
			// css/js/second.min.css
			// css/js/third.min.css
			// css/common.min.css
			filename: (getPath) => {
				//把css/js 目录替换为css目录
				return getPath('css/[name].min.css').replace('css/js', 'css');
			},
			allChunks: true
		}),
	];

createHtmlWebpackPlugins('./src/views/*.html');

function createHtmlWebpackPlugins(globPath) {
	let files = glob.sync(globPath);
	let dirname, basename, extname;

	files.forEach(template => {
		dirname = path.dirname(template);
		extname = path.extname(template);
		basename = path.basename(template, extname);

		// let chunks = [];
		// if (basename === "third") {
		// 	chunks = ['js/'+basename];
		// } else {
		// 	chunks = ['js/common','js/'+basename];
		// }
        //
		// const conf = {
		// 	template: template,
		// 	filename: 'views/'+basename+extname,
		// 	chunks: chunks,
		// 	chunksSortMode: 'dependency'
		// };

		const conf = {
			template: template,
			filename: 'views/'+basename+extname,
			chunks: ['common','js/'+basename],
			chunksSortMode: 'dependency'
		};
		plugins.push(new HtmlWebpackPlugin(conf));
	})
}


const entry = getEntry('./src/views/*.html');

//注意，这里循环遍历后,[name]也就是entry的key变成了
// entry: {
// 	"js/index" : "./src/js/index.js",
// 	"js/second": "./src/js/second.js",
// 	"js/third" : "./src/js/third.js"
// }
function getEntry(globPath) {
	let files = glob.sync(globPath);
	let entries = {}, entry, dirname, basename, name, extname;

	for (let i = 0; i < files.length; i++) {
		entry = files[i];
		dirname = path.dirname(entry);
		extname = path.extname(entry);
		basename = path.basename(entry, extname);
		name = path.join("js/", basename);
		entries[name] = "./src/js/"+basename+'.js';
	}
	return entries;
}

module.exports = {
	entry: entry,
	output: {
		path: path.resolve(__dirname, 'build'),
		//注意这里我们之前将.js文件都打包到了bundle.js中
		//显然我们并不希望把所有.js文件都打包到bundle.js中
		//[name]会匹配entry对象中的键值("index","second")
		//最终会打包成对应的.js文件(js目录下的,"index.bundle.js","second.bundle.js")
		filename: "[name].bundle.js",
	},

	// 使用loader模块
	module: {

		// loaders: [
		// 	{ test: /\.css$/, loader: "style-loader!css-loader" },
		// 	{ test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ ,query: { presets: ['es2015']}}
		// ],

		// 参考 loaders -> rules
		// https://doc.webpack-china.org/guides/migrating/#module-loaders-module-rules

		// rules就是配置规则，他是一个数组，每一项为一个对象，如果有多个loader,那就用多个对象，
		// test: /\.js$/ 就是以.js结尾的文件，
		// exclude:排除node_modules这个目录，意思就是不要去这个目录下处理.js的文件，有什么好处呢？大大提高打包的速度.
		// include里面的配置意思就是把src目录下面的js文件作为处理的目标，
		// use配置就是使用babel-loader
		// 需要注意的是，loader是有顺序的，webpack肯定是先将所有css模块依赖解析完得到计算结果再创建style标签。
		// 因此应该把style-loader放在css-loader的前面（webpack loader的执行顺序是从右到左）。
		rules:[
			{
				test: /(\.jsx|\.js)$/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							"es2015", "es2017"
						]
					}
				},
				exclude: /node_modules/
			},
			{
				test: /(\.css|\.less)$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader","less-loader"]
				}),
				exclude: /node_modules/
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						//https://segmentfault.com/q/1010000003850203
						//https://webpack.js.org/loaders/file-loader/
						loader: 'file-loader',
						options: {
							outputPath: 'assets/',
							name : '[name]_[hash].[ext]',
							useRelativePath:true
						}
					}
				]
			}
		]
	},

	plugins: plugins,

	devServer: {
		port:8083,
		contentBase: 'build/aa/',
	}
};