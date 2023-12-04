import mysql from 'mysql2/promise';
import config from '../config';

const pool = mysql.createPool({
	...config.mysql,
	dateStrings: true,
	connectionLimit: 10,
	timezone: 'Z',
	debug: true,
});

export default pool;
