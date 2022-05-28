CREATE TABLE [dbo].[User]
(
	[Id] UNIQUEIDENTIFIER,
	[FirstName] nvarchar(50) NOT null,
	[LastName] nvarchar(50) NOT null,
	[EmailAddress] nvarchar(50) NOT NULL,
	[UserName] nvarchar(256) NOT NULL,
	[Avatar] nvarchar(50) NOT NULL,
	[CreatedDate] datetime2(7) NOT NULL,
	CONSTRAINT [PK_User] PRIMARY KEY ([Id])
)
