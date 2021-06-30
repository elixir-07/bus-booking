// Requirments
var express = require('express');
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var expressSession = require('express-session');

var app = express();

// Variables
var rem = '';
// var req.session.auth = 0;
var count = 0;
var bus_code = 0;
var dc_code = '';
var dc_email = '';
var b_code = '';
var admin_code = '';
var admin_email = '';
var code = '';

//Database
var db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'BabyChiku@28',
	database: 'codeRed',
	debug: false,
	multipleStatements: true
});

// var db = mysql.createConnection({
// 	host: 'sql6.freemysqlhosting.net',
// 	user: 'sql6411561',
// 	password: 'bxwMdWIbzN',
// 	database: 'sql6411561',
// 	debug: false,
// 	multipleStatements: true
// });

db.connect(function(err){
	if(err) {
		throw err;
	}
	console.log('database connected!!');
});

// Settings
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(expressSession({secret: 'my top secret code', saveUninitialized: true, resave: false}));
app.use('/assets',express.static('assets'));


// req.session.authentication
app.get('/', function(req, res) {
	if(req.session.auth === undefined) {
		req.session.auth = 0;
	}
	if(req.session.auth === 0) {
		res.render('home');
	}
	else if(req.session.auth === 1) {
		res.redirect('/admin');
	}
	else if(req.session.auth === 2) {
		res.redirect('/dc');
	}
	else if(req.session.auth === 3) {
		res.redirect('/passanger');
	}
});

app.get('/login', function(req, res) {
	if(req.session.auth === undefined) {
		res.redirect('/');
	}

	if(req.session.auth === 0) {
		res.render('login');
	}
	else if(req.session.auth === 1) {
		res.redirect('/admin');
	}
	else if(req.session.auth === 2) {
		res.redirect('/dc');
	}
	else if(req.session.auth === 3) {
		res.redirect('/passanger');
	}
});

app.post('/login', function(req, res) {
	if(req.session.auth === 0) {
		var email = req.body.email;
		rem = email;
		var password = req.body.password;
		var data = `SELECT * FROM login WHERE email = '${email}'`;
		var query = db.query(data, function(err, result) {
			if(err) {
				throw err;
			}
			else {
				if(result.length === 0) {
					res.redirect('/nousr');
				}

				else if(email === 'admin@gmail.com') {
					bcrypt.compare(password, result[0]['password']).then(function(result1) {
						if(result1) {
							req.session.auth = 1;
							res.redirect('/admin');
							count = 1;
						}
						else {
							res.redirect('/nousr');
						}
					});
				}

				else {
					bcrypt.compare(password, result[0]['password']).then(function(result1) {
						if(result[0]['id'] === 2) {
							if(result1) {
								req.session.auth = 2;
								res.redirect('/dc');
								count = 1;
							}
							else {
								res.redirect('/nousr');
							}
						}

						else if(result[0]['id'] === 3) {
							if(result1) {
								// req.session.auth = 3;
								// console.log(req.session.auth);
								req.session.auth = 3;
								res.redirect('/passanger');
								count = 1;
							}
							else {
								res.redirect('/nousr');
							}
						}
					});
				}
			}
		});
	}
	else if(req.session.auth === 1) {
		res.redirect('/admin');
	}
	else if(req.session.auth === 2) {
		res.redirect('/dc');
	}
	else if(req.session.auth === 3) {
		res.redirect('/passanger');
	}
});

app.get('/register', function(req, res) {
	if(req.session.auth === undefined) {
		res.redirect('/');
	}

	if(req.session.auth === 0) {
		res.render('register');
	}
	else if(req.session.auth === 1) {
		res.redirect('/admin');
	}
	else if(req.session.auth === 2) {
		res.redirect('/dc');
	}
	else if(req.session.auth === 3) {
		res.redirect('/passanger');
	}
});

app.post('/register', function(req, res) {
	var email = req.body.email;
	var name = req.body.name;
	var password = req.body.password;
	var data = `SELECT * FROM login WHERE email = '${email}'`;
	var query = db.query(data, function(err, result) {
		if(err) {
			throw err;
		}
		else if(result.length > 0) {
			res.redirect('/eae');
		}
		else if(result.length === 0) {
			bcrypt.hash(password, 10).then(function(hash) {
		    	var data = `INSERT INTO login VALUES ('${email}', '${name}', '${hash}', '3')`;
		    	var query = db.query(data, function(err, result) {
		    		if(err) {
		    			throw err;
		    		}
		    		else {
		    			res.redirect('/');
		    		}
		    	});
			});
		}
	});
});

