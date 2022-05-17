CREATE TABLE [dbo].[Group]
(
	[Id] nvarchar(50),
	[UserId] nvarchar(450) NOT NULL, /* FK User(id) */
	[Name] NVARCHAR(50) NOT NULL,
	[Color] NVARCHAR(7) NOT NULL, 
	CONSTRAINT [PK_Group] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_Group-UserId_User] FOREIGN KEY ([UserId]) REFERENCES [User]([Id]),
)
