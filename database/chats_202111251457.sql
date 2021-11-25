-- chatDB.dbo.chats definition

-- Drop table

-- DROP TABLE chatDB.dbo.chats;

CREATE TABLE chatDB.dbo.chats (
	id varchar(10) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	chatName varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS DEFAULT NULL NULL,
	[member] varchar(225) COLLATE SQL_Latin1_General_CP1_CI_AS DEFAULT NULL NULL,
	updatedAt datetime DEFAULT NULL NULL,
	createdAt datetime DEFAULT NULL NULL,
	CONSTRAINT PK__chats__3213E83F1B34525D PRIMARY KEY (id)
);

INSERT INTO chatDB.dbo.chats (id,chatName,[member],updatedAt,createdAt) VALUES
	 (N'A6TCve6dCw',N'Reoni',N'qwe124,qwe122','2021-11-24 22:31:36.777','2021-11-24 15:43:22.98'),
	 (N'HDprcBrOEc',N'Test',N'qwe123,qwe124','2021-11-25 06:55:57.46','2021-11-25 06:55:57.46'),
	 (N'JdesgWtS35',N'Kumpul',N'qwe124,qwe122','2021-11-24 15:14:38.04','2021-11-24 15:14:38.04'),
	 (N'OmoqdsUopt',N'Reoni',N'qwe123,qwe122','2021-11-24 16:23:14.66','2021-11-24 15:14:44.593');