app.get('/about', function(req, res) {
	res.render('about');
});

app.get('/contact', function(req, res) {
	res.render('contact');
});

app.get('/logout', function(req, res) {
	req.session.auth = 0;
	res.redirect('/');
});

// Admin portion
app.get('/admin', function(req, res) {
	if(req.session.auth === 1) {
		var data = `SELECT COUNT(*) FROM login;SELECT COUNT(*) FROM passanger;SELECT COUNT(*) FROM bus`;
		var query = db.query(data, function(err, result, fileds) {
			if(err) {
				throw err;
			}
			else {
				res.render('admin', {result: result});
			}
		});
		// res.render('admin');
	}
	else {
		res.redirect('/');
	}
});

app.get('/admin_list', function(req, res) {
	if(req.session.auth === 1) {
		var data = `SELECT * FROM passanger`;
		var query = db.query(data, function(err, result) {
			if(err) {
				throw err;
			}
			else {
				res.render('admin_list', {result:result});
			}
		});
	}
	else {
		res.redirect('/');
	}
});

app.get('/admin_edit1/:admin_code/:admin_email', function(req, res) {
	if(req.session.auth === 1) {
		admin_code = req.params.admin_code;
		admin_email = req.params.admin_email;
		res.redirect('/admin_edit');
	}
	else {
		res.redirect('/')
	}
});

app.get('/admin_edit', function(req, res) {
	if(req.session.auth === 1) {
		var data = 	`SELECT * FROM passanger WHERE email = '${admin_email}' AND code = '${admin_code}'`;
		var query = db.query(data, function(err, result) {
			if(err) {
				throw err;
			}
			else {
				res.render('admin_edit', {result:result});
			}
		});
	}
	else {
		res.redirect('/');
	}
});

app.post('/admin_edit', function(req, res) {
	var source = req.body.source;
	var destination = req.body.destination;
	var date = req.body.date;

	bus_code = find(source, destination);
	bus_code = bus_code + date;

	var data = `UPDATE passanger SET source='${source}', destination='${destination}', date='${date}', bus_code='${bus_code}' WHERE email='${admin_email}' AND code='${admin_code}'`;
	var query = db.query(data, function(err, result) {
		if(err) {
			throw err;
		}
		else {
			res.redirect('/admin_list');
		}
	});
});

app.get('/admin_delete/:admin_del_code/:admin_del_email', function(req, res) { //*
	if(req.session.auth === undefined) {
		res.redirect('/');
	}

	var admin_del_code = req.params.admin_del_code;
	var admin_del_email = req.params.admin_del_email;
	var data = `DELETE FROM passanger WHERE code='${admin_del_code}' AND email='${admin_del_email}'`;
	var query = db.query(data, function(err, result) {
		if(err) {
			throw err;
		}
		else {
			res.redirect('/admin_list');
		}
	});
});

app.get('/add_bus', function(req, res) {
	if(req.session.auth === 1) {
		res.render('add_bus');
	}
	else {
		res.redirect('/');
	}
});

app.post('/add_bus', function(req, res) {
	var email = req.body.email;
	var conductor = req.body.conductor;
	var driver = req.body.driver;
	var source = req.body.source;
	var destination = req.body.destination;
	var date = req.body.date;
	var password = req.body.password;

	bus_code = find(source, destination);
	bus_code = bus_code + date;

	var raw_data = `SELECT * FROM bus WHERE email = '${email}' OR bus_code = '${bus_code}'`;
	var raw_query = db.query(raw_data, function(raw_err, raw_result) {
		if(raw_err) {
			throw raw_err;
		}
		else {
			if(raw_result.length === 0) {
				bcrypt.hash(password, 10).then(function(hash) {
    				var data = `INSERT INTO login VALUES ('${email}', '${conductor}', '${hash}', '2')`;
			    	var query = db.query(data, function(err, result) {
			    		if(err) {
			    			throw err;
			    		}
			    	});
				});

				var data = `INSERT INTO bus VALUES ('${email}', '${conductor}', '${driver}', '${bus_code}', '${source}', '${destination}', '${date}')`;
				var query = db.query(data, function(err, result) {
					if(err) {
						throw err;
					}
					else {
						res.redirect('/admin');
					}
				});
			}
			else {
				res.redirect('/be');
			}
		}
	});
});

