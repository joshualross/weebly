
DROP TABLE IF EXISTS element;
DROP TABLE IF EXISTS element_type;
DROP TABLE IF EXISTS page;
DROP TABLE IF EXISTS state;
DROP TABLE IF EXISTS test;


CREATE TABLE test(
	id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	name VARCHAR(20),
	PRIMARY KEY (id)
);

CREATE TABLE state(
	id TINYINT(2) UNSIGNED NOT NULL AUTO_INCREMENT,
	name VARCHAR(20),
	PRIMARY KEY (id)
);


CREATE TABLE page (
	id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	name VARCHAR(255),
	state TINYINT(2) UNSIGNED NOT NULL DEFAULT 1,
	
	PRIMARY KEY (id),
	
	FOREIGN KEY (state)
		REFERENCES state (id)
		ON UPDATE CASCADE 
		ON DELETE RESTRICT
	
) ENGINE=INNODB;


CREATE TABLE element_type (
    id TINYINT(2) UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(20),
    
    PRIMARY KEY (id)
);

CREATE TABLE element (
	id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	content TEXT,
	type TINYINT(2) UNSIGNED NOT NULL,
	page INT(11) UNSIGNED NOT NULL,
	state TINYINT(2) UNSIGNED NOT NULL DEFAULT 1,
	
	PRIMARY KEY (id),

	FOREIGN KEY (type)
		REFERENCES element_type (id)
		ON UPDATE CASCADE 
		ON DELETE RESTRICT,
		
	FOREIGN KEY (page)
		REFERENCES page (id)
		ON UPDATE CASCADE 
		ON DELETE RESTRICT,
		
	FOREIGN KEY (state)
		REFERENCES state (id)
		ON UPDATE CASCADE 
		ON DELETE RESTRICT

) ENGINE=INNODB;


INSERT INTO state (name) VALUES ('active'), ('delete');
INSERT INTO element_type (name) VALUES ('title'), ('text'), ('image'), ('nav');
INSERT INTO page (name, state) VALUES ('page', 1);
INSERT INTO element (content, type, page)
	VALUES 
	('', 4, 1),  
	('', 3, 1), 
	('Add Title Here', 1, 1), 
	('Cum sociis natoque penatibus et magnis dis parturient montes,	nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula
				ut id elit. Cum sociis natoque penatibus et magnis dis parturient
				montes, nascetur ridiculus mus. Praesent commodo cursus magna, vel
				scelerisque nisl consectetur et. Maecenas sed diam eget risus varius
				blandit sit amet non magna. Aenean lacinia bibendum nulla sed
				consectetur. Cum sociis natoque penatibus et magnis dis parturient
				montes. nascetur ridiculus mus. Curabitur blandit tempus porttitor.
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta
				sem malesuada magna mollis euismod. Lorem ipsum dolor sit amet,
				consectetur adipiscing elit.', 2, 1);

	