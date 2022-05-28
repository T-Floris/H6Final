CREATE TABLE [dbo].[GroupAccess]
(
	[Id] UNIQUEIDENTIFIER DEFAULT NEWID(),
	[Name] nvarchar(50) NOT NULL,
	[Description] nvarchar(250) NOT NULL
	CONSTRAINT [PK_GroupAccess] PRIMARY KEY ([Id]),
)
