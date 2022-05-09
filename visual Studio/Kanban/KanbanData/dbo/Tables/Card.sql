CREATE TABLE [dbo].[Card]
(
	[Id] nvarchar(50),
	[Info] nvarchar(max) NOT NULL,
	CONSTRAINT [PK_Card] PRIMARY KEY ([Id]),
)