app.get('/edit_driver1/:code', function(req, res) {
	if(req.session.auth === 1) {
		b_code = req.params.code;
		res.redirect('/edit_driver');
	}
	else {
		res.redirect('/');
	}
});

app.get('/edit_driver', function(req, res) {
	if(req.session.auth === 1) {
		var data = `SELECT * FROM bus WHERE bus_code='${b_code}'`;
		var query = db.query(data, function(err, result) {
			if(err) {
				throw err;
			}
			else {
				// console.log(result);
				res.render('edit_driver', {result:result});
			}
		});
	}
	else {
		res.redirect('/');
	}
});

app.post('/edit_driver', function(req, res) {
	var driver = req.body.driver;
	var conductor = req.body.conductor;

	var raw_data = `SELECT * FROM bus WHERE bus_code = '${b_code}'`;
	var raw_query = db.query(raw_data, function(raw_err, raw_result) {
		if(raw_err) {
			throw raw_err;
		}
		else {
			if(raw_result.length === 0) {
				res.redirect('/abf');
			}
			else {
				var data = `UPDATE bus SET driver = '${driver}', conductor = '${conductor}' WHERE bus_code = '${b_code}'`;
				var query = db.query(data, function(err, result) {
					if(err) {
						throw err;
					}
					else {
						res.redirect('/admin');
					}
				});
			}
		}
	});
});

app.get('/bus_list', function(req, res) {
	if(req.session.auth === 1) {
		var data = `SELECT * FROM bus`;
		var query = db.query(data, function(err, result) {
			if(err) {
				throw err;
			}
			else {
				res.render('bus_list', {result:result});
			}
		});
	}
	else {
		res.redirect('/');
	}
});

app.get('/admin_profile', function(req, res) {
	if(req.session.auth === 1) {
		var data = `SELECT * FROM login WHERE email = '${rem}'`;
		var query = db.query(data, function(err, result) {
			if(err) {
				throw err;
			}
			else {
				res.render('admin_profile', {result:result});
			}
		});
	}
	else {
		res.redirect('/');
	}
});

app.post('/admin_profile', function(req, res) {
	var name = req.body.name;
	var password = req.body.password;
	if(password === 'codeRed') {
		var data = `UPDATE login SET name = '${name}' WHERE email = '${rem}'`;
		var query = db.query(data, function(err, result) {
			if(err) {
				throw err;
			}
			else {
				res.redirect('/');
			}
		});
	}
	else {
		bcrypt.hash(password, 10).then(function(hash) {
		   	var data = `UPDATE login SET name = '${name}', password = '${hash}' WHERE email = '${rem}'`;
		   	var query = db.query(data, function(err, result) {
		   		if(err) {
		   			throw err;
		   		}
		   		else {
		   			res.redirect('/');
		   		}
		   	});
		});
	}
});

// Conductor portion
app.get('/dc', function(req, res) {
	if(req.session.auth === 2) {
		var raw_data = `SELECT bus_code FROM bus WHERE email = '${rem}'`;
		var raw_query = db.query(raw_data, function(raw_err, raw_result) {
			if(raw_err) {
				throw raw_err;
			}
			else {
				var data = `SELECT COUNT(*) FROM passanger WHERE bus_code='${raw_result[0]['bus_code']}'`;
				var query = db.query(data, function(err, result) {
					if(err) {
						throw err;
					}
					else {
						res.render('dc', {result:result});
					}
				});
			}
		});
	}
	else {
		res.redirect('/');
	}
});

app.get('/dc_list', function(req, res) {
	if(req.session.auth === 2) {
		var raw_data = `SELECT bus_code FROM bus WHERE email = '${rem}'`;
		var raw_query = db.query(raw_data, function(raw_err, raw_result) {
			if(raw_err) {
				throw raw_err;
			}
			else {
				var data = `SELECT * FROM passanger WHERE bus_code = '${raw_result[0]['bus_code']}'`;
				var query = db.query(data, function(err, result) {
					if(err) {
						throw err;
					}
					else {
						res.render('dc_list', {result:result});
					}
				});
			}
		});
	}
	else {
		res.redirect('/');
	}
});

