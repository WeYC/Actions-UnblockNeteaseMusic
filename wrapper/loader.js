'use strict';

/*
 * 单文件外壳 loader。
 * 构建时 pkg 把同目录的 app.exe / yt-dlp.exe 以 assets 形式打进 snapshot，
 * snapshot 里的文件无法直接 spawn 执行，所以运行时先释放到真实目录，
 * 再启动内层 app，并把释放目录 prepend 到 PATH，保证 spawn('yt-dlp') 能命中。
 * 参数、stdio、退出码全部透传给内层。
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');

const INNER_NAME = 'app.exe';
const YTDLP_NAME = 'yt-dlp.exe';
const CACHE_DIR = path.join(os.tmpdir(), 'unm-single');
const MARKER = path.join(CACHE_DIR, '.synced');

function syncFile(name) {
	const src = path.join(__dirname, name);
	const dst = path.join(CACHE_DIR, name);
	const { size } = fs.statSync(src);
	let synced = '';
	try {
		synced = fs.readFileSync(MARKER, 'utf8');
	} catch (e) {}
	if (fs.existsSync(dst) && synced.split('\n').includes(`${name}:${size}`)) return;
	fs.mkdirSync(CACHE_DIR, { recursive: true });
	fs.copyFileSync(src, dst);
	const lines = synced
		.split('\n')
		.filter(Boolean)
		.filter((l) => !l.startsWith(`${name}:`));
	lines.push(`${name}:${size}`);
	fs.writeFileSync(MARKER, lines.join('\n') + '\n');
}

function main() {
	syncFile(INNER_NAME);
	syncFile(YTDLP_NAME);
	const env = {
		...process.env,
		PATH: `${CACHE_DIR}${path.delimiter}${process.env.PATH || ''}`,
	};
	const child = spawn(path.join(CACHE_DIR, INNER_NAME), process.argv.slice(2), {
		stdio: 'inherit',
		env,
	});
	for (const sig of ['SIGINT', 'SIGTERM']) {
		process.on(sig, () => child.kill(sig));
	}
	child.on('exit', (code) => process.exit(code === null ? 1 : code));
}

try {
	main();
} catch (err) {
	console.error(err);
	process.exit(1);
}
