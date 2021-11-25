-- chatDB.dbo.users definition

-- Drop table

-- DROP TABLE chatDB.dbo.users;

CREATE TABLE chatDB.dbo.users (
	id varchar(10) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	username varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__users__3213E83F1B34525D PRIMARY KEY (id)
);

INSERT INTO chatDB.dbo.users (id,username) VALUES
	 (N'qwe121',N'D'),
	 (N'qwe122',N'C'),
	 (N'qwe123',N'B'),
	 (N'qwe124',N'A');