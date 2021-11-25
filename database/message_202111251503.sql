-- chatDB.dbo.message definition

-- Drop table

-- DROP TABLE chatDB.dbo.message;

CREATE TABLE chatDB.dbo.message (
	id varchar(10) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	chatId varchar(10) COLLATE SQL_Latin1_General_CP1_CI_AS DEFAULT NULL NULL,
	content text COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	messageFrom varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	messageTo varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	createdAt datetime NULL,
	CONSTRAINT PK__message__3213E83F52B72B59 PRIMARY KEY (id)
);

INSERT INTO chatDB.dbo.message (id,chatId,content,messageFrom,messageTo,createdAt) VALUES
	 (N'cij80i8XhL',N'OmoqdsUopt',N'Hello World Juga',N'qwe123',N'qwe122','2021-11-25 01:04:40.527'),
	 (N'Coo1oWkoer',N'HDprcBrOEc',N'Hello guys',N'qwe124',N'qwe123','2021-11-25 06:58:01.907'),
	 (N'JggnxNGINb',N'OmoqdsUopt',N'Hello World',N'qwe122',N'qwe123','2021-11-25 01:04:10.13'),
	 (N'PyAyir3U8I',N'HDprcBrOEc',N'Hello juga Bro',N'qwe123',N'qwe124','2021-11-25 07:00:39.143');