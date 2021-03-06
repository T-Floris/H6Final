CREATE TABLE [dbo].[Board]
(
	[Id] UNIQUEIDENTIFIER DEFAULT NEWID(),
	[UserId] UNIQUEIDENTIFIER NOT NULL, /* FK User(id) */
	[Name] nvarchar(50) NOT NULL
	CONSTRAINT [PK_Board] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_Board-UserId_User] FOREIGN KEY ([UserId]) REFERENCES [User]([Id])
)