app.get('/dc_delete/:dc_code/:dc_email', function(req, res) {
	if(req.session.auth === 2) {
		var dc_code = req.params.dc_code;
		var dc_email = req.params.dc_email;
		var data = `DELETE FROM passanger WHERE code='${dc_code}' AND email='${dc_email}'`;
		var query = db.query(data, function(err, result) {
			if(err) {
				throw err;
			}
			else {
				res.redirect('/dc_list');
			}
		});
	}
	else {
		res.redirect('/');
	}
});

app.get('/dc_edit1/:dc_code/:dc_email', function(req, res) {
	if(req.session.auth === 2) {
		dc_code = req.params.dc_code;
		dc_email = req.params.dc_email;

		res.redirect('/dc_edit');
	}
	else {
		res.redirect('/');
	}
});

app.get('/dc_edit', function(req, res) {
	if(req.session.auth === 2) {
		var data = 	`SELECT * FROM passanger WHERE email = '${dc_email}' AND code = '${dc_code}'`;
		var query = db.query(data, function(err, result) {
			if(err) {
				throw err;
			}
			else {
				res.render('dc_edit', {result:result});
			}
		});
	}
	else {
		res.redirect('/');
	}
});

app.post('/dc_edit', function(req, res) {
	var source = req.body.source;
	var destination = req.body.destination;
	var date = req.body.date;

	bus_code = find(source, destination);
	bus_code = bus_code + date;

	var data = `UPDATE passanger SET source='${source}', destination='${destination}', date='${date}', bus_code='${bus_code}' WHERE email='${dc_email}' AND code='${dc_code}'`;
	var query = db.query(data, function(err, result) {
		if(err) {
			throw err;
		}
		else {
			res.redirect('/dc_list');
		}
	});
});

app.get('/dc_profile', function(req, res) {
	if(req.session.auth === 2) {
		var data = `SELECT * FROM bus WHERE email = '${rem}'`;
		var query = db.query(data, function(err, result) {
			if(err) {
				throw err;
			}
			else {
				res.render('dc_profile', {result:result});
			}
		});
	}
	else {
		res.redirect('/');
	}
});

app.post('/dc_profile', function(req, res) {
	var conductor = req.body.conductor;
	var driver = req.body.driver;
	var password = req.body.password;
	if(password === 'codeRed') {
		var data = `UPDATE login SET name = '${conductor}' WHERE email = '${rem}';UPDATE bus SET conductor = '${conductor}', driver = '${driver}' WHERE email = '${rem}'`;
		var query = db.query(data, function(err, result) {
			if(err) {
				throw err;
			}
			else {
				res.redirect('/dc');
			}
		});
	}
	else {
		bcrypt.hash(password, 10).then(function(hash) {
		   	var data = `UPDATE login SET name = '${conductor}', password = '${hash}' WHERE email = '${rem}';UPDATE bus SET conductor = '${conductor}', driver = '${driver}' WHERE email = '${rem}'`;
		   	var query = db.query(data, function(err, result) {
		   		if(err) {
		   			throw err;
		   		}
		   		else {
		   			res.redirect('/dc');
		   		}
		   	});
		});
	}
});

// Passanger portion
app.get('/passanger', function(req, res) {
	if(req.session.auth === 3) {
		var data = `SELECT COUNT(*) FROM passanger WHERE email = '${rem}'`;
		var query = db.query(data, function(err, result) {
			if(err) {
				throw err;
			}
			else {
				res.render('passanger', {result:result});
			}
		});
	}
	else {
		res.redirect('/');
	}
});

app.get('/book', function(req, res) {
	if(req.session.auth === 3) {
		res.render('book');
	}
	else {
		res.redirect('/');
	}
});

app.post('/book', function(req, res) {
	var name = req.body.name;
	var date = req.body.date;
	var source = req.body.source;
	var destination = req.body.destination;

	bus_code = find(source, destination);
	bus_code = bus_code + date;

	var data = `INSERT INTO passanger VALUES ('${name}', '${date}', '${source}', '${destination}', '${bus_code}', '${rem}', '${new Date().toLocaleTimeString().replace(' ', '')+new Date().toLocaleDateString().replace(' ', '')}')`;
	var query = db.query(data, function(err, result) {
		if(err) {
			throw err
		}
		else {
			res.redirect('/passanger');
		}
	});
});

