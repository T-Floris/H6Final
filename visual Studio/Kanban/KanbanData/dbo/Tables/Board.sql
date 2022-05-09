CREATE TABLE [dbo].[Board]
(
	[Id] nvarchar(50),
	[UserId] nvarchar(450) NOT NULL, /* FK User(id) */
	[Name] nvarchar(50) NOT NULL
	CONSTRAINT [PK_Board] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_Board-UserId_User] FOREIGN KEY ([UserId]) REFERENCES [User]([Id])
)
