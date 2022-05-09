CREATE TABLE [dbo].[GroupAccess]
(
	[Id] nvarchar(50),
	[Name] nvarchar(50) NOT NULL,
	[description] nvarchar(250) NOT NULL
	CONSTRAINT [PK_GroupAccess] PRIMARY KEY ([Id]),
)