app.get('/list', function(req, res) {
	var data = `SELECT * FROM passanger WHERE email = '${rem}'`;
	var query = db.query(data, function(err, result) {
		if(req.session.auth > 0 && req.session.auth < 4) {
			res.render('list', {result:result});
		}
		else {
			res.redirect('/');
		}
	});
});

app.get('/edit1/:code', function(req,res) { //*
	if(req.session.auth) {
		code = req.params.code;
		res.redirect('/edit');
	}
	else {
		res.redirect('/');
	}
});

app.get('/edit', function(req, res) {
	if(req.session.auth === 3) {
		var data = 	`SELECT * FROM passanger WHERE email='${rem}' AND code='${code}'`;
		var query = db.query(data, function(err, result) {
			if(err) {
				throw err;
			}
			else {
				res.render('edit', {result:result});
			}
		});
	}
	else {
		res.redirect('/');
	}
});

app.post('/edit', function(req, res) {
	var source = req.body.source;
	var destination = req.body.destination;
	var date = req.body.date;

	bus_code = find(source, destination);
	bus_code = bus_code + date;

	var data = `UPDATE passanger SET source='${source}', destination='${destination}', date='${date}', bus_code='${bus_code}' WHERE email='${rem}' AND code='${code}'`;
	var query = db.query(data, function(err, result) {
		if(err) {
			throw err;
		}
		else {
			res.redirect('/list');
		}
	});
});

app.get('/delete/:code', function(req, res) { //*
	var code = req.params.code;
	var data = `DELETE FROM passanger WHERE code='${code}' AND email='${rem}'`;
	var query = db.query(data, function(err, result) {
		if(err) {
			throw err;
		}
		else {
			res.redirect('/list');
		}
	});
});

app.get('/profile', function(req, res) {
	if(req.session.auth === 3) {
		var data = `SELECT * FROM login WHERE email = '${rem}'`;
		var query = db.query(data, function(err, result) {
			if(err) {
				throw err;
			}
			else {
				res.render('profile', {result:result});
			}
		});
	}
	else {
		res.redirect('/');
	}
});

app.post('/profile', function(req, res) {
	var name = req.body.name;
	var password = req.body.password;
	if(password === 'codeRed') {
		var data = `UPDATE login SET name = '${name}' WHERE email = '${rem}'`;
		var query = db.query(data, function(err, result) {
			if(err) {
				throw err;
			}
			else {
				res.redirect('/');
			}
		});
	}
	else {
		bcrypt.hash(password, 10).then(function(hash) {
		   	var data = `UPDATE login SET name = '${name}', password = '${hash}' WHERE email = '${rem}'`;
		   	var query = db.query(data, function(err, result) {
		   		if(err) {
		   			throw err;
		   		}
		   		else {
		   			res.redirect('/');
		   		}
		   	});
		});
	}
});

// Error portion

app.get('/nousr', function(req, res) {
	res.render('error', {result: 'No User found'});
});

app.get('/eae', function(req, res) {
	res.render('error', {result: 'Email already exist'});
});

app.get('/be', function(req,res) {
	if(req.session.auth === 1) {
		res.render('error', {result: 'User with same email or same bus exist'});
	}
	else {
		res.redirect('/');
	}
});

app.get('/abf', function(req, res) {
	if(req.session.auth === 1) {
		res.render('error', {result: 'Please add bus first, no such bus exist yet'});
	}
	else {
		res.redirect('/');
	}
});

// Port
app.listen('4000', function() {
	console.log('server started!!');
});

// Function
function find(source, destination) {
	var bus_code = 0;
	if(source === 'A') {
		if(destination === 'B') {
			bus_code = 1;
		}
		else if(destination === 'C') {
			bus_code = 2;
		}
		else if(destination === 'D') {
			bus_code = 3;
		}
	}

	else if(source === 'B') {
		if(destination === 'A') {
			bus_code = 4;
		}
		else if(destination === 'C') {
			bus_code = 5;
		}
		else if(destination === 'D') {
			bus_code = 6;
		}
	}

	else if(source === 'C') {
		if(destination === 'A') {
			bus_code = 7;
		}
		else if(destination === 'B') {
			bus_code = 8;
		}
		else if(destination === 'D') {
			bus_code = 9;
		}
	}

	else if(source === 'D') {
		if(destination === 'A') {
			bus_code = 10;
		}
		else if(destination === 'B') {
			bus_code = 11;
		}
		else if(destination === 'C') {
			bus_code = 12;
		}
	}

	return bus_code;
}
